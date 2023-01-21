## Handwriting detection with Google's OCR

Processes image files (of type `PNG`, `JPG`, `JPEG`) containing _handwritten_ (or _typed_ text) found
in an entry point directory and all its subdirectories. Outputs a `.txt` file for each image file.

Makes use of [Google Vision API](https://cloud.google.com/vision).
### Installation
```
npm install
```

### Run
```
npm start [entry-directory-name] [optional:language EN/RO]
```
