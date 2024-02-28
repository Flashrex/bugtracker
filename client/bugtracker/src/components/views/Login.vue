<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const error = ref('');


const login = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/login`, {
            username: username.value,
            password: password.value
        }, {
            withCredentials: true
        }).then((response) => {
            //localStorage.setItem('token', response.data.token);
            router.push('/');
        }).catch((error) => {
            error.value = 'Invalid username or password';
        });

    } catch (er) {
        console.error(er);
    }
};
</script>

<template>
    <div>
        <h1>Login</h1>
    </div>

    <div>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username" />
            </div>
            <div>
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            <p>{{ error }}</p>
        </form>
        <div>
            <router-link to="/register">Register</router-link>
        </div>
    </div>
</template>

<style scoped></style>