/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 22/01/2018.
*
* base-control Vue Component
*/
<template>
  <div class="control-container">
    <div class="control-header">
      <slot name="header">
        <h3><i :class="iconClass"/>{{ title }}</h3>
        <button
          class="btn btn-transparent btn-collapse-control"
          @click="onCollapse">
          <i
            class="icon-plus-square"
            v-if="!collapse"/>
          <i
            class="icon-minus-square"
            v-else/>
        </button>
      </slot>
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
        class="control-body"
        v-if="collapse"
        ref="controlBody">
        <slot/>
      </div>
    </transition>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import collapseMixin from '@/mixins/collapseMixin'
export default {
  name: 'BaseControl',
  mixins: [collapseMixin],
  props: {
    title: {
      type: String,
      required: false,
      default: 'Título'
    },
    iconClass: {
      type: String,
      required: false,
      default: 'icon-default'
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>

</style>
