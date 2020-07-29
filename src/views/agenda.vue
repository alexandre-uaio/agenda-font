<template>
  <div class="container-fluid">
    <h2 class="dlgtit">AGENDAMENTO PARA A CELEBRAÇÃO DA SANTA MISSA</h2>
    <Mform></Mform>
  </div>
</template>

<script>
import Mform from "../components/mform.vue"
export default {

  components:{
    Mform,
  }

};
</script>

<style lang="css" scoped>

.dlgtit{
  margin-top: 30px;
}
</style>>
