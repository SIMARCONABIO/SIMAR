<template>
  <div class="menu-reset-password">
    <div
      class="first-div"
      v-show="!seen">
      <h1>Te enviaremos un enlace a tu dirección de correo para que puedas reestablecer tu contraseña</h1>
      <h2>EL CORREO DEBE SER EL MISMO CON EL QUE CREASTE LA CUENTA</h2>
      <div class="form-group">
        <label
          for=""
          class="form-label">CORREO ELECTRÓNICO</label>
        <input
          type="email"
          class="form-control">
      </div>
      <button
        class="btn btn-primary"
        @click="seen=!seen">ENVIAR</button>
      <a href="">Ir al inicio de sesión</a>
    </div>
    <div
      class="second-div"
      v-show="seen">
      <h1>El correo ha sido enviado con exito</h1>
      <h2>VISITA EL LINK PARA REESTABLECER TU CONTRASEÑA</h2>
      <button class="btn btn-primary">Aceptar</button>
      <a href="">Ir al inicio de sesión</a>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuResetPassword',

  data: function () {
    return {
      seen: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-reset-password {
    color: #CCCCCC;
    padding: 20px;
    h1{
      @include font-primary(14px, light);
      margin-bottom: 12px;
    }
    h2{
      @include font-primary(10px, Bold);
      margin-bottom: 12px;
    }
  }

  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .form-label{
    @include font-primary(10px, Bold)
  }

  a {
    @include font-primary(10px, regular);
    color: #CCCCCC;
    text-decoration: underline !important;
    &:hover {
      cursor: pointer;
    }
  }

</style>
