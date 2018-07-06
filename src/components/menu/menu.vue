/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 27/03/2018.
*
* menu Vue Component
*/
<template>
  <div
    class="menu-container"
    v-show="show">
    <div
      class="menu">
      <header class="d-flex justify-content-between align-items-center">
        <h3>{{ menuTitle }}</h3>
        <button
          class="btn btn-transparent"
          @click="closeMenu"><i class="icon-x"/></button>
      </header>

      <main>
        <menu-initial
          v-if="menuView === 'initial'"
          @login="changeView('login')"
          @createAccount="changeView('create-choose')"
          @showModal="testMethod"/>
        <menu-login
          v-if="menuView === 'login'"
          @resetPassword="changeView('reset-password')"
          @backMenu="changeView('initial')"/>
        <menu-reset-password
          v-if="menuView === 'reset-password'"
        />
        <menu-choose-create-account
          v-if="menuView === 'create-choose'"
          @createAccountMail="changeView('create')"
        />
        <menu-create-account
          v-if="menuView === 'create'"
        />
      </main>
    </div>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import MenuInitial from './menu-initial'
import MenuLogin from './menu-login'
import MenuChooseCreateAccount from './menu-choose-create-account'
import MenuCreateAccount from './menu-create-account'
import MenuResetPassword from './menu-reset-password'
import ModalAbout from './menu-about'

export default {
  name: 'Menu',
  components: {
    MenuCreateAccount,
    MenuInitial,
    MenuLogin,
    MenuChooseCreateAccount,
    MenuResetPassword,
    ModalAbout
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menuView: 'initial' // initial, login, create, create-choose
    }
  },
  computed: {
    menuTitle () {
      switch (this.menuView) {
        case 'initial':
          return 'MENÚ'
        case 'create':
          return 'CREAR CUENTA'
        case 'create-choose':
          return 'CREAR CUENTA'
        case 'login':
          return 'INICIAR SESIÓN'
        case 'reset-password':
          return 'REESTABLECER CONTRASEÑA'
        default:
          return 'MENÚ'
      }
    }
  },
  methods: {
    closeMenu () {
      this.menuView = 'initial'
      this.$emit('close')
    },
    changeView (view) {
      this.menuView = view
    },
    testMethod () {
      this.$emit('showModal')
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .menu-container{
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1010;
    border-radius: 2px;
    border: 1px solid #000000;
    background: $color-ui-primary;
    width: 340px;
    height: 100%;
  }
  .menu{
    height: 100%;
    header{
      height: 30px;
      padding-left: 15px;
      border-bottom: 1px solid #000000;
      background: $color-ui-primary-dark;
      h3{
        @include font-primary(10px, bold);
        margin: 0;
      }
      .btn{
        padding: 0;
        width: 30px;
        height: 30px;
        font-size: 20px;
      }
    }
    main{
      height: calc(100% - 30px);
    }
  }

</style>
