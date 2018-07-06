/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 07/02/2018.
*
* color-range-picker Vue Component
*/
<template>
  <div class="color-ramp-container d-flex">
    <color-ramp-item
      v-for="(color, index) in colorRamp.values"
      :key="index"
      :color="color[1]"
      :color-value="color[0]"
      :unit="unit"
    />
    <span class="initial-value">{{ initialValue }} {{ unit }}</span>
    <span class="final-value">{{ finalValue }} {{ unit }}</span>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import ColorRampItem from '@/components/layer-control/color-ramp/color-ramp-item'
export default {
  name: 'ColorRamp',
  components: {ColorRampItem},
  props: {
    colorRamp: {
      type: Object,
      default () {
        return {}
      }
    },
    unit: {
      type: String,
      default: ''
    }
  },
  computed: {
    finalValue () {
      return this.colorRamp.values[this.colorRamp.values.length - 1][0]
    },
    initialValue () {
      return this.colorRamp.values[0][0]
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .color-ramp-container{
    position: relative;
    height: 6px;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .final-value, .initial-value{
    @include font-primary(10px);
    white-space: nowrap;
    position: absolute;
    top: 100%;
    color: #ffffff;
  }
  .final-value{
    right: 0px;
  }
</style>
