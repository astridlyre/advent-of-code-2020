const fs = require('fs')

class Passport {
  #p
  constructor(s) {
    let entries = s.trim().split(/\s/)
    this.#p = Object.fromEntries(entries.map(e => e.split(':')))
    this.isValid = Passport.validateEntries(this.#p)
    console.log(this.#p)
  }

  static isValidBirthYear(y) {
    return 1920 <= y && y <= 2002
  }

  static isValidIssueYear(y) {
    return 2010 <= y && y <= 2020
  }

  static isValidExpirationYear(y) {
    return 2020 <= y && y <= 2030
  }

  static isValidHeight(h) {
    let inches = h.match(/(^\d+in$)/)
    let cm = h.match(/(^\d+cm)/)
    if (inches) {
      let n = parseInt(...inches)
      return n >= 59 && n <= 76
    }
    if (cm) {
      let n = parseInt(...cm)
      return n >= 150 && n <= 193
    }
    return false
  }

  static isValidHairColor(c) {
    return /^#[a-fA-F0-9]{6}$/.test(c)
  }

  static isValidEyeColor(c) {
    const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    let match = 0
    for (let color of colors) {
      if (c === color) match++
    }
    return match === 1
  }

  static isValidPassportNumber(n) {
    return /^\d{9}$/.test(n)
  }

  static hasValidKeys(p) {
    for (let key of Passport.pKeys) {
      if (!p.includes(key)) {
        return false
      }
    }
    return true
  }

  static validateEntries(p) {
    return (
      Passport.isValidBirthYear(p.byr) &&
      Passport.isValidIssueYear(p.iyr) &&
      Passport.isValidExpirationYear(p.eyr) &&
      Passport.isValidHeight(p.hgt) &&
      Passport.isValidHairColor(p.hcl) &&
      Passport.isValidEyeColor(p.ecl) &&
      Passport.isValidPassportNumber(p.pid)
    )
  }

  static filterOutInvalid(passports) {
    const split = passports.split('\n\n').filter(p => Passport.hasValidKeys(p))
    const parsedPassports = []
    for (let passport of split) {
      let p = new Passport(passport)
      if (p.isValid) parsedPassports.push(p)
    }
    return parsedPassports
  }

  static pKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
}

fs.readFile('data4.txt', 'utf-8', (err, data) => {
  if (err) throw err
  const passports = Passport.filterOutInvalid(data)
  console.log(passports.length)
})
