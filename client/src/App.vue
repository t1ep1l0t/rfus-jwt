<template>
  <div class="head">
    <router-link to="/">content</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/register">register</router-link>
  </div>
  <div class="page">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.dispatch('check_access_token')
    }
  }
</script>

<style>

.head {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>


