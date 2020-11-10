import faker from 'faker'
import { Mappable } from './Map'

// not necessary, but helpful to be explicit about
// the abstract type given through the interface
export class Company implements Mappable {
  companyName: string
  catchPhrase: string

  location: {
    lat: number
    lng: number
  }

  constructor () {
    this.companyName = faker.company.companyName()
    this.catchPhrase = faker.company.catchPhrase()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  markerContent (): string {
    return `
      <h1>${this.companyName}</h1>
      <h3>${this.catchPhrase}</h3>
    `
  }
}
