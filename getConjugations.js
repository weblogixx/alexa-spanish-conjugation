'use strict';
const jsdom = require('jsdom');

const baseUrl = 'http://conjes.cactus2000.de/showverb.php';

function getList(verb) {
  return new Promise((resolve, reject) => {
    jsdom.env({
      url: `${baseUrl}?verb=${verb}`,
      done: (err, window) => {
        if (err) {
          reject(err.toString());
        }

        const doc = window.document;

        const output = {};
        const rowsLeft = doc.querySelectorAll('.conjtab td:nth-child(odd)');
        const rowsRight = doc.querySelectorAll('.conjtab td:nth-child(even)');

        getItems(rowsLeft);
        getItems(rowsRight);

        function getItems(selector) {
          let lastCol;

          selector.forEach((col) => {

            const isHeadline = col.className.indexOf('tim') !== -1;
            const text = col.innerHTML;

            // Initialize only if new headline
            if (isHeadline) {
              lastCol = text;
              output[lastCol] = [];
            } else if(text.length > 0) {
              output[lastCol].push(text);
            }
          });
        }

        return resolve(output);
      }
    });
  });
}

module.exports = getList;
