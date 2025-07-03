AFRAME.registerComponent("archery-game", {
  init: function () {
    const scene = this.el;
    const bow = document.createElement("a-entity");
    bow.setAttribute("gltf-model", "#bowModel");
    bow.setAttribute("position", "0 1.5 0");
    scene.appendChild(bow);

    for (let i = 0; i < 5; i++) {
      const target = document.createElement("a-entity");
      target.setAttribute(
        "geometry",
        "primitive: cylinder; radius:0.5; height:0.1",
      );
      target.setAttribute("material", "src: /assets/textures/shield.png");
      target.setAttribute("position", `${(i - 2) * 1.5} 1.2 -8`);
      target.setAttribute("static-body", "");
      target.classList.add("target");
      scene.appendChild(target);
    }

    scene.addEventListener("shoot", () => {
      const arrow = document.createElement("a-entity");
      arrow.setAttribute("gltf-model", "#arrowModel");
      arrow.setAttribute("dynamic-body", "shape: box; mass:0.1");
      arrow.setAttribute("position", bow.object3D.position);
      scene.appendChild(arrow);
      const dir = new THREE.Vector3();
      scene.camera.getWorldDirection(dir);
      arrow.body.applyImpulse(
        new CANNON.Vec3(dir.x * 5, dir.y * 5, dir.z * 5),
        new CANNON.Vec3().copy(arrow.getAttribute("position")),
      );
    });

    scene.addEventListener("collide", (e) => {
      if (e.detail.body.el.classList.contains("target")) {
        console.log("Cible touchée");
      }
    });
  },
});
