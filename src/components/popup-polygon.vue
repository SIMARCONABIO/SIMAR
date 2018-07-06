<template>
  <div>
    <div>
      <div class="buoy-label">
        NOMBRE
      </div>
      <div class=buoy-data>
        {{ data.properties.name }}
      </div>
      <div class="buoy-label">
        REGIÓN
      </div>
      <div class="buoy-data">
        {{ data.properties.region }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupPolygon',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .buoy-label{
    @include font-primary(10px, bold);
    color: #999999;
  }
  .buoy-data{
    @include font-primary(12px);
    color: #ffffff;
    margin-bottom: 10px;
  }
  .location-container{
    @include font-primary(12px);
    padding: 20px 0;
    color: #ffffff;
    i{
      margin-right: 5px;
    }
  }
</style>
