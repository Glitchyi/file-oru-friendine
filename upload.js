const COS = require("ibm-cos-sdk");
require('dotenv').config(); 

// COS credentials and configuration
const cosConfig = {
  endpoint: "s3.au-syd.cloud-object-storage.appdomain.cloud",
  apiKeyId: process.env.API_KEY,
  serviceInstanceId:
    "crn:v1:bluemix:public:cloud-object-storage:global:a/e89228425feb4200be0cab08c929a84b:d7282421-93ea-4c38-9794-d74fff6570be:bucket:glitchyifilesharebucket",
};

async function uploadFile(file) {
  // Initialize the COS client
  const cosClient = new COS.S3(cosConfig);
  const bucketName = "glitchyifilesharebucket";
  console.log("Uploading file:", file);
  // Generate a unique file name or use the original file name
  const fileName = file.originalname;

  cosClient.putObject(
    {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
    },
    (err, data) => {
      if (err) {
        console.error("Error uploading the file:", err);
      } else {
        console.log("File uploaded successfully:", data);
        return data;
      }
    }
  );
}

module.exports = { uploadFile };
