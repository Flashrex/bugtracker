<script setup lang="ts">

import { ref, onMounted } from 'vue';
import type { Issue } from '../types';

import axios from 'axios';
import router from '@/router';

const issues = ref([] as Issue[]);

onMounted(async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/issues`);
        issues.value = response.data;
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

function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}

function goToIssue(id: number) {
    router.push(`/issues/${id}`);
}

</script>

<template>
    <table>
        <thead class="table_head">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="issue in issues" :key="issue.id" @click="goToIssue(issue.id)">
                <td>{{ issue.id }}</td>
                <td>{{ issue.title }}</td>
                <td>{{ issue.status }}</td>
                <td>{{ truncateString(issue.description, 80) }}</td>
                <td>{{ formatDateString(issue.created_at) }}</td>
                <td>{{ formatDateString(issue.updated_at) }}</td>
                <td>{{ issue.created_by.username }}</td>

            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    margin: 2rem 0;
    width: 80vw;
    border-collapse: collapse;
}

thead>tr {
    background-color: #149e52;

}

th {
    text-align: left;
    font-weight: bold;
    padding: 0.2rem;
}

td {
    padding: 0.2rem;
    font-weight: inherit;
}

tbody>tr:hover {
    cursor: pointer;
    font-weight: bold;
}

tbody>tr:nth-child(even) {
    background-color: #f3f3f305;
}
</style>