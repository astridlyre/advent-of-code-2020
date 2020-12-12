const fs = require('fs')

fs.readFile('adapters.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)

  // Initial variables
  const [adapters, device] = processAdapters(data)
  const sortAscending = (a, b) => a - b
  const sortDescending = (a, b) => b - a
  const sortedAdapters = [0].concat(adapters.sort(sortAscending), [device])

  // Part 1
  let oneJolt = 0
  let threeJolt = 0
  const jolts = [...mapAdapters(sortedAdapters, sortDescending)]
  for (const jolt of jolts) {
    if (jolt === 1) oneJolt++
    if (jolt === 3) threeJolt++
  }
  // Part 1 Answer => 2046
  console.log(`1 Jolts * 3 Jolts: ${oneJolt * threeJolt}`)

  // Part 2
  let nums = []
  let num = 0
  for (let n of jolts) {
    if (n === 1) {
      num++
      continue
    }
    if (n === 3 && num >= 1) {
      nums.push(getTrib(num))
      num = 0
    }
  }
  nums.push(getTrib(num)) // push the last remaining num
  // Part 2 Answer => 1157018619904
  console.log(`Ways to arrange your adapters: ${nums.reduce((a, b) => a * b)}`)
})

function getTrib(num) {
  let n = 0,
    t = tribonacci()
  while (num >= 0) {
    n = t.next().value
    num--
  }
  return n
}

function* tribonacci() {
  let x = 0,
    y = 0,
    z = 1
  while (true) {
    yield z
    ;[x, y, z] = [y, z, x + y + z]
  }
}

function processAdapters(data) {
  // will return list of adapters and max device joltage
  let adapters = []
  let deviceJoltage = 0
  for (const a of data.trim().split('\n')) {
    const current = Number(a)
    adapters.push(current)
    if (current > deviceJoltage) deviceJoltage = current
  }
  return [adapters, deviceJoltage + 3]
}

function* mapAdapters(a, fn) {
  // calls a function on two consecutive array elements
  for (let i = 0, j = 1; j < a.length; i++, j++) {
    let diff = fn(a[i], a[j])
    yield diff
  }
}
