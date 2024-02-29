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
    <div class="container">
        <h1>Bugtracker Register</h1>
        <div>
            <form @submit.prevent="register">
                <div class="inputContainer">
                    <label for="username">Username</label>
                    <input v-model="username" type="text" id="username" />
                </div>
                <div class="inputContainer">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" id="password" />
                </div>
                <div class="inputContainer">
                    <label for="password">Password Repeat</label>
                    <input v-model="password_repeat" type="password" id="password" />
                </div>
                <p class="errorText">{{ error }}</p>
                <div class="buttonContainer">
                    <button type="submit">Register</button>
                </div>
                <div class="registerContainer">
                    You already got an account? <router-link to="/login">Login here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 100vh;
    width: 100vw;
}

h1 {
    font-weight: bold;
}

.inputContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

input {
    margin-top: 0.2rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
}

input:focus {
    border-color: #149e52;
}

.errorText {
    color: rgb(169, 28, 28);
    text-align: center;
    margin-bottom: 1rem;
}

.buttonContainer {
    display: flex;
    justify-content: center;
}

button {
    padding: 0.5rem 2rem;
    border-radius: 5px;
    border: none;
    background-color: #149e52;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0e6e3e;
}

.registerContainer {
    margin-top: 1rem;
}

a {
    color: #149e52;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>