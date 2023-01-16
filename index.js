  // Import the Google Cloud client library
  const vision = require("@google-cloud/vision");
const fs = require("fs");


async function detectFulltext(fileName, lang) {
  // Create a client with service account credentials to download from the google cloud console
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./private-credentials-diary-374313-20541ad5e3b8.json",
  });
  
  const EN = "en-t-i0-handwrit";
  const RO = "ro-t-i0-handwrit";
  const prefferedLanguage = lang === EN ? [EN] : lang === RO ? [RO] : [RO, EN];

  const request = {
    image: {
      content: fs.readFileSync(fileName),
    },
    imageContext: {
      languageHints: prefferedLanguage,
    },
  };

  // Read the local image as a text document
  const [result] = await client.documentTextDetection(request);
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log(`INIT -------- \n${fullTextAnnotation.text}\n`);
  // fullTextAnnotation.pages.forEach((page, index) => {
  //   console.log("Page", index + 1, page);
  // });
}

detectFulltext("./images/07_01_2021/IMG_4584.png", "RO");
