const loadGoogleMapsApi = require('load-google-maps-api');
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mapStyles from './mapStyles';

gsap.registerPlugin(ScrollTrigger);

export default class Map {
  constructor() {
    this.zoom = 16;
    this.mapEl = document.getElementById('map');
    this.icons = {
      dark: '../images/content/map-icon.svg',
      light: '../images/content/map-icon-light.svg',
    };
    this.markers = [];
    this.activeLoc = 1;
    this.APIkey = 'AIzaSyCGQJzinIXNmzZgSnzwgxnJdG_GPuNwhcg';
    this.map = null;

    this.locations = [
      ['Fifth, Olympia', 34.041308, -118.256753, '01'],
      ['Crossroads on Crosby', 34.03767054014871, -118.2561568931604, '02'],
      ['Hillcrest, Inglewood', 34.03329, -118.250527, '03'],
      ['Hillcrest, Inglewood', 34.031856, -118.256828, '04'],
      ['Fifth, Olympia', 34.036588, -118.260046, '05'],
    ];

    if (this.mapEl) this.init();
  }

  init = () => {
    loadGoogleMapsApi({ key: this.APIkey })
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
        this.start();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  start = () => {
    const { googleMaps, mapEl, icons, locations, activeLoc } = this;
    this.map = new googleMaps.Map(mapEl, {
      zoom: this.zoom,
      mapTypeId: googleMaps.MapTypeId.ROADMAP,
      icon: icons.dark,
      disableDefaultUI: true,
      styles: mapStyles,
    });

    for (let i = 0; i < locations.length; i++) {
      if (i === activeLoc) {
        this.map.setCenter(new googleMaps.LatLng(locations[activeLoc][1], locations[activeLoc][2]));

        this.markers.push(
          new googleMaps.Marker({
            position: new googleMaps.LatLng(this.locations[i][1], locations[i][2]),
            map: this.map,
            label: { color: 'white', fontSize: '21px', text: locations[i][3] },
            icon: this.icons.dark,
            zIndex: 100,
          })
        );
      } else {
        this.markers.push(
          new googleMaps.Marker({
            position: new googleMaps.LatLng(this.locations[i][1], locations[i][2]),
            map: this.map,
            label: { color: 'black', fontSize: '18px', text: locations[i][3] },
            icon: icons.light,
          })
        );
      }

      let self = this;
      googleMaps.event.addListener(this.markers[i], 'click', function (marker, i) {
        self.resetMarkers();
        this.setIcon(icons.dark);
        let label = this.getLabel();
        label.color = 'white';
        this.setLabel(label);
        this.setZIndex(100);
        this.map.panTo(new googleMaps.LatLng(this.getPosition().lat(), this.getPosition().lng()));
        document.querySelectorAll('.map-list-item').forEach((item) => item.classList.remove('active'));

        document.querySelector(`[data-map-item="${parseInt(label.text, 10)}"]`).classList.add('active');
      });
    }

    const mapListItems = document.querySelectorAll('[data-map-item]');
    const zoomIncBtn = document.querySelector('#zoom-inc');
    const zoomDecBtn = document.querySelector('#zoom-dec');

    zoomIncBtn.addEventListener('click', () => {
      this.zoom += 0.5;
      this.map.setZoom(this.zoom);
    });

    zoomDecBtn.addEventListener('click', () => {
      this.zoom -= 0.5;
      this.map.setZoom(this.zoom);
    });

    mapListItems[activeLoc].classList.add('active');

    mapListItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        mapListItems.forEach((item) => item.classList.remove('active'));

        e.currentTarget.classList.add('active');

        this.resetMarkers();
        let id = e.currentTarget.getAttribute('data-map-item') - 1;

        let activeMarker = this.markers[id];

        let label = activeMarker.getLabel();

        activeMarker.setIcon(this.icons.dark);

        label.color = 'white';
        label.fontSize = '21px';
        activeMarker.setLabel(label);
        activeMarker.setZIndex(100);
        this.map.panTo(new googleMaps.LatLng(activeMarker.getPosition().lat(), activeMarker.getPosition().lng()));
      });
    });

    const map = document.querySelector('#map').parentElement;

    // if (window.innerWidth >= 1024) {
    //   gsap.to(map, {
    //     ease: 'power3.out',
    //     scrollTrigger: {
    //       // markers: true,
    //       trigger: map,
    //       start: 'top 32px',
    //       end: 'bottom 720px',
    //       pin: true,
    //       pinReparent: true,
    //       pinSpacing: false,
    //     },
    //   });
    // }
  };

  resetMarkers = () => {
    for (let marker of this.markers) {
      marker.setIcon(this.icons.light);
      let label = marker.getLabel();
      label.color = 'black';
      label.fontSize = '18px';
      marker.setLabel(label);
      marker.setZIndex(90);
    }
  };
}
