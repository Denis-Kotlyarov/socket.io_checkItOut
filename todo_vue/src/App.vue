<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <todos-list></todos-list>
  <chat></chat>
</template>

<script>
import TodosList from './components/TodosList.vue';
import Chat from './components/ChatComponent.vue';

export default {
  name: 'App',
  components: {
    TodosList,
    Chat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
