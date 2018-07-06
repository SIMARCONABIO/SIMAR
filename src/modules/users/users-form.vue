<template>
  <div class="menu-create-account">
    <el-form
      ref="userForm"
      :rules="rules"
      :model="model"
      @submit.native.prevent="onSubmit">
      <el-form-item
        prop="name"
        class="form-group">
        <label
          for=""
          class="form-label">NOMBRE</label>
        <el-input
          type="text"
          v-model="model.name"/>
      </el-form-item>
      <el-form-item
        prop="lastName"
        class="form-group">
        <label
          for=""
          class="form-label">APELLIDO</label>
        <el-input
          type="text"
          v-model="model.lastName"/>
      </el-form-item>

      <el-form-item
        prop="email"
        class="form-group">
        <label
          for=""
          class="form-label">CORREO ELECTRÓNICO</label>
        <el-input
          type="text"
          class="ms-placeholder"
          placeholder="correo@mailhost.com"
          v-model="model.email"/>
      </el-form-item>

      <el-form-item
        prop="password"
        class="form-group">
        <label
          for=""
          class="form-label">CONTRASEÑA</label>
        <el-input
          type="password"
          placeholder="Seis caracteres como mínimo"
          v-model="model.password"/>
      </el-form-item>

      <el-form-item prop="rememberMe">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkRememberMe"
            v-model="rememberMe">
          <label
            class="form-check-label"
            for="checkRememberMe">
            Acepto el <a
              href="http://www.biodiversidad.gob.mx/conabio/aviso_privacidad.html"
              target="_blank">aviso de privacidad</a>
          </label>
        </div>
      </el-form-item>

      <button
        class="btn btn-primary"
        type="submit"><span>Crear cuenta</span></button>
    </el-form>
  </div>
</template>

<script>
import User from './users.model'
import {mapActions} from 'vuex'
export default {
  name: 'UsersForm',
  // Variables
  data () {
    return {
      model: User.model(),
      rules: User.rules(),
      rememberMe: false
    }
  },
  methods: {
    ...mapActions('users', ['register', 'query']),
    onSubmit () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          return this.register({...this.model, password_confirmation: this.model.password}).then(response => {
            this.$notify.success('El usuario se ha guardado con éxito')
          }).catch(error => {
            this.$notify({
              title: 'Error al crear usuario',
              message: 'Por favor, vuelve a intentarlo'
            })
            return Promise.reject(error)
          })
        } else {
          this.$notify.error({
            title: 'Verifica la forma',
            message: 'Por favor revisa los errores que se indican dentro de la forma'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-create-account{
    padding-top: 14px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .btn-primary {
    width: 100%;
    margin-bottom: 10px;
    span{
      @include font-primary(12px, regular);
    }
  }
  .form-control {
    background: #000000 !important;
    margin-bottom: 5px;
  }

  .form-check{
    padding: 0;
  }

  a{
    text-decoration: underline;
    color: #CCCCCC;
  }

</style>
