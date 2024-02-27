<script setup lang="ts">
</script>

<template>
    <div class="about">
        <h1>About</h1>
        <p>
            BugTracker is a simple issue tracking application. It allows you to create, update, and delete issues.
        </p>

        <p>
            This application is built using the following technologies:
        </p>

        <ul>
            <li>Vue 3</li>
            <li>Vite</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
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
    color: #149e52;
}

p {
    margin-bottom: 1rem;
    line-height: 1.5;
}

a {
    color: #149e52;
    text-decoration: none;
}
</style>