// most basic type annotation for a variable
const apples: number = 5
const firstName: string = 'Ada'

// types and values can have the same name
const nothing: null = null

// usage with built-in objects
const now: Date = new Date()

// an array of strings
const colors: string[] = ['red', 'green']

// a custom class
class Car {}
const herbie: Car = new Car()

// object literal as type
const point: { x: number; y: number } = {
  x: 10,
  y: 20
}

// rather verbose function type annotations
const logNumber: (n: number) => void = n => {
  console.log(n)
}

// without a type annotation, TS cannot know the type
const json = '{"x": 10, "y": 20}'
const coordinate1 = JSON.parse(json)

// in this case, declare the type
const coordinate2: { x: number; y: number } = JSON.parse(json)

// TS needs help again (code smell)
let numbers = [1, -2, 3]
let numberBelowZero: number | boolean = false

for (let n of numbers) {
  if (n < 0) {
    numberBelowZero = n
  }
}
