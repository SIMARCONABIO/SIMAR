<template>
  <div
    class="container-fluid chart fill">
    <div
      class="title-header d-flex row align-items-center justify-content-between">
      <span>GRÁFICO HISTÓRICO</span>
      <button
        class="btn btn-transparent btn-close"
        @click="$emit('close')"
        type="text"><i class="icon-x"/></button>
    </div>
    <div class="row fill">
      <div class="col-md-4 columna1">
        <div class="row">
          <div class="col-md-12 buoy">
            <v-map
              v-bind="mapOptions"
              ref="mapChartBuoy">
              <v-tilelayer :url="'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"/>
            </v-map>
          </div>
        </div>
        <el-form
          :model="model"
          :rules="rules"
          ref="chartBuoyForm"
          @submit.native.prevent="onSubmit">
          <!--<span class="title">FRECUENCIA</span>
          <div class="row">
            <div class="col-md-12">
              <el-radio-group
                @change="getFrequency()"
                v-model="radio">
                <el-radio :label="1"><span class="title-radio">Días</span></el-radio>
                <el-radio :label="2"><span class="title-radio">Meses</span></el-radio>
                <el-radio :label="3"><span class="title-radio">Años</span></el-radio>
              </el-radio-group>
            </div>
          </div>-->
          <span class="title">LAPSO</span>
          <div class="row">
            <div class="col-md-6">
              <el-form-item prop="productStartDate">
                <div
                  class="inner-date-picker">
                  <i class="icon-calendar"/>
                  <span class="text-span">Del</span>
                </div>
                <datepicker
                  :minimum-view="getFrequency"
                  class="date-picker-buoy"
                  wrapper-class="my-calendar-wrapper"
                  calendar-class="my-calendar"
                  :inline="false"
                  :prev-html="prevHtml"
                  :next-html="nextHtml"
                  v-model="model.productStartDate"
                  :placeholder="getPlaceholderStart"
                  language="es"/>
              </el-form-item>
            </div>
            <div class="col-md-6">
              <el-form-item prop="productEndDate">
                <div
                  class="inner-date-picker">
                  <i class="icon-calendar"/>
                  <span class="text-span">Al</span>
                </div>
                <datepicker
                  :minimum-view="getFrequency"
                  :placeholder="getPlaceholderEnd"
                  class="date-picker-buoy"
                  wrapper-class="my-calendar-wrapper"
                  calendar-class="my-calendar"
                  :inline="false"
                  v-model="model.productEndDate"
                  :prev-html="prevHtml"
                  :next-html="nextHtml"
                  language="es"/>
              </el-form-item>
            </div>
          </div>
          <div class="col-md-12 separator"/>
          <span class="title">PRIMER CAPA</span>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <el-form-item prop="firstComposition">
                  <select
                    name=""
                    class="form-control"
                    v-model="model.firstComposition">
                    <option value="">Selecciona</option>
                    <option
                      :value="layer.composition"
                      :key="index"
                      v-if="layer.type === 'product' && layer.show"
                      v-for="(layer, index) in showLayers">{{ layer.spanishTitle }}</option>
                  </select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="col-md-12">
              <el-form-item prop="enableSecondComposition">
                <el-checkbox v-model="model.enableSecondComposition">Habilitar segunda capa</el-checkbox>
              </el-form-item>
            </div>
          </div>
          <span
            class="title"
            v-if="model.enableSecondComposition">SEGUNDA CAPA</span>
          <div
            class="row"
            v-if="model.enableSecondComposition">
            <div class="col-md-12">
              <div class="form-group">
                <el-form-item prop="secondComposition">
                  <select
                    name=""
                    class="form-control"
                    v-model="model.secondComposition">
                    <option value="">Selecciona</option>
                    <option
                      :value="layer.composition"
                      :key="index"
                      v-if="layer.type === 'product' && layer.show"
                      v-for="(layer, index) in showLayers">{{ layer.spanishTitle }}</option>
                  </select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- <div
            class="row"
            v-if="model.enableSecondComposition">
            <div
              class="col-md-12">
              <el-form-item prop="fuseCharts">
                <el-checkbox v-model="model.fuseCharts">Fusionar gráficos</el-checkbox>
              </el-form-item>
            </div>
          </div>-->
          <button
            class="btn btn-primary btn-chart"
            :disabled="loadingChartData">Generar gráfico</button>
          <button
            type="button"
            class="btn btn-primary btn-block"
            :disabled="loadingChartData"
            @click="downloadCsv">Descargar CSV</button>
        </el-form>
      </div>
      <div class="col-md-8 columna2 no-gutters">
        <div class="chart-inner-container">
          <div
            class="message"
            v-if="!chartBuoyData && !loadingChartData">
            <span class="title-message">No has generado ningún gráfico.</span><br>
            <span class="content-message">Establece los parámetros y después presionael botón para generar el gráfico.</span>
          </div>
          <div
            class="message"
            v-if="loadingChartData">
            <span class="title-message">Obteniendo datos de la serie de tiempo.</span><br>
            <div class="chart-loader"/>
          </div>
          <div class="chart-container">
            <chart-line
              :height="600"
              :chart-data="chartBuoyData"
              :options="chartOptions"
              v-if="chartBuoyData && !loadingChartData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import datepicker from 'vuejs-tecnoloco-datepicker'
import {mapGetters, mapActions} from 'vuex'
import { Map, TileLayer } from 'vue2-leaflet'
import ChartBuoy from './chart-buoy.model'
import ChartLine from '@/components/chart/chart-line'
import moment from 'moment'
import Qs from 'qs'

let buoyIcon = L.icon({
  iconUrl: 'static/images/boya.svg',
  iconSize: [25, 25],
  popupAnchor: [0, -20]
})

export default {
  name: 'ChartBuoy',
  components: {
    ChartLine,
    datepicker,
    'v-map': Map,
    'v-tilelayer': TileLayer
  },
  props: {
    date: {
      type: Date,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters('products', ['showLayers', 'buoyChart', 'chartBuoyData']),
    getFrequency () {
      if (this.radio === 1) {
        return 'day'
      }
      if (this.radio === 2) {
        return 'month'
      }
      if (this.radio === 3) {
        return 'year'
      }
    },
    getPlaceholderStart () {
      if (this.radio === 1) {
        return 'Fecha Inicial'
      }
      if (this.radio === 2) {
        return 'Mes Inicial'
      }
      if (this.radio === 3) {
        return 'Año inicial'
      }
    },
    getPlaceholderEnd () {
      if (this.radio === 1) {
        return 'Fecha Final'
      }
      if (this.radio === 2) {
        return 'Mes Final'
      }
      if (this.radio === 3) {
        return 'Año Final'
      }
    },
    completeFirstComposition () {
      let _layer = this.showLayers.find((layer) => {
        return layer.composition === this.model.firstComposition
      })
      return _layer
    },
    completeSecondComposition () {
      let _layer = this.showLayers.find((layer) => {
        return layer.composition === this.model.secondComposition
      })
      return _layer
    },
    chartOptions () {
      if (this.model.enableSecondComposition) {
        return {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              id: 'x-axis-1',
              type: 'time',
              distribution: 'series',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Tiempo'
              },
              time: {
                displayFormats: {
                  day: 'DD/MM/YYYY',
                  minUnit: 'day'
                }
              }
            }, {
              id: 'x-axis-2',
              type: 'time',
              distribution: 'series',
              position: 'bottom',
              display: false
            }],
            yAxes: [{
              type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: 'left',
              id: 'y-axis-1',
              scaleLabel: {
                display: true,
                labelString: this.completeFirstComposition ? this.completeFirstComposition.spanishTitle : ''
              }
            }, {
              type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: 'right',
              id: 'y-axis-2',
              scaleLabel: {
                display: true,
                labelString: this.completeSecondComposition ? this.completeSecondComposition.spanishTitle : ''
              }
            }]
          },
          tooltips: {
            callbacks: {
              title (tooltipItemArray, data) {
                let tooltipItem = tooltipItemArray[0]
                return data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index]
              },
              label (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || ''
                if (label) {
                  label += ': '
                }
                label += tooltipItem.yLabel.toFixed(2)
                return label
              }
            }
          }
        }
      } else {
        return {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || ''
                if (label) {
                  label += ': '
                }
                label += tooltipItem.yLabel.toFixed(2)
                return label
              }
            }
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Tiempo'
              },
              time: {
                displayFormats: {
                  day: 'DD/MM/YYYY',
                  minUnit: 'day'
                }
              }
            }],
            yAxes: [{
              type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: 'left',
              id: 'y-axis-1',
              scaleLabel: {
                display: true,
                labelString: this.completeFirstComposition ? this.completeFirstComposition.spanishTitle : ''
              }
            }]
          }
        }
      }
    }
  },
  data () {
    return {
      model: ChartBuoy.model(),
      rules: ChartBuoy.rules,
      mapOptions: {
        zoom: 4,
        maxZoom: 20,
        center: [22.561961, -101.396472],
        options: {
          attributionControl: false,
          zoomControl: false
        }
      },
      radio: 1,
      loadingChartData: false,
      chartVisible: true,
      prevHtml: `<i class="icon-chevron-left"></i>`,
      nextHtml: `<i class="icon-chevron-right"></i>`
    }
  },
  methods: {
    close () {
      this.chartVisible = false
    },
    ...mapActions('products', ['getChartBuoyData']),
    onSubmit () {
      this.$refs.chartBuoyForm.validate((valid) => {
        if (valid) {
          this.loadingChartData = true
          this.getChartBuoyData({...this.model, buoyId: this.buoyChart.properties.id}).then(response => {
            this.loadingChartData = false
          })
        } else {

        }
      })
    },
    jsonToQueryString (json) {
      return '?' +
      Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key])
      }).join('&')
    },
    downloadCsv () {
      let params = {
        'filters[whereIn][composition]': [this.model.firstComposition],
        'filters[where][buoyId][eq]': this.buoyChart.properties.id,
        'filters[where][productStartDate][gte]': moment.utc(moment(this.model.productStartDate).format('YYYY-MM-DD')).toISOString(),
        'filters[where][productEndDate][lte]': moment.utc(moment(this.model.productEndDate).format('YYYY-MM-DD')).toISOString()
      }
      if (this.model.enableSecondComposition) {
        params['filters[whereIn][composition]'].push(this.model.secondComposition)
      }
      let urlString = process.env.API_BASE_URL + 'buoys/download-time-plot?' + Qs.stringify(params, {arrayFormat: 'brackets'})
      window.location.href = urlString
    }
  },
  mounted () {
    this.$refs.mapChartBuoy.mapObject.flyTo({ lat: this.buoyChart.geometry.coordinates[1], lon: this.buoyChart.geometry.coordinates[0] }, 7)
    L.marker({
      lat: this.buoyChart.geometry.coordinates[1],
      lon: this.buoyChart.geometry.coordinates[0]},
    {
      icon: buoyIcon
    }).on('mouseover', function (ev) {
      console.log('hi')
    }).addTo(this.$refs.mapChartBuoy.mapObject)
  }
}
</script>

<style lang="scss" scoped>
  .chart {
    height: 100%;
    position: absolute;
    z-index: 1002;
    padding-bottom: 0px;
    .close-button {
      text-align: right;
      .btn-close {
        cursor: pointer;
      }
    }
    .inner-date-picker{
      position: absolute;
      margin-top: 6px;
      margin-left: 10px;
      z-index: 2;
      .icon-calendar{
        font-size: 15px;
        color: #444444;
        position: relative;
        top: 2px;
        margin-top: 10px;
        margin-right: 8px;
      }
    }
    .title-header{
      @include font-primary(10px, bold);
      height: 30px;
      background: #090909;
      padding: 0 15px;
      span{
        line-height: 28px;
      }
      i{
        outline: none;
        float: right;
        font-size: 20px;
        color: #AAAAAA;
      }
    }
    .title{
      @include font-primary(10px, bold);
      line-height: 30px;
      height: 30px;
    }
    .columna1 {
      height: 100%;
      background: #111111;
      .buoy{
        padding: 0;
        background: #363434;
        height: 315px;
      }
      .el-radio-group{
        margin-top: 12px;
        .title-radio{
          margin-left: -5px;
          @include font-primary(12px, normal)
        }
      }
      .separator{
        margin-top: 15px;
        margin-bottom: 5px;
        border-top: solid 2px #000;
      }
      .btn-chart{
        margin-top: 47px;
        margin-bottom: 20px;
        width: 100%;
      }
    }
    .chart-inner-container{
      max-height: 100%;
      width: 100%;
      overflow: auto;
    }
    .columna2 {
      padding: 0;
      height: 100%;
      background: $color-ui-primary-dark-alpha;
      position: relative;
      .message{
        width: 400px;
        height: 75px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        .title-message{
          @include font-primary(18px, normal);
          color: #AAAAAA;
        }
        .content-message{
          @include font-primary(12px, normal);
          color: #AAAAAA;
        }
      }

    }
    .chart-container{
      height: 80%;
    }
  }

  .chart-loader{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #AAAAAA;
    border-color: #AAAAAA transparent #AAAAAA transparent;
    animation: .5s infinite ease-in-out spin-loader;
  }

  @keyframes spin-loader {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }

</style>
