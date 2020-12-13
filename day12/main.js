// Advent of Code :: Day 12
const fs = require('fs')

fs.readFile('./day12/instrs.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)

  const ship = new Ship('E')
  const instrs = new Instructions(data)

  // Part 1
  ship.do(instrs.list())

  // Part 1 Answer => 1565
  console.log(ship.manhattan)
})

// Instruction Set Class
class Instructions {
  constructor(data) {
    this.set = data.trim().split('\n')
  }
  *list() {
    for (const i of this.set) yield i
  }
}

// Ship Class
class Ship {
  constructor(initial) {
    this.facing = initial
    this.switchDir = { N: 'S', E: 'W', S: 'N', W: 'E' }
    this.dirs = { N: 0, E: 0, S: 0, W: 0 }
  }

  // Return manhattan distance
  get manhattan() {
    return Object.values(this.dirs)
      .filter(a => a > 0)
      .reduce((a, b) => a + b)
  }

  // Execute a list of instructions from an Instruction Class
  do(instructions) {
    for (const instruction of instructions) {
      const [cmd, val] = Ship.parseInstruction(instruction)
      // If a turn, delegate to turn function
      if (cmd === 'L' || cmd === 'R') {
        this.turn(Ship.getSign(cmd), val)
        continue
      }
      // Otherwise, move the ship
      this.move(cmd, val)
    }
  }

  move(cmd, val) {
    // If command is Forward, just move in the facing direction
    if (cmd === 'F') cmd = this.facing
    this.dirs[cmd] += val
    this.dirs[this.switchDir[cmd]] -= val
  }

  turn(cmd, val) {
    this.facing = Ship.getNewDirection(this.facing, parseInt(`${cmd}${val}`))
  }

  static getNewDirection(current, next) {
    return Ship.directions.get(
      Ship.normalizeDegrees(Ship.directions.get(current) + next)
    )
  }

  static getSign(cmd) {
    return cmd === 'R' ? '+' : '-'
  }

  static normalizeDegrees(d) {
    if (d > 360) return d - 360
    if (d < 0) return d + 360
    if (d === 360) return 0
    return d
  }

  static parseInstruction(instruction) {
    return [instruction[0], Number(instruction.substring(1))]
  }

  static directions = new Map([
    [0, 'N'],
    [90, 'E'],
    [180, 'S'],
    [270, 'W'],
    ['N', 0],
    ['E', 90],
    ['S', 180],
    ['W', 270],
  ])
}
