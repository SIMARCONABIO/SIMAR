/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 17/01/2018.
*
* date-control Vue Component
*/
<template>
  <datepicker
    wrapper-class="my-calendar-wrapper"
    calendar-class="my-calendar"
    :inline="true"
    @selected="selectDate"
    ref="datePicker"
    :prev-html="prevHtml"
    :next-html="nextHtml"
    :value="date || new Date()"
    language="es"/>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import datepicker from 'vuejs-tecnoloco-datepicker'
import moment from 'moment'

export default {
  name: 'DateControl',
  components: {
    datepicker
  },
  props: {
    date: {
      type: Date,
      required: false,
      default: null
    }
  },
  data () {
    return {
      disabled: {
        to: moment('2001-01-01').toDate(),
        from: moment().toDate()
      },
      prevHtml: `<i class="icon-chevron-left"></i>`,
      nextHtml: `<i class="icon-chevron-right"></i>`,
      testMonth: null,
      testDays: []
    }
  },
  methods: {
    selectDate (date) {
      this.$emit('selected', date)
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
</style>
