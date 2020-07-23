const { Transform } = require("stream");

class ReverseTransform extends Transform {
  reverse(data = "") {
    let stringArray = data.split("");
    return stringArray.reverse().join("");
  }

  _transform(chunk, encoding, callback) {
    let input = chunk.toString().trim();
    let results = this.reverse(input) + "\n"; // respect line termination
    callback(null, results);
  }
}

reverseTransform = new ReverseTransform();

process.stdin.pipe(reverseTransform).pipe(process.stdout);
