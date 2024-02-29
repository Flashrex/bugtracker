<script setup lang="ts">
import router from '@/router';
import axios from 'axios';

const props = defineProps({
    selected: {
        type: String,
        default: ''
    }
});

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

function profile() {
    router.push('/profile');
}

async function logout() {
    await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/logout`).then((response) => {
        router.push('/login');
    }).catch((error) => {
        error.value = 'Invalid username or password';
    });
}

function isSelected(page: string) {
    return props.selected === page;
}

</script>

<template>
    <div class="sidebar">
        <div class="logo-container">
            <img alt="Vue logo" class="logo" src="../assets/trouble.svg" width="50" height="50" />
            <h1>BugTracker</h1>
        </div>

        <nav>
            <ul>
                <li @click="goToHome">
                    <img alt="home_icon" src="../assets/home.svg" width="30" height="30" />
                    <span class="icon_text" :class="{ selected: isSelected('home') }">Home</span>
                </li>
                <li @click="goToIssues">
                    <img alt="home_icon" src="../assets/bug.svg" width="30" height="30" />
                    <span class="icon_text" :class="{ selected: isSelected('issues') }">Issues</span>
                </li>
                <li @click="goToDiscussion">
                    <img alt="home_icon" src="../assets/chat.svg" width="30" height="30" />
                    <span class="icon_text" :class="{ selected: isSelected('discussion') }">Discussion</span>
                </li>
                <li @click="goToAbout">
                    <img alt="home_icon" src="../assets/contact.svg" width="30" height="30" />
                    <span class="icon_text" :class="{ selected: isSelected('about') }">About</span>
                </li>
                <li @click="profile">
                    <img alt="home_icon" src="../assets/person.svg" width="30" height="30" />
                    <span class="icon_text" :class="{ selected: isSelected('profile') }">Profile</span>
                </li>
                <li @click="logout">
                    <img alt="home_icon" src="../assets/logout.svg" width="30" height="30" />
                    <span class="icon_text">Logout</span>
                </li>
            </ul>
        </nav>

        <div class="footer">
            <!-- Copyright -->
            <p>&copy; 2024 Flashrex. All rights reserved.</p>
        </div>
    </div>
</template>

<style scoped>
.logo {
    filter: invert(60%);
}

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

.footer {
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.footer p {
    font-size: 0.8rem;
    color: #ffffff80;
}

.selected {
    color: #149e52;
    font-weight: bold;
}

@media (max-width: 768px) {
    .sidebar {
        padding: 0.5rem 0.2rem;
        border-radius: 0;
    }

    .logo-container>h1 {
        display: none;
    }

    .logo-container>img {
        width: 30px;
        height: 30px;
    }

    .icon_text {
        display: none;
    }

    nav {
        margin: 0;
    }

    .footer {
        display: none;
    }
}
</style>
