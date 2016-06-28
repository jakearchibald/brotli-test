const express = require('express');
const shrinkRay = require('shrink-ray');
const zlib = require('zlib');

const app = express();

app.use(shrinkRay({
  brotli: {quality: 11}
}));

app.get('/', (req, res) => {
  const start = Date.now();
  res.set('Content-Type', 'text/html');
  res.write('<!DOCTYPE html><title>Brotli Test</title>');

  function writeChunks() {
    res.write(`<span>Brotli is a whole new data format. This new format allows us to get 20–26% higher compression ratios over Zopfli. In our study ‘Comparison of Brotli, Deflate, Zopfli, LZMA, LZHAM and Bzip2 Compression Algorithms’ we show that Brotli is roughly as fast as zlib’s Deflate implementation</span> `);

    if (Date.now() - start > 20000) {
      res.end();
      return;
    }

    setTimeout(writeChunks, 10);
  }

  writeChunks();
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});