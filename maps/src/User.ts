// no problems here if @types/faker is npm-installed
import faker from 'faker'

// get the interface definition
import { Mappable } from './Map'

// the convention in Typescript is to not use
// default exports
export class User implements Mappable {
  name: string

  // this is only a type definition, the code
  // does *not* initialize a location object
  location: {
    lat: number
    lng: number
  }

  constructor () {
    this.name = faker.name.findName()
    this.location = {
      // the explicit conversion is necessary because
      // Typescript knows latitude returns a string
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  markerContent (): string {
    return `<h1>${this.name}</h1>`
  }
}
