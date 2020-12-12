const fs = require('fs')

fs.readFile('numbers.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)

  // validation logic
  const preambleLength = 25
  const numbers = data.trim().split('\n').map(Number)
  let result = 0

  for (let i = preambleLength, j = 0; i < numbers.length; i++, j++) {
    let n = numbers[i]
    if (isInvalid(n, numbers.slice(j, preambleLength + j))) {
      result = n
      break
    }
  }
  console.log(`Part one: ${result}`)

  // Part 2
  const target = result
  let result2 = []
  const underTarget = () => result2.reduce((a, b) => a + b, 0) < target
  const meetsTarget = () => result2.reduce((a, b) => a + b, 0) === target

  for (let i = 0; i < numbers.length; i++) {
    let init = i
    while (underTarget()) {
      result2.push(numbers[init++])
    }
    if (meetsTarget()) break
    while (result2.length) {
      result2.pop()
    }
  }
  console.log(`Part two: ${findWeakness(result2)}`)
})

function isInvalid(n, preamble) {
  for (let n1 = 0; n1 < preamble.length - 1; n1++)
    for (let n2 = n1; n2 < preamble.length; n2++) {
      if (preamble[n1] + preamble[n2] === n) return false
    }
  return true
}

function findWeakness(nums) {
  return Math.max(...nums) + Math.min(...nums)
}
