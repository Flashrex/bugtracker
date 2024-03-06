<script setup lang="ts">
import SideBar from '../SideBar.vue';
import IssueTable from '../IssueTable.vue';
import router from '@/router';

function openIssue() {
    router.push('/issues/new');
}

</script>

<template>
    <SideBar :selected="'issues'"></SideBar>
    <div class="issues">
        <div class="header">
            <h1>Open Issues</h1>
            <button @click="openIssue">Open Issue</button>
        </div>
        <IssueTable></IssueTable>
    </div>
</template>

<style scoped>
.issues {
    max-height: 95vh;
    overflow: hidden;

    padding: 1rem 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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