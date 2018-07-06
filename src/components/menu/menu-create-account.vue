/**
* Created by MARCIANO_8
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 02/05/2018.
*
* menu-create-account Vue Component
*/
<template>
  <div>
    <Users/>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import Users from '@/modules/users/users-form'
export default {
  name: 'MenuCreateAccount',
  components: {Users}
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style lang="scss" scoped>

</style>
