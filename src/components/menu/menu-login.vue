/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 02/05/2018.
*
* menu-login Vue Component
*/
<template>
  <div>
    <Login @onSubmit="actionLogin"/>
    <a
      @click="goToResetPassword"
      class="pass-forgot">No recuerdo mi contraseña</a>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import authService from '@/services/auth.service'
import Login from '@/modules/login/login-form.vue'
export default {
  name: 'MenuLogin',
  components: {Login},
  methods: {
    goToResetPassword () {
      this.$emit('resetPassword')
    },
    actionLogin (model) {
      return authService.authenticate(model.username, model.password, model.rememberMe)
        .then(response => {
          this.$store.dispatch('app/profile').then((response) => {
            let profile = this.$store.getters['app/profile']
            this.$message.success(`Bienvenido ${profile.name} ${profile.lastName}`)
            this.goToLogin()
          }).catch(error => {
            this.$notify.error('Ocurrió un error al obtener el perfil.')
            return Promise.reject(error)
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            this.$notify.error('Usuario ó contraseña incorrectos.')
          } else {
            this.$notify.error('Ocurrió un error al iniciar sesión')
          }
          return Promise.reject(error)
        })
    },
    goToLogin () {
      this.$emit('backMenu')
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>

  a {
    @include font-primary(10px, regular);
    color: #CCCCCC;
    text-decoration: underline !important;
    margin-left: 20px;
    &:hover {
      cursor: pointer;
    }
  }
</style>
