<script setup lang="ts">
import SideBar from '../SideBar.vue';
import IssueTable from '../IssueTable.vue';

</script>

<template>
    <SideBar :selected="'issues'"></SideBar>
    <div class="issues">
        <h1>Open Issues</h1>
        <IssueTable></IssueTable>
    </div>
</template>

<style scoped>
.issues {
    padding: 1rem 2rem;
}
</style>