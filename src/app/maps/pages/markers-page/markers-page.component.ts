import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-99.1343, 19.4285);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      // accessToken: 'pk...',
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'JC'
    // const marker = new Marker({
    //   // color: 'red'
    //   element: markerHTML
    // }).setLngLat( this.currentLngLat ).addTo( this.map );

    this.readFromLocalStorage();
  }

  createMarker() {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return;

    const marker = new Marker({
      color,
      draggable: true
    }).setLngLat( lngLat ).addTo( this.map );

    this.markers.push({
      color,
      marker
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker( index: number ) {
    if ( !this.map ) return;

    // Eliminar el marcador del mapa:
    this.markers[index].marker.remove();
    // Eliminar el marcador del arreglo:
    this.markers.splice(index, 1);
  }

  flyTo( marker: Marker ) {
    if ( !this.map ) return;

    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });

  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers = JSON.parse(plainMarkersString) as PlainMarker[];

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker(coords, color);
    });

  }

}
