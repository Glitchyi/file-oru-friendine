const COS = require("ibm-cos-sdk");

// COS credentials and configuration
const cosConfig = {
  endpoint: "s3.au-syd.cloud-object-storage.appdomain.cloud",
  apiKeyId: "YAuAkkWjlWVeoOCx0Ph0ys4eWThui2cyrdwcVzzi8GNw",
  serviceInstanceId:
    "crn:v1:bluemix:public:cloud-object-storage:global:a/e89228425feb4200be0cab08c929a84b:d7282421-93ea-4c38-9794-d74fff6570be:bucket:glitchyifilesharebucket",
};

function deleteFile(fileName) {
  // Initialize the COS client
  const cosClient = new COS.S3(cosConfig);
  const bucketName = "glitchyifilesharebucket";

  // Delete the file from COS
  cosClient.deleteObject(
    {
      Bucket: bucketName,
      Key: fileName,
    },
    (err, data) => {
      if (err) {
        console.error("Error deleting the file:", err);
      } else {
        console.log("File deleted successfully:", data);
      }
    }
  );
}

module.exports = { deleteFile };
