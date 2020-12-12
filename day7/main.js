const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)

  // logic ensues....
  const bags = data
    .trim()
    .split('\n')
    .map(b => new Bag(b))

  // set up initial search for gold bag, includes initial bag
  const getVals = bag => {
    let bagToSum = bags.find(b => b.bag === bag)
    let sum = 1
    for (let [bag, numOfBag] of bagToSum.c) {
      sum += getVals(bag) * numOfBag
    }
    return sum
  }
  console.log(getVals('shiny gold bag') - 1)
})

class Bag {
  constructor(str) {
    const [h, t] = str.split('s contain ')
    const c = t.match(/([a-z]+\s[a-z]+\s[a-z]+[^s,.])/g)
    const nums = str.match(/(?<=\s)\d+(?=\s)/g)
    this.bag = h
    let entries = []
    for (let i = 0; i < c.length; i++) {
      if (nums !== null) entries.push([c[i], nums[i]])
    }
    this.c = new Map(entries)
  }
  canContain(b) {
    return this.c.has(b)
  }
  getSum() {
    if (this.c.size > 0) {
      return [...this.c.values()].reduce((a, b) => +a + +b)
    }
    return 1
  }
  getKeys() {
    return [...this.c.keys()]
  }
}
