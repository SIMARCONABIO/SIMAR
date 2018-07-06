/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 17/01/2018.
*
* options-control Vue Component
*/
<template>
  <base-control
    title="Opciones"
    icon-class="icon-settings">
    <div class="options-control-container">
      <div>
        <div class="form-group">
          <label
            class="form-label">SISTEMA DE COORDENADAS</label>
          <select
            v-model="selected"
            class="form-control"
            @change="onChange">
            <option value="">Selecciona</option>
            <option value="metric">GD (grados decimales)</option>
            <option value="dms">GMS (grados, minutos, segundos)</option>
          </select>
        </div>
        <div class="form-group">
          <label
            class="form-label">MAPA BASE</label>
          <select
            v-model="baseMap"
            class="form-control"
            @change="onChangeBaseMap">
            <option value="">Selecciona</option>
            <option value="World_Imagery">Satelital</option>
            <option value="World_Topo_Map">Topográfico</option>
            <option value="World_Street_Map">Calles</option>
            <option value="Ocean_Basemap">Oceanos</option>
            <option value="NatGeo_World_Map">National Geographic (NatGeo)</option>
            <option value="World_Shaded_Relief">Relieve sombreado</option>
            <option value="Canvas/World_Light_Gray_Base">Gris</option>
            <option value="Canvas/World_Dark_Gray_Base">Gris Obscuro</option>
          </select>
        </div>
        <div class="form-check">
          <input
            v-model="showLabels"
            class="form-check-input"
            type="checkbox"
            @change="onChangeShowLabels"
            id="gridCheck1">
          <label
            class="form-check-label"
            for="gridCheck1">
            MOSTRAR ETIQUETAS
          </label>
        </div>
      </div>
      <!--<div class="options-footer">
        <button class="btn btn-primary">Reestablecer preferencias</button>
      </div>-->
    </div>
  </base-control>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import {mapActions} from 'vuex'
import baseControl from './base-control.vue'
import store from '@/store'

export default {
  data: function () {
    return {
      selected: 'metric',
      baseMap: 'World_Imagery',
      showLabels: false
    }
  },
  components: {
    baseControl
  },
  props: {},
  methods: {
    ...mapActions('app', ['gpsFormat']),
    onChange () {
      store.dispatch('app/gpsFormat', this.selected)
    },
    onChangeBaseMap () {
      store.dispatch('app/baseMap', this.baseMap)
    },
    onChangeShowLabels () {
      store.dispatch('app/showLabels', this.showLabels)
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .options-control-container {
    padding: 10px 20px 20px;
    background-color: $color-ui-primary-alpha;
  }

  select.form-control {
    height: 30px;
  }

  .btn-primary {
    width: 100%;
  }

  .options-footer {
    border-top: 1px solid #000000;
    margin: 0 -10px;
    padding: 10px 10px 0;
  }

  .form-check {
    margin-bottom: 10px;
  }
</style>
