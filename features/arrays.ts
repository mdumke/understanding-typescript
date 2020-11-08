// on direct initialization, no annotations needed
const array1 = [1, 2, 3]

// annotate when empty initialization
const array2: number[] = []

// higher dimensional arrays
const array3: number[][] = []

// flexible types (discouraged)
const array4: (Date | string)[] = [new Date()]
