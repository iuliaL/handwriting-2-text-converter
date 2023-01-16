const fs = require("fs");
const path = require("path");
const text = require("./text");

const directoryName = "./data/07_01_2021";

// Make an async function that gets executed immediately
(async () => {
  // Our starting point
  try {
    // Get the files as an array
    const files = await fs.promises.readdir(directoryName);

    // Loop them all
    for (const file of files) {
      // Get the full paths
      const fileName = path.join(directoryName, file);

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fileName);

      if (stat.isFile()) {
        if (isImage(file)) {
          console.log("'%s' is an image file.", fileName, "Processing...");
          // TODO put this as a promise and wait for it and log when it's done
          text.processImage(fileName);
        }
      } else if (stat.isDirectory()) {
        console.log("'%s' is a directory.", fileName);
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
