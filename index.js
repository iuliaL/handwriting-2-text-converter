async function detectFulltext(fileName) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client with service account credentials to download from the google cloud console
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./private-credentials-diary-374313-20541ad5e3b8.json"
  });

  // Read a local image as a text document
  const [result] = await client.documentTextDetection(fileName);
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log(`TEXT INIT:\n${fullTextAnnotation.text}\n`);
  fullTextAnnotation.pages.forEach((page, index) => {
    console.log("Page", index + 1, page);
  });
}

detectFulltext("./laura.png")
