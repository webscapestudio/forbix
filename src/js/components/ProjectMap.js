const loadGoogleMapsApi = require('load-google-maps-api');
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mapStyles from './mapStyles';

gsap.registerPlugin(ScrollTrigger);

export default class ProjectMap {
  constructor() {
    this.zoom = 16;
    this.mapEl = document.getElementById('project-map');
    this.icons = {
      dark: '../images/content/map-icon.svg',
      light: '../images/content/map-icon-light.svg',
    };
    this.markers = [];
    this.activeLoc = 0;
    this.APIkey = 'AIzaSyCGQJzinIXNmzZgSnzwgxnJdG_GPuNwhcg';
    this.map = null;

    if (this.mapEl) {
      this.mapLat = this.mapEl.getAttribute('data-map-lat');
      this.mapLng = this.mapEl.getAttribute('data-map-lng');
      this.mapNum = this.mapEl.getAttribute('data-map-num');
      this.init();
    }
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

    this.map.setCenter(new googleMaps.LatLng(this.mapLat, this.mapLng));

    new googleMaps.Marker({
      position: new googleMaps.LatLng(this.mapLat, this.mapLng),
      map: this.map,
      label: { color: 'white', fontSize: '21px', text: this.mapNum },
      icon: this.icons.dark,
      zIndex: 100,
    });

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
  };
}
