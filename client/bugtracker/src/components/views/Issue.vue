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
</script>

<template>
    <SideBar></SideBar>
    <div class="issue">
        <h1>Issue</h1>

        <div v-if="loading">
            <p>Loading...</p>
        </div>

        <div v-else-if="issue">
            <h2>{{ issue.title }}</h2>
            <p>{{ issue.description }}</p>
            <p>Status: {{ issue.status }}</p>
            <p>Created At: {{ formatDateString(issue.created_at) }}</p>
            <p>Updated At: {{ formatDateString(issue.updated_at) }}</p>
            <p>Created By: {{ issue.created_by.username }}</p>
            <div>
                <button @click="deleteIssue">Löschen</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.issue {
    padding: 1rem 2rem;
    max-width: 80vw;
}
</style>