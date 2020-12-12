// boarding pass exercise
const fs = require('fs')

class BoardingPass {
  constructor(str) {
    let r = str.substring(0, 7)
    let c = str.substring(7)
    this.row = BoardingPass.decodeRow(r)
    this.col = BoardingPass.decodeCol(c)
  }

  getSeatId() {
    return this.row * 8 + this.col
  }

  static decodeRow(str) {
    const { toBit } = BoardingPass
    const bits = [...str].map(c => toBit(c, 'F', 'B')).join('')
    return parseInt(bits, 2)
  }

  static decodeCol(str) {
    const { toBit } = BoardingPass
    const bits = [...str].map(c => toBit(c, 'L', 'R')).join('')
    return parseInt(bits, 2)
  }

  static toBit(n, zero, one) {
    return n === zero ? '0' : n === one ? '1' : null
  }
}

fs.readFile('bps.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)
  // parse boarding passes
  const boardingPasses = data.trim().split('\n')
  const parsedBPs = boardingPasses
    .map(b => new BoardingPass(b).getSeatId())
    .sort()
  // find missing boarding pass
  let p1 = parsedBPs[0]
  let p2 = parsedBPs[1]
  let result = []
  for (let i = 0; i < parsedBPs.length - 1; i++) {
    if (p2 - p1 === 2) result.push(p1 + 1)
    p1 = parsedBPs[i]
    p2 = parsedBPs[++i]
  }
  console.log(result)
})
