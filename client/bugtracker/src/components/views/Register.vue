<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const password_repeat = ref('');
const router = useRouter();
const error = ref('');


const register = async () => {
    if (username.value === '' || password.value === '') {
        error.value = 'Username and password are required';
        return;
    }

    if (password.value !== password_repeat.value) {
        error.value = 'Passwords do not match';
        return;
    }

    try {
        await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/register`, {
            username: username.value,
            password: password.value,
        }).then((response) => {
            router.push('/');
        }).catch((error) => {
            error.value = 'Error while registering user';
        });

    } catch (er) {
        console.error(er);
    }
};
</script>

<template>
    <div>
        <h1>Register</h1>
    </div>

    <div>
        <form @submit.prevent="register">
            <div>
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username" />
            </div>
            <div>
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" />
            </div>
            <div>
                <label for="password">Password Repeat</label>
                <input v-model="password_repeat" type="password" id="password" />
            </div>
            <p>{{ error }}</p>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>