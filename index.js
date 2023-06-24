const parentContainer = document.getElementById("main");

parentContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
  const container = event.target.closest(".container");
  if (container && container.classList.contains("disabled") == false) {
    container.querySelector(".box").classList.add("boxhov");
  }
});

parentContainer.addEventListener("dragleave", (event) => {
  // Remove the drag-over class when leaving the drop zone
  const container = event.target.closest(".container");
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
  if (targetContainer.classList.contains("disabled") == false) {
    handleDrop(targetContainer, event.dataTransfer.files);
  }
});

function handleDrop(container, files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file) {
      if (file.type === "") {
        alert("File type not supported");
        console.log(file.type);
        container.querySelector(".box").classList.remove("boxhov");
        return;
      }
      if (file.size > 31457280) {
        alert("File size too large");
        console.log(file.size);
        container.querySelector(".box").classList.remove("boxhov");
        return;
      }

      console.log(file);

      // Send file to the Express server
      sendFileToServer(file, container)
        .then((response) => {
          console.log("File uploaded successfully:", response);
          // Perform any additional actions or handle the server response
          imageElement.classList.remove("loading");
          container.classList.add("disabled");
          container.querySelector(".text").innerHTML = file.name;
          container.querySelector(".text").style.opacity = 1;
          imageElement.style.opacity = 0;
          imageElement.src = "./assets/download.svg";
          imageElement.style.opacity = 1;
        })
        .catch((error) => {
          console.error("Error uploading the file:", error);
          console.log("error");
          imageElement.style.opacity = 0;
          imageElement.src = "./assets/addfile.svg";
          imageElement.style.opacity = 1;
        });
    }
  }
}

function sendFileToServer(file, container) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    const imageElement = container.querySelector("img");
    imageElement.style.opacity = 0;
    imageElement.src = "./assets/loading.svg";
    imageElement.classList.add("loading");
    imageElement.style.opacity = 1;
    imageElement.classList.remove("loading");
    container.classList.add("disabled");
    container.querySelector(".text").innerHTML = file.name;
    container.querySelector(".text").style.opacity = 1;
    imageElement.style.opacity = 0;
    imageElement.src = "./assets/download.svg";
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          resolve(responseData);
        } else {
          throw new Error("Upload failed");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
