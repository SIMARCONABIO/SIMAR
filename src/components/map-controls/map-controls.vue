/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 19/01/2018.
*
* map-controls Vue Component
*/
<template>
  <div
    class="map-controls-wrapper">
    <div class="map-controls">
      <button
        class="btn btn-transparent btn-control"
        :class="{active: controls.share}"
        @click="onActivate('share')">
        <i class="icon-share"/>
      </button>
      <button
        class="btn btn-transparent btn-control"
        :class="{active: controls.options}"
        @click="onActivate('options')">
        <i class="icon-settings"/>
      </button>
      <!--<button-->
      <!--class="btn btn-transparent btn-control"-->
      <!--:class="{active: controls.date}"-->
      <!--@click="onActivate('date')">-->
      <!--<i class="icon-calendar"/>-->
      <!--</button>-->
    </div>
    <div class="map-controls zoom-controls">
      <button
        class="btn btn-transparent btn-control"
        @click="zoomIn">
        <i class="icon-plus"/>
      </button>
      <div class="control-divider"/>
      <button
        class="btn btn-transparent btn-control"
        @click="zoomOut">
        <i class="icon-minus"/>
      </button>
    </div>
    <div class="map-controls centering-control">
      <button
        class="btn btn-transparent btn-control"
        @click="centerMap">
        <i class="icon-crosshair"/>
      </button>
    </div>
  </div>

</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
export default {
  props: {
    controls: {
      type: Object,
      required: true
    }
  },
  methods: {
    onActivate (control) {
      this.$emit('activateControl', control)
    },
    zoomOut () {
      this.$emit('zoomOut')
    },
    zoomIn () {
      this.$emit('zoomIn')
    },
    centerMap () {
      this.$emit('centerMap')
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .map-controls-wrapper{
    position: absolute;
    right: 10px;
    top: -240px;
    z-index: 1000;
  }
  .map-controls {
    width: 30px;
    border-radius: 2px;
    background: $color-ui-primary;
    border: 1px solid #000000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
    text-align: center;
    padding: 5px 0;
    margin-bottom: 5px;
    line-height: 0;
    .control-divider{
      display: inline-block;
      height: 1px;
      background: #000000;
      width: 20px;
    }
    .btn-control {
      font-size: 17px;
      padding: 0;
      width: 100%;
      height: 30px;
    }
    &.zoom-controls{
      padding: 0;
    }
    &.centering-control{
      padding: 0;
      margin-bottom: 0;
    }
  }
</style>
