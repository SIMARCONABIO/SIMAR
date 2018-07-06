<template>
  <div id="app">
    <transition
      name="fade">
      <div
        v-if="splash===true"
        class="splash-screen">
        <span>
          <img
            class="logo-simar-splash"
            src="@/assets/logo-simar.svg">
          <p class="s-text-1">Sistema de Información y Análisis de Ecosistemas Marinos de México</p>
          <p class="s-text-2">Information & Analysis System of Marine Ecosystem of Mexico</p>
          <p class="s-text-3">Monitoreo Marino - CONABIO</p>
          <button
            @click="goToGeoportal"
            class="btn-confirmation">OK</button>
          <p class="s-text-4">Versión en desarrollo</p>
        </span>
      </div>
    </transition>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      splash: true
    }
  },
  methods: {
    goToGeoportal () {
      this.splash = false
    }
  }
}
</script>

<style lang="scss">
  @import "../node_modules/leaflet/dist/leaflet.css";

  #app {
    .fade-enter-active, .fade-leave-active {
      .logo-simar-splash img {
        animation: scale-logo .8s;
      }
      transition: opacity .8s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
      .logo-simar-splash img {
        animation: scale-logo .8s;
      }
    }
    @keyframes scale-logo {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(2);
      }
    }
    height: 100%;
    .splash-screen {
      position: absolute;
      z-index: 1001;
      background: $color-ui-primary-dark-alpha;
      width: 100vw;
      height: 100vh;
      span {
        @include font-primary();
        width: 30%;
        height: 400px;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        .btn-confirmation{
          cursor: pointer;
          @include font-primary(16px, bold);
          color: #FFF;
          border: none;
          width: 30%;
          height: 40px;
          background: #0097C6;
        }
        .s-text-1{
          color: #FFF;
          font-weight: lighter;
          padding: 0px 20px;
          font-size: 17px;
        }
        .s-text-2{
          padding: 0px 50px;
          font-size: 15px;
          font-style: italic;
        }
        .s-text-3{
          padding: 0px 20px;
          color: #FFF;
          font-weight: bold;
          font-size: 10px;
          margin-bottom: 50px;
        }
        .s-text-4{
          margin-top: 30px;
          font-style: italic;
          font-size: 11px;
        }
      }
      img {
        margin-top: 25px;
        margin-bottom: 50px;
        width: 65%;
      }
    }
  }
</style>
