<template>
  <div class="menu-login">
    <el-form
      ref="loginForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="onSubmit">
      <el-form-item
        prop="username"
        class="form-group">
        <label
          for=""
          class="form-label">USUARIO O CORREO ELECTRÓNICO</label>
        <input
          type="text"
          class="form-control"
          v-model="model.username">
      </el-form-item>

      <el-form-item
        prop="password"
        class="form-group">
        <label
          for=""
          class="form-label">CONTRASEÑA</label>
        <input
          type="password"
          class="form-control"
          v-model="model.password">
      </el-form-item>

      <el-form-item prop="rememberMe">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkRememberMe"
            v-model="model.rememberMe">
          <label
            class="form-check-label"
            for="checkRememberMe">
            RECORDARME EN EL EQUIPO
          </label>
        </div>
      </el-form-item>

      <button
        class="btn btn-primary"
        type="submit"><span>Iniciar sesión</span></button>

    </el-form>
  </div>
</template>

<script>
import Login from './login.model'
export default {
  name: 'LoginForm',
  // variables
  data () {
    return {
      model: Login.model(),
      rules: Login.rules,
      invalidCredentials: false
    }
  },
  methods: {
    onSubmit (event) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.model)
        } else {
          this.$emit('onError')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .menu-login {
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

  .form-label {
    @include font-primary(10px, bold);
  }

  input[type=password].form-control {
    outline: none !important;
    box-shadow: none !important;
    border: 0;
  }

  .form-control {
    background: #000000 !important;
    margin-bottom: 5px;
  }

  .pass-forgot{
    @include font-primary(10px, regular);
    text-decoration: underline !important;
    &:hover{
      cursor: pointer;
    }
  }

  .form-check{
    padding: 0;
  }

</style>
