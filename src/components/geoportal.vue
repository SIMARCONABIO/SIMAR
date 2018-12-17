/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 16/01/2018.
*
* GeoPortal Vue Component
*/
<template>
  <div class="geoportal-main">
    <div class="geoportal-map-container">
      <button
        class="btn btn-transparent btn-menu"
        @click="toggleMenu">
        <i class="icon-menu"/>
      </button>
      <map-menu
        :show="showMenu"
        @close="toggleMenu"
        @showModal="showModalAbout"/>
      <layers-admin
        v-show="layersAdmin"
        @close="toggleLayersAdmin"
        @addLayer="addLayer"
        @removeLayer="removeLayer"
      />
      <ModalAbout
        :show-modal="onModalAbout"
        @closeModal="showModalAbout"/>
      <modal-info
        @closeModalInfo="showModalInfo"
        :id-modal-info="idModalInfo"
        :show-modal-info="onModalInfo" />
      <chart-buoy
        v-if="buoyChart"
        @close="closeChartBuoy"/>
      <map-layer
        v-model="showLayers"
        @toggleLayer="toggleLayer"
        @changeOpacity="changeOpacity"
        @showLayersAdmin="toggleLayersAdmin"
        @removeLayer="removeLayerFromControl"
        @showInfo="showModalInfo"
      />
      <div
        class="map-info-container">
        <div class="map-info-date-container">
          <div class="map-info-date">
            <i class="icon-calendar"/>
            {{ infoDate }}
          </div>
          <button
            class="btn btn-control btn-transparent btn-timelapse"
            @click="onControlActivated('timelapse')">
            <i class="icon-clock"/> Tiempo<i class="down-icon el-icon-arrow-down"/>
          </button>
        </div>
        <div class="map-cursor-position-container">
          <map-cursor-position
            :mouse-position="mousePosition"/>
        </div>
        <map-controls
          :controls="controls"
          @activateControl="onControlActivated"
          @zoomIn="zoomIn"
          @zoomOut="zoomOut"
          @centerMap="centerMap"
          @showInfo="showModalInfo"
        />
        <map-timelapse
          :date="date.toDate()"
          :layers="showLayers"
          @selected="selectedDate"
          v-show="controls.timelapse "
          @close="onControlActivated('timelapse')"/>
      </div>

      <div class="controls-container">
        <map-options
          v-show="controls.options"
        />
        <map-share v-show="controls.share"/>
      </div>
      <v-map
        v-bind="mapOptions"
        ref="map"
        @l-mousemove="updateMousePosition">
        <v-tilelayer
          :url="`https://services.arcgisonline.com/arcgis/rest/services/${baseMap}/MapServer/tile/{z}/{y}/{x}`"/>
        <template v-for="(layer, index) in showLayers">
          <ms-tilelayer
            :url="baseUrl + layer.pathServer"
            v-if="layer.show && layer.hasData && layer.type === 'product'"
            :opacity="layer.opacity"
            :key="layer.id+'.'+index"/>
          <geo-json
            v-if="layer.show && layer.type === 'geojson' && layer.composition === 'boyas'"
            :geojson="buoys"
            :options="buoysOptions"
            :key="layer.id+'.'+index"
            @l-remove="onRemoveBuoys"
          />
          <geo-json
            v-if="layer.show && layer.type === 'geojson' && layer.composition === 'polygons'"
            :geojson="polygons"
            :options="polygonsOptions"
            :key="layer.id+'.'+index"
            @l-remove="onRemovePolygons"
          />
          <geo-json
            v-if="layer.show && layer.type === 'geojson' && layer.composition === 'polygons-alert'"
            :geojson="polygonsAlert"
            :options="polygonsAlertOptions"
            :key="layer.id+'.'+index"
            @l-remove="onRemoveAlertPolygons"
            @l-add="onAddAlertPolygons"
          />
        </template>
        <ms-tilelayer
          v-if="showMapLabels"
          :url="'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'"/>
      </v-map>
    </div>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import Vue from 'vue'
import { Map, TileLayer } from 'vue2-leaflet'
import GeoJSON from './custom-leaflet/GeoJSON'
import {mapActions} from 'vuex'
import CustomTileLayer from './custom-leaflet/TileLayer.vue'
import MapCursorPosition from './map-info/map-cursor-position.vue'
import MapControls from './map-controls/map-controls.vue'
import LayerControl from './map-controls/layer-control.vue'
import OptionsControl from './map-controls/options-control.vue'
import ShareControl from './map-controls/share-control.vue'
import TimelapseControl from './map-controls/timelapse-control.vue'
import MapMenu from './menu/menu'
import LayersAdmin from './layers-admin/layers-admin'
import moment from 'moment'
import lodash from 'lodash'
import ModalAbout from './menu/menu-about'
import ChartBuoy from './chart/charts-buoy'

import popupBuoy from './popup-buoy'
import popupPolygon from './popup-polygon'
import popupPolygonAlert from './popup-polygon-alert'
import ModalInfo from '@/components/_shared/modal-info'
moment.locale('es')

export default {
  name: 'Geoportal',
  inject: {
    injectedShowLayers: 'geoportal-view/showLayers'
  },
  data () {
    return {
      buoysOptions: {
        style: function (feature) {
          return feature.properties && feature.properties.style
        },
        onEachFeature: this.onEachBuoy,
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: new L.DivIcon({
            className: 'buoy-div-icon',
            bgPos: [0, -20],
            html: '<img class="buoy-div-image" src="static/images/boya.svg" /><br>' +
              '<span class="buoy-div-text" style="font-size: 0.8em">' + feature.properties.id + '</span>'
          })
          })
        }
      },
      polygonsOptions: {
        onEachFeature: this.onEachPolygon,
        style (feature) {
          return {
            color: '#23A1C8',
            fillOpacity: 0.5
          }
        }
      },
      polygonsAlertOptions: {
        onEachFeature: this.onEachPolygonAlert,
        style (feature) {
          return {
            color: '#999999',
            fillOpacity: 0.5
          }
        }
      },
      mapOptions: {
        center: [22.561961, -101.396472],
        zoom: 5,
        maxZoom: 20,
        options: {
          zoomDelta: 1,
          zoomSnap: 0.05,
          attributionControl: false,
          maxBounds: L.latLngBounds(L.latLng(33, -123), L.latLng(1, -59)),
          maxBoundsViscosity: 1,
          zoomControl: false
        }
      },
      baseUrl: process.env.API_ROOT_URL,
      mousePosition: {
        latlng: {lat: 0, lng: 0}
      },
      controls: {
        date: false,
        options: false,
        share: false,
        timelapse: false,
        colorimetry: false,
        layer: false
      },
      date: moment(),
      layersAdmin: false,
      showMenu: false,
      onModalAbout: false,
      onModalInfo: false,
      idModalInfo: 0,
      buoyPopups: [],
      polygonsPopups: [],
      polygonsAlertsPopups: [],
      showAlerts: false
    }
  },
  computed: {
    showLayers: {
      get () {
        return this.$store.getters['products/showLayers']
      },
      set (value) {
        return this.updateShowLayers(value)
      }
    },
    buoys () {
      return this.$store.getters['products/buoys']
    },
    polygons () {
      return this.$store.getters['products/polygons']
    },
    polygonsAlert () {
      return this.$store.getters['products/polygonsAlert']
    },
    buoyChart () {
      return this.$store.getters['products/buoyChart']
    },
    baseMap () {
      return this.$store.getters['app/baseMap']
    },
    showMapLabels () {
      return this.$store.getters['app/showLabels']
    },
    infoDate () {
      return this.date.format('DD [de] MMMM [de] YYYY')
    },
    layerDate () {
      return moment.utc(this.date.format('YYYY-MM-DD')).toISOString()
    }
  },
  components: {
    ModalInfo,
    'v-map': Map,
    'v-tilelayer': TileLayer,
    'map-cursor-position': MapCursorPosition,
    'map-controls': MapControls,
    'map-options': OptionsControl,
    'map-share': ShareControl,
    'map-timelapse': TimelapseControl,
    'map-layer': LayerControl,
    'ms-tilelayer': CustomTileLayer,
    MapMenu,
    LayersAdmin,
    ChartBuoy,
    ModalAbout,
    'geo-json': GeoJSON
  },
  watch: {
    date (newValue, oldValue) {
      if (this.showAlerts) { this.getAlertsData({year: this.date.year(), week: this.date.isoWeek()}) }
    }
  },
  methods: {
    ...mapActions('products', [
      'addShowLayer',
      'removeShowLayer',
      'changeShowLayersDate',
      'layerOpacity',
      'updateShowLayers',
      'toggleShowLayer',
      'getBuoys',
      'getPolygons',
      'getPolygonsAlert',
      'selectBuoy',
      'getChartBuoyData',
      'getAlertsData',
      'cleanPolygonsAlert',
      'cleanPolygons'
    ]),
    ...mapActions('catalogs', [
      'removeAddCatalog'
    ]),
    updateMousePosition (e) {
      this.mousePosition.latlng = e.latlng
    },
    onControlActivated (control) {
      let controlCLickedState = this.controls[control]
      for (let controlKey in this.controls) {
        this.controls[controlKey] = false
      }
      if (!controlCLickedState) {
        this.controls[control] = !this.controls[control]
      }
    },
    zoomIn () {
      this.$refs.map.mapObject.zoomIn()
    },
    zoomOut () {
      this.$refs.map.mapObject.zoomOut()
    },
    centerMap () {
      this.$refs.map.mapObject.flyToBounds(this.mapOptions.options.maxBounds)
    },
    toggleLayer (index) {
      this.toggleShowLayer(index)
    },
    changeOpacity ({value, index}) {
      this.layerOpacity({index, opacity: value})
    },
    toggleLayersAdmin () {
      this.layersAdmin = !this.layersAdmin
    },
    selectedDate (date) {
      this.date = moment(date)
      if (this.showLayers.length) {
        this.changeShowLayersDate(this.layerDate).then(() => {
          this.$forceUpdate()
        })
      }
    },
    addLayer (layer) {
      if (layer.composition === 'boyas') {
        this.getBuoys()
      }
      if (layer.composition === 'polygons') {
        this.getPolygons(this.$refs.map.mapObject)
      }
      if (layer.composition === 'polygons-alert') {
        this.getPolygonsAlert()
      }
      this.addShowLayer({layer, layerDate: this.layerDate}).then(() => {
        this.$forceUpdate()
      })
    },
    removeLayer (layer) {
      this.removeShowLayer(layer)
    },
    removeLayerFromControl (layer) {
      this.removeLayer(layer)
      this.removeAddCatalog(layer)
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    closeChartBuoy () {
      this.selectBuoy(null)
      this.getChartBuoyData(null)
    },
    showModalAbout () {
      this.onModalAbout = !this.onModalAbout
    },
    showModalInfo (id) {
      this.onModalInfo = !this.onModalInfo
      this.idModalInfo = id
    },
    onEachPolygonAlert (feature, layer) {
      let PopupPolygonAlert = Vue.extend(popupPolygonAlert)
      let popupAlert = new PopupPolygonAlert({
        propsData: {
          data: feature,
          year: this.date.year(),
          week: this.date.isoWeek()
        }
      })
      popupAlert.$watch(() => {
        return this.date
      }, (newVal, oldVal) => {
        popupAlert.$props.year = this.date.year()
        popupAlert.$props.week = this.date.isoWeek()
      })
      layer.bindPopup(popupAlert.$mount().$el)
      layer.on({
        popupopen: () => {
          layer.setStyle({
            color: '#fff',
            fillOpacity: 0.8
          })
        },
        popupclose: () => {
          layer.setStyle({
            color: '#999999',
            fillOpacity: 0.6
          })
        }
      })
      this.polygonsAlertsPopups.push(popupAlert)
    },
    onEachPolygon (feature, layer) {
      let PopupPolygon = Vue.extend(popupPolygon)
      let popup = new PopupPolygon({propsData: {data: {...feature}}})
      layer.bindPopup(popup.$mount().$el)
      this.polygonsPopups.push(popup)
    },
    onEachBuoy (feature, layer) {
      let PopupBuoy = Vue.extend(popupBuoy)
      let popup = new PopupBuoy({propsData: {data: {...feature}}})
      layer.bindPopup(popup.$mount().$el)
      this.buoyPopups.push(popup)
    },
    onRemoveBuoys () {
      for (let popup of this.buoyPopups) {
        popup.$destroy()
      }
    },
    onRemovePolygons () {
      this.cleanPolygons()
      for (let popup of this.polygonsPopups) {
        popup.$destroy()
      }
    },
    onRemoveAlertPolygons () {
      this.showAlerts = false
      this.cleanPolygonsAlert()
      for (let popup of this.polygonsAlertsPopups) {
        popup.$destroy()
      }
    },
    onAddAlertPolygons () {
      this.showAlerts = true
      this.getAlertsData()
    },
    escucharHijo () {
      alert('asdsa')
    }
  },
  mounted () {
    this.$refs.map.mapObject.flyToBounds(this.mapOptions.options.maxBounds)
    this.$refs.map.mapObject.setMinZoom(this.$refs.map.mapObject.getBoundsZoom(this.mapOptions.options.maxBounds, true))
    L.control.scale({position: 'bottomright'}).addTo(this.$refs.map.mapObject)
    window.addEventListener('resize', lodash.debounce(() => {
      this.$refs.map.mapObject.setMinZoom(0)
      this.$refs.map.mapObject.flyToBounds(this.mapOptions.options.maxBounds)
      this.$refs.map.mapObject.setMinZoom(this.$refs.map.mapObject.getBoundsZoom(this.mapOptions.options.maxBounds, true))
    }, 300))
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .geoportal-main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .down-icon{
      margin-left: 5px;
    }
    .geoportal-map-container {
      flex: 1;
      position: relative;
      .controls-container {
        position: absolute;
        z-index: 1000;
        right: 60px;
        bottom: 60px;
        padding: 10px 0;
        max-height: 100%;
      }
      .map-info-container {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        .map-cursor-position-container {
          margin-bottom: 10px;
          position: absolute;
          top: -40px;
          right: 10px;
          display: inline-block;
          z-index: 1000;
        }
        .map-info-date-container{
          margin-left: 10px;
          margin-bottom: 10px;
          position: absolute;
          top: -40px;
          display: inline-block;
          z-index: 1000;
          .map-info-date{
            @include font-primary();
            line-height: 30px;
            color: #ffffff;
            height: 30px;
            border-radius: 2px;
            background: $color-ui-primary;
            border: 1px solid #000000;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
            padding: 0 5px;
            * {
              margin: 0 5px;
            }
            i {
              font-size: 15px;
            }
          }
          button.btn-timelapse {
            @include font-primary();
            color: $color-font-primary;
            position: absolute;
            right: -90px;
            top: 0;
            border: 1px solid #000000;
            background-color: $color-ui-primary;
            padding: 0 10px;
            height: 30px;
            i {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
  .btn-menu{
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    border-radius: 2px;
    border: 1px solid #000000;
    background: $color-ui-primary;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
    width: 30px;
    height: 30px;
    padding: 0;
    i{
      font-size: 20px;
    }
  }
</style>
