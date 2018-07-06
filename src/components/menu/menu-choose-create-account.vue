/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 02/05/2018.
*
* menu-choose-create-account Vue Component
*/
<template>
  <div class="menu-choose-create-account">
    <button class="btn btn-primary btn-facebook"><h1>Crear con <span>Facebook</span></h1></button>
    <button
      class="btn btn-primary"
      @click="goToCreateAccountMail"><span>Crear con correo electrónico</span></button>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
export default {
  name: 'MenuChooseCreateAccount',
  methods: {
    goToCreateAccountMail () {
      this.$emit('createAccountMail')
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>
  .menu-choose-create-account{
    padding: 44px 40px;
    button{
      width: 255px;
    }
  }

  .btn-facebook{
    background: #4267B2;
    margin-bottom: 10px;
    h1{
      @include font-primary(12px, regular);
      margin-bottom: 0;
      color: white;
    }
    span{
      @include font-primary(12px, bold);
      color: white;
    }
    &:active{
      background: #3a5092 !important;
    }
  }
</style>
