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
    <div class="container">
        <h1>Bugtracker Login</h1>
        <div class="testingContainer">
            <p>Do you want to test this app?</p>
            <p>Username: test, Password: test</p>
        </div>
        <div>
            <form @submit.prevent="login">
                <div class="inputContainer">
                    <label for="username">Username</label>
                    <input v-model="username" type="text" id="username" />
                </div>
                <div class="inputContainer">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" id="password" />
                </div>
                <div class="buttonContainer">
                    <button type="submit">Login</button>
                </div>
                <p class="errorText">{{ error }}</p>
            </form>
            <div class="registerContainer">
                Need an account? <router-link to="/register">Register here</router-link>
            </div>
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

.testingContainer {
    margin: 0;
}

.testingContainer p {
    font-size: 0.8rem;
    color: #149e52;
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