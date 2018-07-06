/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 19/01/2018.
*
* colorimetry-control Vue Component
*/
<template>
  <base-control
    title="Colorimetría"
    icon-class="icon-layers">
    <div class="colorimetry-control-container">
      <draggable :options="{handle: '.drag-handle'}">
        <layer-control
          v-for="(name, index) in layers"
          :name="name"
          :key="index"/>
      </draggable>
    </div>
  </base-control>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import baseControl from './base-control.vue'
import draggable from 'vuedraggable'
import layerControl from '@/components/layer-control/layer-control.vue'

export default {
  components: {
    baseControl,
    draggable,
    layerControl
  },
  props: {},
  data () {
    return {
      layers: [
        'Temperatura nocturna',
        'Temperatura diurna',
        'Aqua/MODIS',
        'GHRSST MEASURES MUR/PO.DAAC'
      ]
    }
  },
  computed: {}
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .btn-show-layer {

  }

  .btn-primary {
    font-size: 15px;
  }

</style>
