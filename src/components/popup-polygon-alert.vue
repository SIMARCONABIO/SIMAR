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
      <div
        class="buoy-label"
        v-if="alert">
        Fecha
      </div>
      <div
        class="buoy-data"
        v-if="alert">
        {{ alert.period }}, Semana: {{ alert.week }}
      </div>
      <div class="buoy-label" >
        NIVEL DE ALERTA
      </div>
      <div class="buoy-data" >
        <img
          class="alert-image"
          :src="`static/images/alerts/${alert.level}.png`"
          alt=""
          v-if="alert"
        >
        <span v-else>Sin información</span>
        <a
          :href="`http://simar.conabio.gob.mx:4001/pdf/${data.properties.gid}/${alert.rpt}`"
          target="_blank"
          style="color: #fff"
          v-if="alert">Descargar reporte</a>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import moment from 'moment'

export default {
  name: 'PopupPolygonAlert',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    year: {
      type: Number,
      default: null
    },
    week: {
      type: Number,
      default: null
    }
  },
  computed: {
    alert () {
      let alertsData = store.getters['products/alertsData']
      if (alertsData && alertsData.length) {
        let alertFound = alertsData.find((a) => {
          return parseInt(a.gid_anp) === parseInt(this.data.properties.gid)
        })
        if (alertFound) {
          let startDate = moment().year(alertFound.year).isoWeek(alertFound.week).startOf('isoWeek').format('DD/MMM/YYYY')
          let endDate = moment().year(alertFound.year).isoWeek(alertFound.week).endOf('isoWeek').format('DD/MMM/YYYY')
          let rptDate = moment().year(alertFound.year).isoWeek(alertFound.week).startOf('isoWeek').format('DD/MM/YYYY')
          alertFound.period = `Del ${startDate} al ${endDate}`
          alertFound.rpt = rptDate
        }
        return alertFound || null
      } else {
        return null
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
  .alert-image{
    width: 100%;
  }
</style>
