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