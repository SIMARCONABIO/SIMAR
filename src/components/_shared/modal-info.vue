<template>

  <div
    v-if="showModalInfo"
    class="modal-about">

    <div
      class="close-section">
      <img
        src="../../../src/assets/logo-simar.svg"
        alt="logo-simar">
      <i
        class="icon-x btn-close"
        @click="closeModalInfo"/>
    </div>

    <div class="description-content">
      <div class="section-modal">
        <img
          class="title-image"
          :src="apiUrl+showCatalogs[0].thumbImage"
          alt=""
        >
        <h2>{{ showCatalogs[0].spanishTitle }}</h2>
      </div>
      <div
        class="section-modal"
        v-html="showCatalogs[0].description"
      />
    </div>

  </div>
</template>

<script>
export default {
  name: 'ModalInfo',
  data () {
    return {
      descriptionId: 1,
      apiUrl: process.env.API_ASSETS_URL
    }
  },
  inject: {
    layersTree: 'geoportal-view/layersTree',
    catalogs: 'geoportal-view/catalogs'
  },
  props: {
    showModalInfo: {
      type: Boolean,
      default: false
    },
    idModalInfo: {
      type: Number,
      default: 0
    }
  },
  methods: {
    closeModalInfo () {
      this.$emit('closeModalInfo')
    }
  },
  computed: {
    showCatalogs () {
      return this.catalogs.filter(catalog => {
        return catalog.id === this.idModalInfo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-about {
    width: 860px;
    height: 608px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1001;
    background: $color-ui-primary-dark-alpha;
    border: 1px solid $color-ui-primary-dark;
    overflow-x: hidden;
    .section-modal{
      width:100%
    }
    .close-section{
      position: fixed;
      width: 860px;
      height: 40px;
      background: $color-ui-primary-dark;
      z-index: 1;
      img{
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 25px;
        width: 20%;
      }
      i{
        cursor: pointer;
      }
      .btn-close{
        font-size: 20px;
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }
    .description-content{
      height: 100%;
      overflow-y: scroll;
      padding: 50px 30px 30px 30px;
      .title-image{
        padding: 20px;
        margin: 0 auto;
        display: block;
        width: 80%;
      }
    }
}
</style>
