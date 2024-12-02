const { readFileSync } = require('fs')
const path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.trim().split(/\s+/).map(Number))

const DESCENDING = 'DESCENDING'
const ASCENDING = 'ASCENDING'

const isDifferenceBetweenOneAndThree = (val, nextVal) => {
    const diff = Math.abs(val - nextVal)
    return diff >= 1 && diff <= 3
}

const getDirection = (val, nextVal) => {
    return val > nextVal ? DESCENDING : ASCENDING
}

const isReportSafe = (report) => {
    if (report.length < 2) {
        return false
    }
    let type = null
    for (let j = 0; j < report.length - 1; j++) {
        const currentVal = report[j]
        const nextVal = report[j + 1]
        if (currentVal === nextVal) {
            return false
        }
        if (!isDifferenceBetweenOneAndThree(currentVal, nextVal)) {
            return false
        }
        if (j === 0) {
            type = getDirection(currentVal, nextVal)
        } else {
            if (type !== getDirection(currentVal, nextVal)) {
                return false
            }
        }
    }
    return true
}

let part1 = 0
let part2 = 0

for (let i = 0; i < input.length; i++) {
    const currentReport = input[i]
    if (isReportSafe(currentReport)) {
        part1++
        part2++
        continue
    }
    for (let k = 0; k < currentReport.length; k++) {
        const modifiedReport = currentReport.slice(0, k).concat(currentReport.slice(k + 1))
        if (isReportSafe(modifiedReport)) {
            part2++
            break
        }
    }
}

console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)