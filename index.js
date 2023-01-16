const fs = require("fs");
const path = require("path");
const text = require("./text");

const directoryName = "./data/07_01_2021";

// Make an async function that gets executed immediately
(async () => {
  // Our starting point
  try {
    // Get the files as an array
    const files = await fs.promises.readdir(directoryName, {
      withFileTypes: true,
    });

    // Loop them all
    for (const file of files) {
      // Get the full paths
      const fullPath = path.join(directoryName, file.name);
      // console.log("file", file.name, fullPath, file.isDirectory());

      if (file.isFile()) {
        if (isImage(file.name)) {
          console.log("'%s' is an image file.", fullPath, "Processing...");
          // TODO put this as a promise and wait for it and log when it's done
          text.processImage(fullPath);
        }
      } else if (file.isDirectory()) {
        console.log("'%s' is a directory.", fullPath);
      }
    }
  } catch (e) {
    // Catch anything bad that happens
    console.error("There's been an error ", e);
  }
})();

function isImage(fileName) {
  const fileExt = fileName.replace(/^.*\./, "");
  const imagesExtension = ["png", "jpg", "jpeg"];
  return imagesExtension.indexOf(fileExt) !== -1;
}
