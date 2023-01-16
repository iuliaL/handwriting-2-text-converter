const fs = require("fs");
const path = require("path");
const text = require("./text");
const image = require("./image");

//TODO account for language preference

const directoryName = "./data";
processAllFiles(directoryName);

// Make an async function that gets executed immediately
async function processAllFiles(entryDirName) {
  // Our starting point
  try {
    // Get the files/dirs as an array
    const items = await fs.promises.readdir(entryDirName, {
      withFileTypes: true,
    });

    // Loop them all
    for (const item of items) {
      // Get the full paths
      const fullPath = path.join(entryDirName, item.name);

      if (item.isFile()) {
        if (item.name.startsWith(".")) {
          // Skipping .DS_Store files
          continue;
        }
        if (isImage(item.name)) {
          console.log("'%s' is an image file.", fullPath, "Processing...");
          // TODO put this as a promise and wait for it and log when it's done
          image.process(fullPath);
          // text.process(fullPath);
        } else {
          console.error(
            "'%s' is not a supported image file.",
            fullPath,
            "Skipping..."
          );
        }
      } else if (item.isDirectory()) {
        console.log(
          "'%s' is a directory.",
          fullPath,
          "Going through its containing files..."
        );
        processAllFiles(fullPath);
      }
    }
  } catch (e) {
    // Catch anything bad that happens
    console.error("There's been an error ", e);
  }
}

function isImage(fileName) {
  const fileExt = fileName.replace(/^.*\./, "");
  const imagesExtension = ["png", "jpg", "jpeg"];
  return imagesExtension.indexOf(fileExt) !== -1;
}
