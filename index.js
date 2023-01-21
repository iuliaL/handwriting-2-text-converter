const fs = require("fs");
const path = require("path");
const handwriting = require("./detectHandwriting");

const args = process.argv.slice(2);
if (args[0] === undefined) {
  console.log("Usage: npm start [entry-dir] [language]");
} else {
  const entryDirName = args[0];
  const lang = args[1];
  processAllFiles(entryDirName, lang);
}

// This function is recursive going through all sub-directories
async function processAllFiles(entryDirName, lang) {
  try {
    // Get the files/dirs as an array
    const items = await fs.promises.readdir(entryDirName, {
      withFileTypes: true,
    });

    // Loop them all includ
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
          try {
            await handwriting.process(fullPath, lang);
            console.log("DONE!");
          } catch (e) {
            console.error("There's been an error ", e);
          }
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
        processAllFiles(fullPath, lang);
      }
    }
  } catch (e) {
    // Catch anything bad that happens
    console.error("There's been an error ", e);
  }
}

// Helpers
function isImage(fileName) {
  const fileExt = fileName.replace(/^.*\./, "");
  const imagesExtension = ["png", "jpg", "jpeg"];
  return imagesExtension.indexOf(fileExt) !== -1;
}
