<script setup lang="ts">
import SideBar from '../SideBar.vue';
</script>

<template>
    <SideBar :selected="'about'"></SideBar>
    <div class="about">
        <h1>About</h1>
        <p>
            BugTracker is a simple issue tracking application. It allows you to create, update, and delete issues.
        </p>

        <p>
            This application is built using the following technologies:
        </p>

        <ul>
            <li><a href="https://vuejs.org/" target="_blank">Vue 3</a></li>
            <li><a href="https://vitejs.dev/" target="_blank">Vite</a></li>
            <li><a href="https://nodejs.org/en" target="_blank">Node.js</a></li>
            <li><a href="https://expressjs.com/" target="_blank">Express</a></li>
            <li><a href="https://www.typescriptlang.org/" target="_blank">Typescript</a></li>
            <li><a href="https://www.passportjs.org/" target="_blank">Passport</a></li>
            <li><a href="https://www.mysql.com/" target="_blank">MySql</a></li>
            <li><a href="https://www.chartjs.org/" target="_blank">chart.js</a></li>
        </ul>

        <p>
            The application is open source and the code can be found on <a
                href="https://github.com/Flashrex/bugtracker">GitHub</a>.
        </p>

        <p>
            If you have any questions or feedback, feel free to reach out to me by <a
                href="mailto:duda.dominik96@gmail.com">email</a>.
        </p>

        <p>
            Thanks for checking out BugTracker!
        </p>

    </div>
</template>

<style scoped>
.about {
    padding: 1rem 2rem;
}

h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
}

ul {
    list-style-type: disc;
    margin-left: 2rem;
    margin-bottom: 1rem;
}

li {
    margin-bottom: 0.5rem;
}

p {
    margin-bottom: 1rem;
    line-height: 1.5;
}

a {
    color: #149e52;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .about {
        max-height: 100vh;
        overflow: scroll;
    }
}
</style>