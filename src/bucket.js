const { Readable } = require("stream");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucket = storage.bucket("whispers-audio-files");

const writeFileToBucket = (fileName, contents) =>
  new Promise((resolve, reject) => {
    const input = Readable.from([contents]);
    const file = bucket.file(fileName);
    const output = file.createWriteStream();
    input.pipe(output);

    input.on("end", () => {
      resolve(file.publicUrl());
    });
    input.on("error", (err) => {
      reject(err);
    });
  });

module.exports = {
  writeFileToBucket,
};
