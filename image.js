// Import the Google Cloud client library
const vision = require("@google-cloud/vision");
const fs = require("fs");

async function processImage(fileName, lang) {
  // Create a client with service account credentials to download from the google cloud console
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./private-credentials-diary-374313-20541ad5e3b8.json",
  });
  const content = fs.readFileSync(fileName);
  const EN = "en-t-i0-handwrit";
  const RO = "ro-t-i0-handwrit";
  const prefferedLanguage = lang === EN ? [EN] : lang === RO ? [RO] : [RO, EN];

  const request = {
    image: {
      content,
    },
    imageContext: {
      languageHints: prefferedLanguage,
    },
  };

  // Read the local image as a text document
  const [result] = await client.documentTextDetection(request);
  const output = result.fullTextAnnotation.text;
  const outputFileName = `${fileName.split(".")[0]}.txt`;
  fs.writeFileSync(outputFileName, output, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Done!");
    }
  });
}

module.exports.process = processImage;
