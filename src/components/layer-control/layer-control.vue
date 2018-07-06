/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 08/02/2018.
*
* layer-control Vue Component
*/
<template>
  <div class="layer-container">
    <div class="layer-header">
      <button class="btn btn-transparent drag-handle"><i class="icon-drag-lines"/></button>
      <div>
        <div class="layer-title">{{ spanishTitle }}</div>
        <div
          class="layer-time-info d-flex justify-content-between"
          v-if="type === 'product'">
          <span>{{ productStartDate|layerDate(productEndDate) }}</span> <span v-if="week">Semana {{ week }}</span>
        </div>
      </div>
      <button
        class="btn btn-transparent"
        @click="onCollapse"
        :disabled="type !== 'product'"
      >
        <i
          class="icon-chevron-down"
          v-if="!collapse"/>
        <i
          class="icon-chevron-up"
          v-else/>
      </button>
      <button
        class="btn btn-transparent"
        @click="showModalInfo(id)">
        <i class="icon-info"/>
      </button>
      <button
        class="btn btn-transparent"
        @click="onRemove">
        <i class="icon-x"/>
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
      :css="false"
      v-if="hasData && type === 'product'">
      <div
        class="layer-body"
        v-show="collapse">
        <div class="layer-inner-body">
          <color-ramp
            :color-ramp="colorRamp"
            :unit="colorRampUnit"
            v-if="colorRamp"/>
          <div class="layer-color-indicator d-flex align-items-end">
            <opacity-range-picker
              :opacity="opacity"
              @changeOpacity="value=>$emit('changeOpacity', value)"/>
            <el-switch
              v-model="innerShow"/>
          </div>
        </div>
      </div>
    </transition>
    <p
      class="no-data-message"
      v-else-if="!hasData && type === 'product'">
      Sin información disponible.
    </p>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import opacityRangePicker from './opacity-range-picker.vue'
import collapseMixin from '@/mixins/collapseMixin'
import ColorRamp from '@/components/layer-control/color-ramp/color-ramp'
import moment from 'moment'

export default {
  name: 'LayerControl',
  components: {ColorRamp, opacityRangePicker},
  mixins: [collapseMixin],
  props: {
    id: {
      type: Number,
      default: 0
    },
    spanishTitle: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0
    },
    colorRamp: {
      type: Object,
      default () {
        return {}
      }
    },
    hasData: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    productStartDate: {
      type: String,
      default: ''
    },
    productEndDate: {
      type: String,
      default: ''
    },
    week: {
      type: [Number, String],
      default: ''
    },
    colorRampUnit: {
      type: String,
      default: ''
    }
  },
  filters: {
    layerDate (startDate, endDate) {
      if (!startDate) {
        return ''
      }
      if (startDate === endDate) {
        return moment(startDate).format('DD/MMM/YY')
      } else {
        return 'Del ' + moment(startDate).format('DD/MMM/YY') + ' al ' + moment(endDate).format('DD/MMM/YY')
      }
    }
  },
  computed: {
    innerShow: {
      get () {
        return this.show
      },
      set (value) {
        this.toggleLayer()
      }
    }
  },
  methods: {
    toggleLayer () {
      this.$emit('toggleLayer')
    },
    onRemove () {
      this.$emit('remove')
    },
    showModalInfo (id) {
      this.$emit('showInfo', id)
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .color-example {
    height: 30px;
    width: 30px;
    border-radius: 2px;
    border: 1px solid #000000;
  }

  .color-example-container {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
  .no-data-message{
    text-align: center;
    margin-bottom: 0px;
    padding: 25px 0;
  }
  .layer-container {
    background-color: $color-ui-primary-dark-alpha;
    .layer-header {
      display: flex;
      padding: 5px 10px;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #000000;

      button {
        padding: 0;
        font-size: 17px;
      }
      .layer-title {
        width: 270px;
        i{
          cursor: pointer;
          font-size: 16px;
          margin-right: 5px;
        }
      }
      .layer-time-info{
        font-size: 10px;
      }
    }
    .layer-body {
      transition: all 300ms ease-in-out;
      overflow: hidden;
      .layer-inner-body{
        padding: 10px;
      }
    }
    .layer-actions {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
    &:first-child {
      .layer-header {
        border-top: none;
      }
    }
    &:last-child {
      .layer-header {
        border-bottom: none;
      }
    }
  }

</style>
