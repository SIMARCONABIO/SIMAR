/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 18/01/2018.
*
* map-info Vue Component
*/
<template>
  <div class="map-info">
    <i class="icon-crosshair"/>
    <span class="position-text">{{ position }}</span>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import formatcoords from 'formatcoords'
import {mapGetters} from 'vuex'

export default {
  name: 'MapCursorPosition',
  props: {
    mousePosition: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters('app', {formatPosition: 'sendFormat'}),
    position () {
      let positionString = ''
      if (this.formatPosition === 'metric') {
        positionString += 'Lat: ' + this.mousePosition.latlng.lat.toFixed(6) + '° ' + ', Lon: ' + this.mousePosition.latlng.lng.toFixed(6) + '° '
      } else {
        positionString += 'Lat: ' + formatcoords(this.mousePosition.latlng).format('FFf', {latLonSeparator: ', Lon: ', decimalPlaces: 2})
      }
      return positionString
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .map-info {
    @include font-primary();
    display: flex;
    align-items: center;
    color: #ffffff;
    height: 30px;
    border-radius: 2px;
    background: $color-ui-primary;
    border: 1px solid #000000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
    padding: 0 5px;
    min-width: 310px;
    * {
      margin: 0 5px;
    }
    i {
      font-size: 15px;
    }
    .position-text {
      min-width: 180px;
    }
  }
</style>
