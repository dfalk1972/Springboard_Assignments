document.addEventListener("DOMContentLoaded", function () {
  const colorForm = document.querySelector("#color-form");
  const colorInput = document.querySelector("#color-input");
  const newBoxBtn = document.querySelector("#new-box-button");
  let boxCounter = 0;
  let color;
  let container = document.querySelector("#box-container");
  const boxes = function () {
    return document.querySelectorAll(".box");
  };

  function createNewBox() {
    const newBox = document.createElement("div");
    newBox.classList.add("box");
    boxCounter++;
    const label = `Box# ${boxCounter}`;
    newBox.innerText = label;
    newBox.dataset.label = label;
    newBox.style.backgroundColor = color;
    document.querySelector("#box-container").appendChild(newBox);
  }

  newBoxBtn.addEventListener("click", function (e) {
    createNewBox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "n" || e.key === "N") {
      createNewBox();
    }
  });
  //remove box
  container.addEventListener("dblclick", function (e) {
    if (e.target.classList.contains("box")) {
      e.target.remove();
      boxCounter = document.querySelectorAll("#box-container .box").length;
    }
  });

  function isValidColor(str) {
    const test = document.createElement("button");
    test.style.color = str;
    return test.style.color !== "";
  }
  container.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("box")) {
      e.target.innerText = `Box Coordinates X: ${e.pageX}  Y:${e.pageY}`;
    }
  });
  container.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("box")) {
      e.target.innerText = e.target.dataset.label;
      //console.log(`Box Coordinates X: ${e.pageX}  Y:${e.pageY}`);
    }
  });

  colorForm.addEventListener("submit", function (e) {
    e.preventDefault(); //stop page refresh
    let inputColor = colorInput.value.toLowerCase().trim();
    if (!isValidColor(inputColor)) {
      alert("That is not a valid color!");
      colorInput.value = "";
      return;
    }
    color = inputColor;
    boxes().forEach(function (box) {
      box.style.backgroundColor = color;
    });
    colorInput.value = "";
  });
});
