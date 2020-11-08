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

class SubItem extends Item {
  // no modifier is used with id this time, because
  // we don't want to overwrite the id property
  constructor (id: number) {
    super(id)
  }
}
