const fs = require('fs')

function findWeakness(nums) {
  return Math.max(...nums) + Math.min(...nums)
}

fs.readFile('numbers.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)

  // validation logic
  const target = 26796446
  const numbers = data.trim().split('\n').map(Number)
  let result = []
  const underTarget = () => result.reduce((a, b) => a + b, 0) < target
  const meetsTarget = () => result.reduce((a, b) => a + b, 0) === target

  for (let i = 0; i < numbers.length; i++) {
    let init = i
    while (underTarget()) {
      result.push(numbers[init++])
    }
    if (meetsTarget()) break
    while (result.length) {
      result.pop()
    }
  }
  console.log(findWeakness(result))
})
