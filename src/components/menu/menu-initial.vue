<template>
  <div class="menu-initial">
    <ul class="logos-list">
      <li>
        <img
          class="simar-menu-logo"
          src="~@/assets/logo-simar.svg"
          alt="">
      </li>
      <li
        class="li"
        @click="showModalAbout">
        <div
          class="about-simar">
          <span>Sobre</span>
          <img
            src="/static/images/logo-simar-white.svg"
            alt="">
        </div>
      </li>
      <li class="divider"/>
      <li>
        <a
          href="http://www.biodiversidad.gob.mx/mares"
          target="_blank">
          <img
            src="/static/images/logo-monitoreo-white.svg"
            alt=""
            class="monitoreo-menu-logo">
        </a>
      </li>
      <li class="divider"/>
      <li>
        <a
          href="https://www.gob.mx/conabio"
          target="_blank">
          <img
            src="/static/images/logo-conabio-white.svg"
            alt=""
            class="conabio-menu-logo">
        </a>
      </li>
    </ul>
    <div
      class="menu-button-container"
      v-if="!profile">
      <button
        class="btn btn-transparent btn-login"
        @click="goToLogin">
        INCIAR SESIÓN
      </button>
      <button
        class="btn btn-create-account"
        @click="goToCreateAccount">
        CREAR CUENTA
      </button>
    </div>
    <div
      class="user-info-container"
      v-else>
      <h1>{{ `${profile.name} ${profile.lastName}` }}</h1>
      <!--<h2>Emmanuel Reséndiz</h2>
      <h3><i class="icon-map-pin"/> Querétaro, MX</h3>-->
      <button
        class="btn btn-transparent"
        @click="logout"><i class="icon-log-out"/>Cerrar sesión</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MenuInitial',
  data () {
    return {
      visible: false
    }
  },
  computed: {
    profile () {
      return this.$store.getters['app/profile']
    }
  },
  methods: {
    goToLogin () {
      this.$emit('login')
    },
    goToCreateAccount () {
      this.$emit('createAccount')
    },
    showModalAbout () {
      this.$emit('showModal')
    },
    logout () {
      this.$store.dispatch('app/logout')
    }
  }
}
</script>

<style scoped lang="scss">

  .li{
    &:hover{
      cursor: pointer;
    }
  }
  .menu-initial{
    height: 100%;
    position: relative;
  }
  .logos-list {
    list-style: none;
    padding: 0;
    li {
      text-align: center;
      padding: 30px 0;
      * {
        display: inline-block;
      }
      &.divider {
        padding: 0;
        height: 1px;
        background: #000000;
        margin: 0 50px;
      }
    }
    .simar-menu-logo {
      width: 250px;
    }
    .about-simar {
      width: 200px;
      span {
        font-size: 18px;
        display: inline-block;
        margin-right: 5px;
      }
      img {
        display: inline-block;
        margin-top: -7px;
        width: 60px;
      }
      &:hover{
        cursor: pointer;
      }
    }
    .monitoreo-menu-logo {
      width: 125px;
    }
    .conabio-menu-logo {
      width: 110px;
    }
  }

  .menu-button-container{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 50px;
    text-align: center;
  }

  .btn-login{
    height: 40px;
    width: 170px;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .btn-create-account {
    background: $color-font-active;
    color: #ffffff;
    height: 40px;
    width: 170px;
  }

  .user-info-container{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    img{
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
    }
    h1{
      @include font-primary(18px, light);
      color: #FFFFFF;
    }
    h2{
      @include font-primary(16px, regular);
      color: #999999;
    }
    h3{
      @include font-primary(12px, light);
      color: #FFFFFF;
      i{
        margin-right: 11.66px;
      }
    }
    button{
      width: 100%;
      height: 51px;
      color: #CCCCCC;
      border-top: 1px solid black;
      margin-top: 53px;
      i{
        margin-right: 12.42px;
      }
      &:hover{
        color: #FFF;
      }
    }
  }
</style>
