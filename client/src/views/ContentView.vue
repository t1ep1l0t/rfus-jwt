<template>
  <div class="page" v-if="access_token && access_token.length > 9">
    <h1>content</h1>
  </div>
  <div class="error" v-else>
    <h1>Пользователь не авторизован</h1>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ContentView",
  computed: {
    ...mapState({
      access_token: state => state.access_token
    })
  }
}
</script>

<style scoped>

</style>