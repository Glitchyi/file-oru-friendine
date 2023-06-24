const parentContainer = document.getElementById("main");

parentContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
  container = event.target.closest(".container");
  if (container && container.classList.contains("disabled") == false) {
    container.querySelector(".box").classList.add("boxhov");
  }
});
parentContainer.addEventListener("dragleave", (event) => {
  // Remove the drag-over class when leaving the drop zone
  container = event.target.closest(".container");
  if (container && container.classList.contains("disabled") == false) {
    container.querySelector(".box").classList.remove("boxhov");
  }
});
parentContainer.addEventListener("dragenter", (event) => {
  event.preventDefault();
});

parentContainer.addEventListener("drop", (event) => {
  event.preventDefault();
  const targetContainer = event.target.closest(".container");
  if (
    targetContainer &&
    targetContainer.classList.contains("disabled") == false
  ) {
    handleDrop(targetContainer, event.dataTransfer.files);
  }
});

function handleDrop(container, files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file) {
      if (file.type==""){
        alert("File type not supported");
        console.log(file.type)
        container.querySelector(".box").classList.remove("boxhov");
        break;
      }
      imageElement = container.querySelector("img");
      imageElement.style.opacity = 0;
      imageElement.src = "./assets/download.svg";
      imageElement.style.opacity = 1;
    }
    console.log("Container:", container);
    container.classList.add("disabled");
    text = document.createTextNode(file.name);
    filename = document.createElement("span");
    filename.classList.add("text");
    filename.appendChild(text);
    container.appendChild(filename);
    console.log("File:", file.name);
    console.log("Size:", file.size);
    console.log("Type:", file.type);
  }
}
