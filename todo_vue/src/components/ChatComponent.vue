<template class="rel">
    <main class="chat" v-show="showChat" @click.stop="showChat = !showChat">
        <div class="chat_body" @click.stop>
            <h1>Поддержка</h1>
            <ul class="msg-list">
                <li v-for="message in messages" :key="message">
                    <p>{{ message }}</p>
                </li>
            </ul>
            <form action="">
                <input class="room-id" type="number" min="1" max="5" v-model="roomId" placeholder="Id"/>
                <input class="text-field" type="text" v-model="newMassage"/>
                <button class="btn" @click.prevent="sendMessage">Send</button>
            </form>
        </div>
    </main>

    <button class="show-btn" @click="showChat = !showChat">Chat</button>
</template>

<script setup>
    /* eslint-disable */
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import { io } from "socket.io-client";

    const messages = ref(null);
    const newMassage = ref(null);
    const showChat = ref(false);
    const roomId = ref(null);

    const socket = io('http://localhost:3001');
    socket.on('connected', (arg) => {
        console.log(arg);
        messages.value = arg.messages
    });
    socket.on('disconnect', (reason) => {
        alert("Соединение потеряно: " + reason);
    });
    socket.on('message', (arg) => {
        messages.value.push(arg);
    })

    function sendMessage() {
        if (newMassage.value) {
            socket.emit('message', {
                msg: newMassage.value,
                roomId: roomId.value,
            });
            newMassage.value = null;
        }
    };
</script>

<style>
    .rel {
        position: relative;
        overflow: auto;
    }
    .chat {
        width: 100vw;
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        margin: 0 auto;
        background-color: rgba(116, 116, 116, 0.253)
    } 
    .chat_body {
        position: relative;
        margin: 0 auto;
        top: 13%;
        max-width: 800px;
        background-color: white;
        padding: 20px;
    }
    .text-field {
        margin-top: 20px;
        width: 70%;
        font-size: 16px;
    }
    .room-id {
        margin-right: 20px;
        font-size: 16px; 
    }
    .btn {
        margin-left: 15px;
        border-radius: 7px;
        font-size: 16px;
        padding: 5px 9px;
    }
    .show-btn {
        position: fixed;
        padding: 25px;
        border-radius: 100%;
        right: 3%;
        bottom: 9%;
    }
    .msg-list {
        list-style: none;
    }
</style>