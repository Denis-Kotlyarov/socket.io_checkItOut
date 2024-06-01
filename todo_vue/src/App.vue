<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png">
    <auth v-if="!authRes" @auth="receiveData"></auth>
    <section v-else>
      <todos-list></todos-list>
      <chat></chat>
    </section>
  </main>
</template>

<script>
import TodosList from './components/TodosList.vue';
import Chat from './components/ChatComponent.vue';
import Auth from './components/AuthComponent.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    TodosList,
    Chat,
    Auth
  },
  setup() {
    const authRes = ref(false);

    const receiveData = (data) => {
      authRes.value = data;
    };

    return {
      authRes,
      receiveData
    };
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
