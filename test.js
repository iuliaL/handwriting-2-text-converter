// Import the Google Cloud client library
const fs = require("fs");

async function detectFulltext(fileName, lang) {
  const content = fs.readFileSync(fileName);
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Donec sit amet posuere dolor. Vestibulum at luctus nunc. Maecenas a nunc 
  id nisi consequat aliquam. Class aptent taciti sociosqu ad litora torquent
  per conubia nostra, per inceptos himenaeos. Curabitur in dapibus quam, 
  sed tempus ligula. Duis sodales posuere mi, a malesuada velit consectetur at.
  Sed at dapibus neque. Mauris et magna ut erat blandit facilisis. 
  Sed sodales venenatis dolor, a venenatis ligula vulputate in.`;
  // Read the local image as a text document
  const output = await Promise.resolve(text);
  const outputFileName = `${fileName.split(".png")[0]}.txt`;
  fs.writeFileSync(outputFileName, output, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
}

detectFulltext("./data/07_01_2021/IMG_4584.png", "RO");
