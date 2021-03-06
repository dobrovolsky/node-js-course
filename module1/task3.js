import fs from "fs";
import path from "path";
import stream from "stream";

import { csv } from "csvtojson";

const CSVFILE = "./csv/nodejs-hw1-ex1.csv";
const RESULTFILE = "task3-results.txt";

const readStream = fs.createReadStream(path.resolve(__dirname, CSVFILE), {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream(path.resolve(__dirname, RESULTFILE), {
  encoding: "utf8",
});

const csvParserParams = {
  noheader: false,
  headers: ["book", "author", "amount", "price"],
  colParser: {
    amount: "omit",
    price: "number",
  },
};

stream.pipeline(readStream, csv(csvParserParams), writeStream, (err) => {
  if (err) {
    console.error("Pipeline failed.", err);
  } else {
    console.log("Pipeline succeeded.");
  }
});
