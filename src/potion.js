AFRAME.registerComponent("potion-game", {
  init: function () {
    const scene = this.el;
    const table = document.createElement("a-entity");
    table.setAttribute("gltf-model", "#tableModel");
    table.setAttribute("position", "2 0.5 -5");
    scene.appendChild(table);

    const cauldron = document.createElement("a-entity");
    cauldron.setAttribute("gltf-model", "#cauldronModel");
    cauldron.setAttribute("position", "2 1 -5");
    cauldron.setAttribute("static-body", "");
    scene.appendChild(cauldron);

    [1, 2, 3, 4].forEach((i) => {
      const flask = document.createElement("a-entity");
      flask.setAttribute("gltf-model", `#flask${i}`);
      flask.setAttribute("position", `${1.5 + i * 0.5} 1.2 -4`);
      flask.setAttribute("grabbable", "");
      flask.setAttribute("droppable", "");
      flask.setAttribute("id", `flask${i}`);
      scene.appendChild(flask);
    });

    const recipe = document.createElement("a-entity");
    recipe.setAttribute("geometry", "primitive: plane; width:1; height:1");
    recipe.setAttribute(
      "material",
      "src: /assets/textures/recipe.png; transparent:true",
    );
    recipe.setAttribute("position", "2 2 -4.5");
    scene.appendChild(recipe);

    cauldron.addEventListener("drop", (evt) => {
      console.log(`Versé : ${evt.detail.dropped.getAttribute("id")}`);
    });
  },
});
