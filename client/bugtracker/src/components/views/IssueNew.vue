<script setup lang="ts">
import { ref } from 'vue';
import SideBar from '../SideBar.vue';
import axios from 'axios';
import router from '@/router';

const title = ref('');
const description = ref('');
const status = ref('open');

async function createIssue() {

    await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/issues`, {
        title: title.value,
        description: description.value,
        status: status.value
    });

    title.value = '';
    description.value = '';
    status.value = 'open';
    router.push('/issues');
}
</script>

<template>
    <SideBar :selected="'issues'"></SideBar>
    <div class="content">
        <h1>New Issue</h1>

        <div class="formContainer">
            
            <form @submit.prevent="createIssue">
                <h2>Open new Issue</h2>
                <div>
                    <input type="text" id="title" name="title" placeholder="Title" v-model="title">
                </div>
                <div>
                    <input type="text" id="description" name="description" placeholder="Description" v-model="description">
                </div>
                <div>
                    <select id="status" name="status" v-model="status">
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Create Issue</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<style scoped>
.content {
    width: 80vw;
    padding: 1rem 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.formContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -4rem;
}

form {
    width: 25vw;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    border: 1px solid rgba(255, 255, 255, 0.093);
    padding: 1rem;
    border-radius: 5px;
    background-color: rgba(91, 91, 91, 0.05);

}

input {
    width: 100%;
}

input, select {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #12121247;
    background-color: rgba(0, 0, 0, 0.025);
    color: rgba(255, 255, 255, 0.773);
}

option {
    color: rgba(0, 0, 0, 0.63);
}

input:focus, textarea:focus, select:focus {
    outline: none;
    border: 1px solid #121212;
}

button {
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background-color: #45a049;
}


</style>