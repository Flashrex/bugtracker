<script setup lang="ts">
import SideBar from '../SideBar.vue';
import router from '@/router';
import type { Issue } from '@/types';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const issue = ref<Issue | null>(null);
const route = useRoute();

const loading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/issues/${route.params.id}`);
        issue.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error(error);
    }
});

function formatDateString(dateString: string) {
    const [date, time] = dateString.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':').map((str, index) => index < 2 ? str : str.slice(0, 2));

    return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
}

function deleteIssue() {
    if (issue.value) {
        axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/issues/${issue.value.id}`)
            .then(() => {
                router.push('/issues');
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

function updateIssue(status: string) {
    if (issue.value) {
        axios.put(`${import.meta.env.VITE_APP_API_ENDPOINT}/issues/${issue.value.id}`, {
            status
        })
            .then(() => {
                issue.value!.status = 'closed';
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
</script>

<template>
    <SideBar></SideBar>
    <div class="issue">
        <h1>Issue</h1>

        <div v-if="loading">
            <p>Loading...</p>
        </div>

        <div class="issueContainer" v-else-if="issue">
            <h2>{{ issue.title }}</h2>
            <div class="tagContainer">
                <span class="tag">Status: {{ issue.status }}</span>
                <span v-if="issue.assigned_to" class="tag">Assigned to: {{ issue.assigned_to.username }}</span>
            </div>
            <p>{{ issue.description }}</p>


            <div class="buttonContainer">
                <button v-if="issue.status !== 'closed'" class="close" @click="updateIssue('closed')">Close</button>
                <button v-else class="close" @click="updateIssue('open')">Open</button>
                <button class="delete" @click="deleteIssue">Delete</button>
            </div>

            <div class="footer">
                <p>Created at {{ formatDateString(issue.created_at) }} by {{ issue.created_by.username }}</p>
                <p>Last updated at {{ formatDateString(issue.updated_at) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.issue {
    padding: 1rem 2rem;
    max-width: 80vw;
}

.issueContainer {
    width: 40vw;
    border: 1px solid #3d3d3d21;
    padding: 0.5rem;
    margin-top: 1rem;
}

.issueContainer h2 {
    font-size: 1.4rem;
    margin-bottom: 0rem;
}

.issueContainer p {
    margin-bottom: 0.5rem;
}

.tagContainer {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.tag {
    font-size: 0.8rem;
    margin: 0;
    padding: 0.1rem 1rem;
    background-color: #149e52;
    color: white;
    border-radius: 15px;
}

.buttonContainer {
    display: flex;
    margin-top: 1rem;
    gap: 1rem;
}

button {
    padding: 0.5rem 1rem;

    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.delete {
    background-color: #a31f1f;
}

.close {
    background-color: #a35d1f;
}

.footer {
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
    gap: 4rem;
}

.footer>p {
    font-size: 0.8rem;
}
</style>