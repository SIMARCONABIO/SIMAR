<template>
  <div>
    <div>
      <div class="buoy-label">
        CÓDIGO
      </div>
      <div class="buoy-data">
        {{ data.properties.code }}
      </div>
      <div class="buoy-label">
        ESTACIÓN
      </div>
      <div class="buoy-data">
        {{ data.properties.name }}
      </div>
    </div>
    <div class="location-container">
      <i class="icon-crosshair"/>{{ position }}
    </div>
    <button
      class="btn btn-primary btn-block"
      @click="generateChart">Análisis de serie de tiempo</button>
  </div>
</template>

<script>
import formatcoords from 'formatcoords'
import store from '@/store'

export default {
  name: 'PopupContent',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    position () {
      let gps = {lat: this.data.geometry.coordinates[1], lng: this.data.geometry.coordinates[0]}
      let positionString = ''
      let formatPosition = store.getters['app/sendFormat']
      if (formatPosition === 'metric') {
        positionString += 'Lat: ' + this.data.geometry.coordinates[1].toFixed(6) + '° ' + ' Lon: ' + this.data.geometry.coordinates[0].toFixed(6) + '°'
      } else {
        positionString += 'Lat: ' + formatcoords(gps).format('FFf', {latLonSeparator: ' Lon: ', decimalPlaces: 2})
      }
      return positionString
    }
  },
  methods: {
    generateChart () {
      store.dispatch('products/selectBuoy', this.data)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
  .buoy-label{
    @include font-primary(10px, bold);
    color: #999999;
  }
  .buoy-data{
    @include font-primary(12px);
    color: #ffffff;
    margin-bottom: 10px;
  }
  .location-container{
    @include font-primary(12px);
    padding: 20px 0;
    color: #ffffff;
    i{
      margin-right: 5px;
    }
  }
</style>
