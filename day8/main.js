const fs = require('fs')

fs.readFile('index.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)

  // logic..
  const instr = new iSet(data.trim().split('\n')) // parse instructions
  const flip = i => (i === 'jmp' ? 'nop' : 'jmp') // flip instruction
  const done = () => iSet.play(0, instr.set) // true if done, false if not

  for (let row = 0; row <= instr.set.length + 1; row++) {
    const { i } = instr.set[row]
    let [pred, val] = i.split(' ')

    // continue if not a jmp or nop
    if (pred === 'acc') continue

    // play instructions
    instr.reset()
    if (done()) break // did we make it?

    // flip the instruction and reset for next test
    instr.set[row].i = flip(pred) + ' ' + val
    instr.reset()
    if (done()) break

    // flip the instruction back for next iteration
    instr.set[row].i = pred + ' ' + val
  }

  console.log(iSet.accumulator) // final value
})

// instruction set class
class iSet {
  constructor(set) {
    this.set = set.map(i => ({ i, done: false }))
  }

  reset() {
    iSet.accumulator = 0
    for (let i of this.set) i.done = false
  }

  static play(line, set) {
    if (line === set.length) return true
    const ref = set[line]
    const { i, done } = ref
    // if this instruction has been done, we're in a loop
    if (done) return false

    let [pred, val] = i.split(' ')
    val = parseInt(val)

    if (pred === 'acc') {
      ref.done = true
      return (() => {
        iSet.accumulator += val
        return iSet.play(line + 1, set)
      })()
    }

    if (pred === 'jmp') {
      ref.done = true
      return (() => iSet.play(line + val, set))()
    }

    if (pred === 'nop') {
      ref.done = true
      return (() => iSet.play(line + 1, set))()
    }
  }

  static accumulator = 0
}
