<template>
  <div
    class="color-ramp-item"
    :style="{backgroundColor: rgbColor}">
    <span>{{ colorValue }} {{ unit }}</span>
  </div>
</template>

<script>
export default {
  name: 'ColorRampItem',
  props: {
    color: {
      type: String,
      default: '0,0,0'
    },
    colorValue: {
      type: String,
      default: '0'
    },
    unit: {
      type: String,
      default: ''
    }
  },
  computed: {
    rgbColor () {
      return `rgb(${this.color})`
    }
  }
}
</script>

<style lang="scss" scoped>
  .color-ramp-item{
    flex: 1;
    position: relative;
    text-align: center;
    span{
      @include font-primary(10px);
      white-space: nowrap;
      display: none;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 100%;
      color: #ffffff;
      margin-bottom: 5px;
      background: $color-ui-primary-dark;
    }
    &:hover{
      span{
        display: inline-block;
      }
    }
  }
</style>
