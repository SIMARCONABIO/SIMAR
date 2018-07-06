/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 17/01/2018.
*
* timelapse-control Vue Component
*/
<template>
  <transition name="slide">
    <div class="timelapse-control">
      <button
        class="btn btn-transparent btn-close"
        @click="close">
        <i class="icon-x"/>
      </button>
      <div
        class="timelapse-player"
        :class="{collapsed: playerCollapsed}">
        <div class="timelapse-player-body">
          <date-control
            @selected="selectedDate"
            :date="date"/>
        </div>
      </div>
      <div class="timelapse-date-info-container d-flex align-items-baseline">
        <div
          class="layer-container"
          v-for="(layer, index) in layers"
          :key="index">
          <div class="layer-name">{{ layer.spanishTitle }}</div>
          <div
            class="layer-time-info d-flex justify-content-between"
            v-if="layer.type === 'product'">
            <span>{{ layer.productStartDate|layerDate(layer.productEndDate) }}</span> <span v-if="layer.week">Semana {{ layer.week }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import DateControl from './date-control'
import moment from 'moment'
export default {
  components: {DateControl},
  props: {
    date: {
      type: Date,
      required: false,
      default: null
    },
    layers: {
      type: Array,
      default () { return [] }
    }
  },
  filters: {
    layerDate (startDate, endDate) {
      if (!startDate) {
        return 'Sin información'
      }
      if (startDate === endDate) {
        return moment(startDate).format('DD/MMM/YYYY')
      } else {
        return 'Del ' + moment(startDate).format('DD/MMM/YYYY') + ' al ' + moment(endDate).format('DD/MMM/YYYY')
      }
    }
  },
  data () {
    return {
      playerCollapsed: false
    }
  },
  methods: {
    selectedDate (date) {
      this.$emit('selected', date)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .timelapse-control {
    transition: all .3s ease-in-out;
    z-index: 1000;
    height: 330px;
    opacity: 1;
    display: flex;
    position: relative;
    border-top: 1px solid #000000;
    background-color: transparent;
    overflow: hidden;
    .btn-close{
      position: absolute;
      right: 30px;
      top: 5px;
      font-size: 20px;
    }
    &.slide-enter {
      opacity: 0;
      height: 0px;
    }
    &.slide-leave {
      opacity: 1;
      height: 280px;
    }
    &.slide-leave-active {
      opacity: 0;
      height: 0px;
    }
    .timelapse-player {
      background-color: $color-ui-primary-dark;
      height: 100%;
      width: 300px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #000000;
      .timelapse-player-header {
        background-color: $color-ui-primary-dark;
        border-bottom: 1px solid #000000;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        h3 {
          @include font-primary();
          color: $color-font-primary;
          margin-bottom: 0;
          text-align: left;
          position: relative;
          padding-left: 30px;
          i {
            position: absolute;
            left: 0;
            top: -2px;
            font-size: 17px;
          }

        }
        .btn-collapse-control {
          padding: 0;
          height: 15px;
          width: 15px;
          line-height: 0;
          font-size: 15px;
          border: none;
        }
      }
      .timelapse-player-body {
        flex: 1;
      }
    }
    .timelapse-date-info-container{
      flex: 1;
      flex-wrap: wrap;
      overflow: auto;
      height: 100%;
      padding: 20px;
      background: $color-ui-primary-dark-alpha;
    }
  }

  .btn-play {
    width: 60px;
  }

  .fps-control-group {
    display: inline-block;
    margin-bottom: 0;
    input[type=text].fps-control {
      font-size: 12px;
      width: 55px;
      display: inline-block;
    }
  }

  .timelapse-player-controls {
    margin-bottom: 10px;
  }

  .btn-player-share {
    width: 95px;
  }

  .btn-player-save {
    width: 85px;
  }

  .layer-container{
    width: 310px;
    min-height: 100px;
    background: $color-ui-primary-dark;
    border-radius: 1px;
    border: 1px solid #000000;
    padding: 10px;
    margin: 10px;
    position: relative;
    .layer-name{
      font-size: 14px;
      color: #fff;
    }
    .layer-time-info{
      color: $color-font-primary;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 10px 10px;
      width: 100%;
    }
  }

</style>
