/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 17/01/2018.
*
* share-control Vue Component
*/
<template>
  <base-control
    title="Compartir"
    icon-class="icon-share">
    <div class="share-container">
      <p>
        Con el siguiente enlace compartirás la vista y configuración actual del mapa. Actualiza el enlace si cambias la configuración.
      </p>
      <div class="input-group">
        <input
          ref="urlText"
          v-model="url"
          type="text"
          class="form-control">
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-primary"
            @click="updateUrl"><i class="icon-loop"/></button>
        </div>
      </div>
      <button
        @click="getUrlText"
        class="btn btn-primary btn-copy">Copiar enlace</button>
      <social-sharing
        :url="url"
        title="SIMAR"
        description="SIMAR"
        quote="Marciano IT"
        hashtags="imar,sea,waves, water"
        twitter-user="simar"
        inline-template>
        <div class="share-footer d-flex justify-content-between">
          <network network="facebook">
            <button
              class="btn btn-facebook btn-social-network"><i class="icon-facebook"/></button>
          </network>
          <network network="twitter">
            <button
              class="btn btn-twitter btn-social-network"><i class="icon-twitter"/></button>
          </network>
          <network network="googleplus">
            <button
              class="btn btn-google-plus btn-social-network"><i class="icon-google-plus"/></button>
          </network>
        </div>
      </social-sharing>
    </div>
  </base-control>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import baseControl from './base-control.vue'

export default {
  components: {
    baseControl
  },
  data () {
    return {
      url: window.location.href
    }
  },
  methods: {
    getUrlText () {
      this.$refs.urlText.select()
      document.execCommand('copy')
    },
    updateUrl () {
      this.url = window.location.href
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .btn-copy {
    width: 100%;
    margin-bottom: 10px;
  }

  .input-group {
    margin-bottom: 10px;
  }

  .share-container {
    background-color: $color-ui-primary-alpha;
    p {
      font-size: 10px;
      margin-bottom: 10px;
    }
    padding: 20px;
  }

  .share-footer {
    border-top: 1px solid #000000;
    margin: 0 -10px;
    padding: 10px 10px 0;
    .btn{
      padding: 0;
      font-size: 18px;
      height: 30px;
      border-radius: 2px;
      width: 80px;
    }
  }

  .btn-social-network {
    padding: 0;
    font-size: 18px;
    height: 30px;
    border-radius: 2px;
    width: 80px;
  }

  .btn-facebook {
    background-color: #1446BB;
    color: #ffffff;
  }

  .btn-twitter {
    background-color: #00C2FF;
    color: #ffffff;
  }

  .btn-google-plus {
    line-height: 0px;
    font-size: 25px;
    background-color: #FF7700;
    color: #ffffff;
  }

</style>
