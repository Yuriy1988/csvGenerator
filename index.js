const uuidv1 = require('uuid/v1');
const moment = require('moment');
var faker = require('faker');
var fs = require('fs');
var csv = require('csv');
const max = 9007199254740991;
let values = 0;

function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

console.log('start');
csv.generate({seed: 2, columns: 2, length: max})
  .pipe(csv.parse())
  .pipe(csv.transform((record) => {
    values = values + 1;
    if (values === 1) {
      return ['rowid', 'date', 'type', 'testId', 'description', 'amount']
    }
    return [
      String(uuidv1()), //rowId
      moment(faker.date.past(2, '2010-01-01')).format('YYYY-MM-DD'), //Date
      values % 2 ? 'Income' : 'Expense', // expanse, Income
      values, //testId
      faker.name.firstName(), //description
      getRandomArbitrary(10, 50), //amount
    ]
  }))
  .pipe(csv.stringify())
  .pipe(fs.createWriteStream('./expense.csv'));
