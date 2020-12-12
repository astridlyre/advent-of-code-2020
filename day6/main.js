const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) console.log(err)

  const groups = data.trim().split('\n\n')
  const sumOfAnswers = groups.reduce(getCommonsAnswersTwo, 0)
  console.log(sumOfAnswers)
})

// function getCommonAnswers(group) {
//   return new Set([...group].filter(c => c !== '\n')).size
// }

function getCommonsAnswersTwo(acc, group) {
  const members = group.match(/\n/g) || []
  const nMembers = members.length + 1
  const alpha = [...'abcdefghijklmnopqrstuvwxyz']
  const result = []

  for (const letter of alpha) {
    let found = 0
    for (const answer of group) if (letter === answer) found++
    if (found === nMembers) result.push(letter)
  }
  return acc + result.length
}
