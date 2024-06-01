<template class="rel">
    <main class="container">
        <form class="auth-form" action="">
            <h2>Введите данные</h2>
            <input class="form__email" type="email" placeholder="email" v-model="email"/>
            <input class="form__password" type="password" placeholder="password" v-model="password"/>
            <button class="form__btn" @click.prevent="sendUser">Вперед</button>
        </form>
    </main>
</template>

<script setup>
    /* eslint-disable */
    import axios from 'axios';
    import { defineEmits } from 'vue';
    import { ref } from 'vue';

    const email = ref('');
    const password = ref('');
    const auth = ref(false);

    const emit = defineEmits(['auth']);

    async function sendUser() {
        if (email.value && password.value) {
            let user = await axios.post('http://localhost:3000/users/email', { email: email.value });
            
            if (user.data !== "") {
                console.log(user)
                let hashPassword = await axios.post('http://localhost:3000/users/password', { password: password.value });
                
                if (user.data.password == hashPassword.data) {
                    auth.value = true;
                    localStorage.setItem('user', email.value);
                    alert('Вход выполнен!');
                } else {
                    alert('Неверные данные!');
                }
            } else {
                axios.post('http://localhost:3000/users/', {
                        first_name: 'Затычка', 
                        last_name: 'Затычка', 
                        email: email.value,
                        password: password.value,
                }).then(response => {
                    localStorage.setItem('user', email.value);
                    auth.value = true;
                    alert('Успешная регистрация! Повторите вход')
                }).catch(error => {
                    console.error('Error:', error);
                });
            }

            emit('auth', auth.value);
        } else {
            alert("Введите все данные!")
        }   

        return;
    }
</script>

<style scoped>
    .container {
        margin: 0 auto;
        max-width: 1120px;
    }
    .auth-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px;
        row-gap: 10px;
    }
    .form__email, .form__password {
        min-width: 150px;
        font-size: 16px;
        border-radius: 10px;
        padding: 10px;
    }
    .form__btn {
        font-size: 16px;
        border-radius: 10px;
        padding: 10px 20px;
    }
</style>