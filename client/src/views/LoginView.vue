<template>
  <form class="form">
    <h1>login</h1>
    <input type="text" class="input" v-model="username">
    <input type="text" class="input" v-model="password">
    <button class="button" @click.prevent="login">login</button>
  </form>
</template>

<script>
export default {
  name: "LoginView",
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.username, password: this.password})
      });
      const result = await response.json();

      this.$store.commit('set_user', {
        user: result.user,
        access_token: result.access_token
      })

    }
  }
}
</script>

<style scoped>

</style>