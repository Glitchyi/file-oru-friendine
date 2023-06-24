const express = require('express');
const path = require('path');
const { uploadFile } = require('./upload.js');
const multer = require('multer');

const app = express();

app.use(express.static('.'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  try {
    await console.log(uploadFile(file)); // Wait for the uploadFile function to complete
    setTimeout(() => {
      deleteFile(fileNameToDelete);
    }, 5 * 60 * 1000);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error uploading the file:", error);
    res.sendStatus(500); // Return an error status code
  }
});

app.listen(80, () => {
  console.log('Server is running on port 80');
});
