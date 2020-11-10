// this can be imported by classes that want to
// follow this interface
export interface Mappable {
  location: {
    lat: number
    lng: number
  }

  markerContent(): string
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

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      })

      infoWindow.open(this.googleMap, marker)
    })
  }
}
