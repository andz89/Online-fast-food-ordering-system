import fs from "fs";

export const deleteImage = async function (data) {
  console.log(data);
  const isParametersArray = Array.isArray(data);

  if (isParametersArray == true) {
    console.log("image is available and array");
    for (let i = 0; i < data.length; i++) {
      const filePath = "backend/public/images/" + data[i];

      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // File does not exist or is not accessible
          console.error("File does not exist:", err);
        } else {
          // File exists and is accessible, proceed with deletion
          fs.unlink(filePath, async (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting file:", unlinkErr);
            } else {
              console.log("success deleting images");
              return "true";
              // await unlinkAsync("public/images/canvas_image/" + data[i]);
            }
          });
        }
      });
    }
  } else {
    const filePath = "backend/public/images/" + data;
    fs.access(filePath, fs.constants.F_OK, (err) => {
      console.log(filePath);
      console.log("image is available");

      if (err) {
        // File does not exist or is not accessible
        console.error("File does not exist:", err);
      } else {
        // File exists and is accessible, proceed with deletion
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
          } else {
            console.log("success deleting image");
            // await unlinkAsync("public/images/users/" + data);
          }
        });
      }
    });
  }
};
