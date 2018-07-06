/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 07/02/2018.
*
* color-range-picker Vue Component
*/
<template>
  <div class="color-range-picker">
    <span class="slider-label">Opacidad</span>
    <div class="d-flex align-items-center">
      <div class="slider-container">
        <vue-slider
          :value.sync="opacityValue"
          @callback="onChange"
          ref="slider"
          v-bind="options"/>
      </div>
      <span class="slider-value">{{ (opacityValue * 100) + '%' }}</span>
    </div>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import vueSlider from 'vue-slider-component'

export default {
  name: 'OpacityRangePicker',
  components: {vueSlider},
  props: {
    opacity: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      options: {
        min: 0,
        max: 1,
        height: 2,
        dotSize: 10,
        interval: 0.1,
        tooltip: false
      }
    }
  },
  computed: {
    opacityValue: {
      set () {
        return this.opacity
      },
      get () {
        return this.opacity
      }
    }
  },
  methods: {
    onChange (value) {
      this.$emit('changeOpacity', value)
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .color-range-picker{
    flex: 1;
    padding-right: 20px;
  }
  .slider-label {
    @include font-primary(10px);
    color: $color-font-primary;
    margin-bottom: 5px;
    display: inline-block;
  }

  .slider-container {
    margin: 0 -5px;
    flex: 1;
  }
  .slider-value{
    @include font-primary(10px);
    color: $color-font-primary  ;
    display: inline-block;
    width: 35px;
    text-align: right;
  }
</style>
