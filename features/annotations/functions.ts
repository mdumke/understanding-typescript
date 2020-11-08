// annotate parameters and return values
const add = (a: number, b: number): number => {
  // the return type can be checked
  return a + b
}

// when destructuring, annotations are still following after
const add2 = ({ a, b }: { a: number; b: number }): number => {
  return a + b
}

// void can mean null or undefined
const logger = (message: string): void => {
  console.log(message)
}

// the end of this function will not be reached
const fail = (message: string): never => {
  throw new Error(message)
}
