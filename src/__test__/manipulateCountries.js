const _ = require("lodash");

const data = require("./countrys.json");

const newData = _.map(data, element => {
  return _.merge(element, {safety: Math.random()});
})

console.log(JSON.stringify(newData, null, 2));
