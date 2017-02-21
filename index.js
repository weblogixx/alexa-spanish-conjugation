const getConjugations = require('./getConjugations');
const logger = require('./log');

getConjugations('mandar').then((data) => {
  logger.log('info', data);
}).catch((err) => {
  logger.log('error', err);
});
