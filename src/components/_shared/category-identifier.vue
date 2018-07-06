<template>
  <span
    class="category-identifier"
    :style="{background: color}">{{ text }}</span>
</template>

<script>
export default {
  name: 'CategoryIdentifier',
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.category-identifier{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  @include font-primary(9px);
  color: white;
  padding: 5px 0;
  margin-right: 5px;
}
</style>
