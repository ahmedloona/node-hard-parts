const fs = require('fs');
const through = require('through2');

/* Create a read stream here
const readPoemStream = ???
*/

function translate(string){
    const tokens = string.split(" ");
    const result = tokens.map(function(token){
        if (token == ':)'){
            return 'JOY';
        } else if (token == ':('){
            return 'SORROW'
        } else {
            return token;
        }
    });
    return result.join(" ");
}

function onNewBatch(data){
    console.log(data.toString());
    const stringified = data.toString();
    const translation = translate(stringified);
    console.log(translation);
}

const stream = fs.createReadStream('./streams/on-joy-and-sorrow-emoji.txt');
stream.on('data', onNewBatch)

const writeStream = fs.createWriteStream('on-joy-and-sorrow-fixed.txt');

stream.pipe(onNewBatch).pipe(writeStream)


/* Create a write stream here
const writePoemStream =
*/

/* EXTENSION: Create a transform stream (modify the read stream before piping to write stream)
const transformStream = ???
readPoemStream.pipe(transformStream).pipe(writePoemStream)
*/