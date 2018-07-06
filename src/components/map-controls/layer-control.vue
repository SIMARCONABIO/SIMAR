/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 19/01/2018.
*
* colorimetry-control Vue Component
*/
<template>
  <div class="layer-control-wrapper">
    <div
      class="layer-control-container">
      <div
        class="layer-control-header">
        <img
          src="~@/assets/logo-simar.svg"
          alt="">
        <a class="logo-link"/>
        <button
          class="btn btn-transparent"
          @click="onCollapse"
        >
          <i class="icon-layers"/>
          <i
            class="icon-chevron-down"
            v-if="!collapse"/>
          <i
            class="icon-chevron-up"
            v-else/>
        </button>
      </div>
      <transition
        name="control-collapse"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        :css="false">
        <div
          class="layer-control-body"
          v-if="collapse">
          <div
            class="btn-container d-flex justify-content-between align-items-center">
            <span
              class="layer-title">CAPAS ACTIVADAS</span>
            <button
              class="btn btn-add-layer"
              @click="onShowLayersAdmin">
              <i class="icon-plus"/>
              Agregar capas |<span class=""> Add layers</span>
            </button>
          </div>
          <div class="show-layers-container">
            <draggable
              :options="{handle: '.drag-handle'}"
              v-model="layers">
              <layer-control
                v-for="(layer, index) in layers"
                :key="layer.id+'.'+index"
                v-bind="layer"
                @collapseLayer="toggleCollapse(index)"
                @toggleLayer="toggleLayer(index)"
                @changeOpacity="value=>changeOpacity(value, index)"
                @remove="removeLayer(layer)"
                @showInfo="showModalInfo"
                @closeModalInfo="closeModalInfo"
              />
            </draggable>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import collapseMixin from '@/mixins/collapseMixin'
import draggable from 'vuedraggable'
import layerControl from '@/components/layer-control/layer-control.vue'

export default {
  components: {
    draggable,
    layerControl
  },
  mixins: [collapseMixin],
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    layers: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    showModalInfo (id) {
      this.$emit('showInfo', id)
    },
    closeModalInfo () {
      this.$emit('closeModalInfo')
    },
    toggleLayer (index) {
      this.$emit('toggleLayer', index)
    },
    toggleCollapse (index) {
      this.$emit('toggleCollapse', index)
    },
    changeOpacity (value, index) {
      this.$emit('changeOpacity', {value, index})
    },
    onShowLayersAdmin () {
      this.$emit('showLayersAdmin')
    },
    removeLayer (layer) {
      this.$emit('removeLayer', layer)
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .layer-control-wrapper {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1000;
  }

  .layer-control-container {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
    width: 400px;
    .layer-control-header {
      height: 40px;
      display: flex;
      padding: 0 10px;
      align-items: center;
      justify-content: space-between;
      background: $color-ui-primary-dark;
      border-bottom: 1px solid #000000;
      border-top: 1px solid #000000;
      img {
        height: 25px;
      }
      button {
        padding: 0;
        font-size: 17px;
      }
      span {
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-indent: 0;
        &:hover {
          animation: move-text 5s linear .5s infinite;
        }
      }
    }
    .layer-control-body{
      overflow: hidden;
      transition: all 300ms ease-in-out;
      border: 1px solid #000000;
      .show-layers-container{
        max-height: 70vh;
        overflow: auto;
      }
      .btn-container{
        background-color: $color-ui-primary-dark-alpha;
        border-bottom: 1px solid #000000;
        padding: 10px;
        .btn-add-layer{
          @include font-primary(12px);
          height: 30px;
          border-radius: 2px;
          background: transparent;
          color: $color-font-primary;
          background:#23A1C8;
          color: #FFF;
          padding-right: 10px;
          position: relative;
          span{
            font-style: italic;
          }
        }
      }
      .layer-title{
        @include font-primary(10px, normal);
      }
    }
  }
</style>
