// define a generic interface
interface Reportable {
  summary(): string
}

// any object that implements the interface works
const printSummary = (item: Reportable): void => {
  console.log(item.summary())
}

// car has a summary method, but it's not declared
// a Reportable: is has other properties as well
const car = {
  name: 'Lada',
  summary (): string {
    return 'old car'
  }
}

printSummary(car)
