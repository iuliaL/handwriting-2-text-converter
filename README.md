
# Text or handwriting detection with Google's OCR [Vision Ai](https://cloud.google.com/vision)

Processes image files (of type `PNG`, `JPG`, `JPEG`) containing _handwritten_ (or _typed_ text) found
in an entry point `directory` and all its `subdirectories`. Outputs a `.txt` file for each image file. Accepts a language hint parameter
i.e. `EN`,  `RO`,   `EN-HAND`, `RO-HAND`. Default is EN, RO (English and Romanian)

Makes use of [Google Vision API](https://cloud.google.com/vision).
To set up your Google console account and get your service account credentials file follow the docs above.

## Installation

```shell
npm install
```

## Usage

```shell
npm start [credentials-json-file] [entry-directory-name] [optional:language EN / RO / EN-HAND / RO-HAND ]
```
