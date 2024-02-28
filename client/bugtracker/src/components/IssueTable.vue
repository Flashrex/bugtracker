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
    <div class="table_container">
        <table>
            <thead class="table_head">
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Assigned to</th>
                    <th>Last Updated</th>
                    <th>Created At</th>
                    <th>Created By</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="issue in issues" :key="issue.id" @click="goToIssue(issue.id)">
                    <td>{{ issue.id }}</td>
                    <td>{{ issue.title }}</td>
                    <td><span class="tag" :class="issue.status">{{ issue.status }}</span></td>
                    <td>{{ truncateString(issue.description, 80) }}</td>
                    <td>{{ issue.assigned_to ? issue.assigned_to.username : "No one" }}</td>
                    <td>{{ formatDateString(issue.updated_at) }}</td>
                    <td>{{ formatDateString(issue.created_at) }}</td>
                    <td>{{ issue.created_by.username }}</td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table_container {
    margin: 2rem 0;
    border-radius: 5px;
    overflow: hidden;
}

table {
    width: 80vw;
    border-collapse: collapse;
}

thead>tr {
    background-color: #149e52;
}

th {
    text-align: left;
    font-weight: bold;
    padding: 0.5rem 1rem;
}

td {
    padding: 0.2rem;
    font-weight: inherit;
}

td {
    padding: 1rem;
}

tbody>tr:hover {
    cursor: pointer;
    opacity: 0.7;
}

tbody>tr:nth-child(even) {
    background-color: #f3f3f305;
}

.tag {
    padding: 0.2rem 1rem;
    border-radius: 15px;
    text-align: center;
}

.open {
    background-color: #149e52;
}

.in_progress {
    background-color: #d4af18;
}

.closed {
    background-color: #d52626;
}
</style>