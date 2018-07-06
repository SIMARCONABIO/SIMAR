/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 10/04/2018.
*
* geoportal-view Vue Component
*/
<template>
  <geoportal/>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import Geoportal from '@/components/geoportal'
import {mapGetters} from 'vuex'
import store from '@/store'

export default {
  name: 'GeoportalView',
  components: {Geoportal},
  provide () {
    return {
      'geoportal-view/layersTree': this.layersTree,
      'geoportal-view/catalogs': this.catalogs,
      'geoportal-view/showLayers': this.showLayers,
      'geoportal-view/buoys': this.buoys
    }
  },
  computed: {
    ...mapGetters('categories', ['layersTree']),
    ...mapGetters('catalogs', {catalogs: 'items'}),
    ...mapGetters('products', {showLayers: 'showLayers', buoys: 'buoys'})
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('categories/layersTree').then(() => {
      store.dispatch('catalogs/query', {limit: 10000, sort: 'order'}).then(next)
    })
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>

</style>
