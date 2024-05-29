<template>
    <main class="todos_list">
        <h1>Ваши задачи</h1>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <p><strong>Задача: </strong> {{ todo.title }}</p>
                <p><strong>Описание: </strong> {{ todo.body }}</p>
                <p><strong>Состояние: </strong> {{ todo.done }}</p>
            </li>
        </ul>
    </main>
</template>

<script setup>
    /* eslint-disable */
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import { io } from "socket.io-client";

    const todos = ref(null);

    const socket = io('http://localhost:3001');
    
    onMounted(() => {
        fetch('http://localhost:3000/todos/')
            .then((response) => response.json())
                .then((result) => {
                    todos.value = result.data;
                    console.log(todos.value);
                });
    });
</script>

<style>
    .todos_list {
        max-width: 1000px;
        margin: 0 auto;
    }
</style>