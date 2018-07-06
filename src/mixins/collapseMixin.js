export default {
  data () {
    return {
      collapse: true,
      collapseDelay: 300
    }
  },
  methods: {
    onCollapse () {
      this.collapse = !this.collapse
    },
    beforeEnter (el) {
      el.style.height = '0px'
    },
    enter (el, done) {
      el.style.height = el.scrollHeight + 'px'
      setTimeout(done, this.collapseDelay)
    },
    afterEnter (el) {
      el.style.height = 'auto'
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el, done) {
      el.style.height = el.scrollHeight + 'px'
      el.style.height = '0px'
      setTimeout(done, this.collapseDelay)
    },
    afterLeave (el) {
      el.style.height = '0px'
    }
  }
}
