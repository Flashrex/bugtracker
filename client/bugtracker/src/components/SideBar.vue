<script setup lang="ts">
import router from '@/router';

function goToHome() {
    router.push('/');
}

function goToIssues() {
    router.push('/issues');
}

function goToDiscussion() {
    router.push('/discussion');
}

function goToAbout() {
    router.push('/about');
}

</script>

<template>
    <div class="sidebar">
        <div class="logo-container">
            <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="50" height="50" />
            <h1>BugTracker</h1>
        </div>

        <nav>
            <ul>
                <li @click="goToHome">
                    <img alt="home_icon" src="../assets/home.svg" width="30" height="30" />
                    Home
                </li>
                <li @click="goToIssues">
                    <img alt="home_icon" src="../assets/bug.svg" width="30" height="30" />
                    Issues
                </li>
                <li @click="goToDiscussion">
                    <img alt="home_icon" src="../assets/chat.svg" width="30" height="30" />
                    Discussion
                </li>
                <li @click="goToAbout">
                    <img alt="home_icon" src="../assets/contact.svg" width="30" height="30" />
                    About
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.sidebar {
    width: 15vw;
    height: 100vh;
    background-color: #f3f3f30c;
    padding: 1rem;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}

.logo-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

nav {
    margin: 1rem;
}

ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
    transition: 0.5s;
}

li:hover {
    background-color: #ffffff0c;
    border-radius: 10px;
    cursor: pointer;
}

li img {
    filter: invert(100%);
}
</style>