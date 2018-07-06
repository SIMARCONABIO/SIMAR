<template>
  <div/>
</template>
<script>
import eventsBinder from './utils/eventsBinder.js'

const events = [
  'loading',
  'tileunload',
  'tileloadstart',
  'tileerror',
  'tileload',
  'load',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
]
export default {
  props: {
    geojson: {
      type: Object,
      default () { return {} }
    },
    options: {
      type: Object,
      default () { return {} }
    }
  },
  mounted () {
    this.mapObject = L.geoJSON(this.geojson, this.options)
    eventsBinder(this, this.mapObject, events)

    if (this.$parent._isMounted) {
      this.deferredMountedTo(this.$parent.mapObject)
    }
  },
  watch: {
    geojson: {
      handler (newVal) {
        this.mapObject.clearLayers()
        this.addGeoJSONData(newVal)
      },
      deep: true
    }
  },
  methods: {
    deferredMountedTo (parent) {
      this.parent = parent
      this.mapObject.addTo(parent)
      for (var i = 0; i < this.$children.length; i++) {
        if (typeof this.$children[i].deferredMountedTo === 'function') {
          this.$children[i].deferredMountedTo(parent)
        }
      }
    },
    addGeoJSONData (geojsonData) {
      this.mapObject.addData(geojsonData)
    },
    getGeoJSONData () {
      return this.mapObject.toGeoJSON()
    },
    getBounds () {
      return this.mapObject.getBounds()
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return
      if (newVal) {
        this.mapObject.addTo(this.parent)
      } else {
        this.parent.removeLayer(this.mapObject)
      }
    }
  },
  beforeDestroy () {
    if (this.parent) {
      this.parent.removeLayer(this.mapObject)
    }
  }
}
</script>
