import { AfterViewInit, Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoianVhbnVycXVpemEiLCJhIjoiY2x3Y2puYzQ4MHl6azJpbml2emNlcXJ0cyJ9.LJHP1EFX6xB4eM4lZLBEIQ';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      // accessToken: 'pk...',
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
