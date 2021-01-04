const { Readable } = require("stream");
const { Storage } = require("@google-cloud/storage");

const bucketName = "whispers-audio-files";

const storage = new Storage();
const bucket = storage.bucket(bucketName);

module.exports = (fileName, contents) =>
  new Promise((resolve, reject) => {
    const input = Readable.from([contents]);
    const file = bucket.file(`${fileName}.wav`);
    const output = file.createWriteStream({ contentType: "audio/L16" });
    const start = Date.now();
    input.pipe(output);

    input.on("end", () => {
      console.log(`Elapsed bucket write time: ${Date.now() - start} ms.`);
      resolve(file.publicUrl());
    });
    input.on("error", (err) => {
      reject(err);
    });
  });
