# Typescript Features and Syntax
While syntax is the basis, the real challenge when working with Typescript is to understand design patterns that make code more reusable and less error prone. This will be the focus further below. For now, the goal is to expose the syntax and general concepts.

If, for any reason, you wanted to exclude a file from being checked by TypeScript, add `// @ts-nocheck` as the first line of a file.


## Types
Every value in Typescript has a type - a collections of properties and functions. Some types are basic, but we can build custom ones as well. In particular, there are:

```ts
// primitive types
number
string
symbol
undefined
boolean
void
null

// object types
functions
array
classes
objects
```

Generally, types are relevant because they help with *error checking*, and they serve as *documentation* about the kind of information we are working with.

```ts
// the Date type will have some associated
// methods and properties
const today = new Date()

// a new custom type
const person = {
  age: 50
}

// an IDE can give information on the types
today
person
```

Types are used everywhere, naturally. In Typescript, every value has a type.


## Type Annotations and Inference
Using type annotations, we can tell Typescript about the type of a value as in the listing below:

```ts
/* Type annotation examples */

// most basic type annotation for a variable
const apples: number = 5
const firstName: string = 'Ada'

// types and values can have the same name
const nothing: null = null

// usage with built-in objects
const now: Date = new Date()

// an array of strings
const colors: string[] = ['red', 'green']

// type annotation for classes
class Car { }
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
```

*None of the above annotations are necessary!* That is because when a variable declaration and initalization happen on the same line, Typescript uses *type inference* to determine the type automatically.

Use type annotations when Typescript cannot figure out the type on its own. Otherwise, rely on type inference.

When type inference it not possible, Typescript will assign the `any` type. You could assign this type explicitely yourself, but that would defeat the purpose of using types in the first place. Functions that don't know their return value ahead of time will return `any` type. In such a case, it might be a good idea to use a type annotion:

```ts
// without a type annotation, TS cannot know the type
const json = '{"x": 10, "y": 20}'
const coordinate1 = JSON.parse(json)

// in this case, declare the type
const coordinate2: { x: number; y: number } = JSON.parse(json)

// TS needs help when the type can be more than one
let someValue: number | boolean
```

Annotating function parameters has a different syntax. Notice the two special cases of `void` and `never`. Function return values do not necessarily need to be annotated. But checking the return values can help prevent errors.

```ts
// annotate parameters and return values
const add = (a: number, b: number): number => {
  // the return type can be checked
  return a + b
}

// when destructuring, annotations are still following after
const add2 = ({ a, b }: { a: number, b: number }): number => {
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

// optional arguments are possible
const fun = (x: number, y?: number): void => {
  // pass
}
```

Finally, objects can become verbose to destructure. Luckily, this is not often necessary.

```ts
// during setup, we can rely on type inference
const position = {
  coords: {
    lat: 52,
    lng: 20
  }
}

// destructuring does not usually need annotation
const { coords: { lat, lng } } = position

// but if they required, they can be verbose
const { coords: { lat, lng } }: { coords: { lat: number; lng: number } } = position
```

## Arrays
In Typescript, try to use a single type for values inside arrays. That is not strictly necessary, but it will help with interence when extracting elements from array, prevent adding incompatible values, and help with array iteration. Here is some basic syntax:

```ts
// on direct initialization, no annotations needed
const array1 = [1, 2, 3]

// annotate when empty initialization
const array2: number[] = []

// higher dimensional arrays
const array3: number[][] = []
```

It is possible to use arrays with multiple types. Annotations are particularly relevant, if the array is not initialized empty or with only a single type, though it could have different ones.

```ts
// flexible types (discouraged)
const array4: (Data | string)[] = [new Date()]
```

## Tuples
While arrays can be used to store any collection of items or properties, tuples are typically used as condensed ways of storing records. For this usecase the order of types matters. While this cannot be enforced in JavaScript, Typescript has the concept of a tuple:

```ts
// make the order of types explicit
const ada: [string, number] = ['Ada', 28]

// a more convenient way would be a type alias (see below)
type Person = [string, number]
const claire: Person = ['Claire', 35]
```

Oftentimes, using objects is more readable than using tuples, because object keys add helpful semantics. There are a few cases, however, where tuples are just right, e.g. when working with CSV files.


## Interfaces
Proper use of interfaces in combination with functions and classes can help enforce a clear program structure and lead to code reuse. The central idea is that interfaces govern access to functions, and objects or classes can choose to implement interfaces or adhere to them in order to get access to certain functions. Here's how this works at the most basic level using a plain object:

```ts
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
```


## Classes
Extending the ES2015 class syntax, Typescript supports modifiers for methods and properties:

```txt
public: can be called by everyone
private: can be called by other methods in this class
protected: can be called from this class or child classes
```

Here's a basic example of all three modifiers in use with an inheritance example.

```ts
class Machine {
  // everyone can call a public method
  public work (): void {
    console.log('working')
  }

  // Machine and all children will have access
  protected setInternalState (value: string): void {
    console.log(`setting state to '${value}'`)
  }
}

class Computer extends Machine {
  // inherit the public modifier
  work (): void {
    this.setInternalState('busy')
    this.doComputerStuff()
  }

  // only computers can call this
  private doComputerStuff (): void {
    console.log('inner workings of the computer')
  }
}

const computer = new Computer()

// from outside, only public methods can be called
computer.work()
```

When it comes to properties, Typescript offers a convenient way of initializing them using modifiers.

```ts
// the long version of setting up a property...
class Item {
  id: number

  constructor (id: number) {
    this.id = id
  }
}

// ...is equivalent to the shorthand
class Item2 {
  // other modifiers would work as well
  constructor (public id: number) {}
}

// properties are inherited as well
class SubItem extends Item {
  // no modifier is used with id this time, because
  // we don't want to overwrite the id property
  constructor (id: number) {
    super(id)
  }
}
```

A powerful way of using Typescript comes with the combination of Classes and Interfaces. This is best seen in code, so be sure to check out the example application.

