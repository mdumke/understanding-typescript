# Maps: Displaying Geoinformation
The goal of the following application is to illustrate some design patterns that lead to better structured projects and code reuse. The application will take *Users* and *Companies* with location information and display that information on a Google map.


## Setup
Before starting the project, install `parcel-bundler` as a quick way to get Typescript code compiled and running in the browser, replacing `ts-node` in our workflow.

```bash
# installing a bundler / compiler
npm install parcel-bundler
```

We will also make use of the `faker` library. This is a pure JavaScript library, which means that Typescript will not know how to typecheck its exports. To fix this problem, the `DefinitelyTyped` project provides type definition files for a large number of JavaScript libraries. Those are typically installed using the `@types/` prefix:

```bash
# install faker and its type-definition file
npm install faker @types/faker
```

It the type definition file is missing, import statements will get marked by Typescript. To *see* the type definition file in VSCode, hover of the `faker` import and press `CTLR` - the import statement turns into a clickable link that will open up the referenced file.


## Google Maps Setup
Using google's maps service through the browser requires us to create a project at `console.developers.google.com`, activate `Google Maps JavaScript` for this project and generate an API key. We can then load the following script in our `index.html` file that will connect to the Google services:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=<API_KEY"></script>
```

When this setup works correctly, there will be a global variable named `google` available. Typescript does not know about this. So we again need to install the type definition files:

```bash
# installing type definitions for google maps
npm install @types/googlemaps
```

## Writing an Interface
Classmethods specify the type of object they can work with. That's a basic assumption behind Typescript. But what if a method wanted to work with a number of different types? Simply specifying an array of allowed types would introduce a rather tight coupling between the method and other parts of the program.

Interfaces are used to solve this problem. The typical file structure in a Typescript project has interface definitions at the top, followed by a class definition:

```txt
file.ts
  - interface1
  - interface2
  - ...

  class
```

The class will work with interfaces only, and this way, interfaces govern access to a class' functionality. Here's an example:

```ts
/*
 * Map.ts
 *
 */

// this can be imported by classes that want to
// follow this interface
export interface Mappable {
  location: {
    lat: number
    lng: number
  }
}

// restrict access to the functionality of google maps
// e.g. to limit what other engineers can do
export class Map {
  private googleMap: google.maps.Map

  constructor (divId: string) {
    this.googleMap = new google.maps.Map(document.querySelector(`#${divId}`), {
      zoom: 2,
      center: {
        lat: 0,
        lng: 0
      }
    })
  }

  addMarker (mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    })
  }
}
```

This code starts with an interface definition, and the `addMarker` method works only with this interface. Now other classes can choose to imlement this interface.

We also see the usage of the `private` modifier that makes sure `Map` can be a proper wrapper of the `google.maps.Map` class. The goal is to expose only a limited set of functionality.


## Implementing an Interface
Some programming languages distinguish concrete and abstract types. An object has to have on concrete type which is typically decided by the class it is instantiated from. When an object's functionality covers all that is required by some interface, however, the object is said to have the abstract type of that interface (or multiple interfaces) as well.

In Typescript, it is not necessary to be explicit about implementing a certain interface - it is enough to provide the required functionality. But being explicit helps Typescript detect errors. This can be particularly helpful when the interface definition changes and we need to find all the places where the interface is implemented.

The following code illustrates how a User class implements the Mappable interface while being explicit about it:

```ts
/*
 * User.ts
 *
 */

// no problems here if @types/faker is npm-installed
import faker from 'faker'

// get the interface definition
import { Mappable } from './Map'

// the convention in Typescript is to not use default exports
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
}
```

Should the interface change at any point, Typescript will mark the User as being an incorrect implementation of the Mappable interface. This helps with error detection.


## Connecting the Pieces
The little example project also has a `Company` class that implements the `Mappable` interface, and there is an additional `markerContent` method on the interface. Check out the full source code for more details.

To combine the two classes to do something useful, instantiate a User in `index.ts` and draw them on the map:

```ts
/*
 * index.ts
 *
 */

import { User } from './User'
import { Map } from './Map'

const user = new User()
const map = new Map('map')

map.addMarker(user)
```

That's it for this basic example. As the project uses `parcel` to do bundling, start a development server via:

```bash
npx parcel index.html
```

In summary, the example application illustrates three powerful features added by Typescript:

1. The possibility to limit access to the google Maps object through the use of a `private` modfier when building a wrapper.
2. The ability to define interfaces to manage access to functions and methods and thereby ensure a higher degree of decoupling.
3. The `implements` keyword which allows Typescript to check that a given class satisfies all requirements of an interface.

