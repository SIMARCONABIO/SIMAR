export default {
  model: function () {
    return {
      productStartDate: null,
      productEndDate: null,
      firstComposition: '',
      secondComposition: '',
      enableSecondComposition: false,
      fuseCharts: false
    }
  },
  rules: {
    productStartDate: {
      required: true,
      message: 'La fecha inicial es requerida'
    },
    productEndDate: {
      required: true,
      message: 'La fecha final es requerida'
    },
    firstComposition: {
      required: true,
      message: 'La primer capa es requerida'
    }
  }
}
