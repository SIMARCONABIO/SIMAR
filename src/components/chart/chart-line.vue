/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 08/05/2018.
*
* chart-line Vue Component
*/
////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import {Line, mixins} from 'vue-chartjs'
export default {
  name: 'ChartLine',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>

</style>
