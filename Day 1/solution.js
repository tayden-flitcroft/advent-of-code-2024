const { readFileSync } = require('fs')
const path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
	.split('\n')

const [ left, right ] = input.reduce((acc, val) => {
	const [ leftVal, rightVal ] = val.split(/\s+/).map(Number)
	acc[0].push(leftVal)
	acc[1].push(rightVal)
	return acc
}, [[], []])

const quantityInRightList = left.reduce((acc, val) => {
	acc[val] = right.filter(value => value === val).length
	return acc
}, {})

left.sort((a, b) => a - b)
right.sort((a, b) => a - b)

const getDistance = (firstVal, secondVal) => {
	return Math.abs(firstVal - secondVal)
}

let part1 = 0
let part2 = 0

for (let i = 0; i < left.length; i++) {
	const currentLeft = left[i]
	const currentRight = right[i]

	part1 += getDistance(currentLeft, currentRight)
	part2 += currentLeft * quantityInRightList[currentLeft]
}

console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)