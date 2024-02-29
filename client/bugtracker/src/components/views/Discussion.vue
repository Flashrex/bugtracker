<script setup lang="ts">
import SideBar from '../SideBar.vue';
import { nextTick, onMounted, ref } from 'vue';
import { formatDateString } from '../../utils/formatDateString';
import type { Post, User } from '@/types';
import axios from 'axios';

const userId = ref(0);
const input = ref(null as HTMLInputElement | null);
const postContainer = ref(null as HTMLDivElement | null);

const posts = ref<Post[]>([]);

onMounted(async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/posts`);

        posts.value = response.data.posts.sort((a: Post, b: Post) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        userId.value = response.data.user;

    } catch (error) {
        console.error(error);
    }

    scrollToBottom();

});

async function createPost() {
    try {

        const response = await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/posts`, {
            content: input.value ? input.value.value : 'Empty post'
        });

        const post = {
            id: response.data.insertId,
            content: input.value ? input.value.value : 'Empty post',
            created_at: new Date().toISOString(),
            author: { id: userId.value } as User
        };

        input.value!.value = '';
        posts.value.push(post);
        scrollToBottom();


    } catch (error) {
        console.error(error);
    }
}

async function deletePost(postid: number) {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/posts/${postid}`);
        posts.value.splice(posts.value.findIndex((post) => post.id === postid), 1);
    } catch (error) {
        console.error(error);
    }
}

const scrollToBottom = () => {
    nextTick(() => {
        postContainer.value!.scrollTop = postContainer.value!.scrollHeight;
    });
};
</script>

<template>
    <SideBar :selected="'discussion'"></SideBar>
    <div class="discussion">
        <h1>Discussion</h1>
        <div class="chatbox">
            <div class="post_container" ref="postContainer">
                <div v-for="post in posts" class="post" :class="{ 'post-self': userId === post.author.id }" :key="post.id">
                    <div class="post_headline">
                        <h2>{{ userId === post.author?.id ? "You... " : post.author?.username }}</h2>
                        <p>wrote at {{ formatDateString(post.created_at) }}</p>
                        <img v-if="userId === post.author.id" src="../../assets/delete.svg" width="20" height="20"
                            @click="deletePost(post.id)">
                    </div>
                    <p>{{ post.content }}</p>
                </div>
            </div>
            <div class="input_container">
                <input type="text" placeholder="Write something..." ref="input">
                <button @click="createPost">></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.discussion {
    padding: 1rem 2rem;
}

.chatbox {
    margin-top: 1rem;
    position: relative;
    width: 60vw;
    background-color: rgba(255, 255, 255, 0.033);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    min-height: 80vh;
    max-height: 80vh;
}

.post_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    overflow-y: auto;
    max-height: 65vh;
}

.post {
    align-self: flex-start;
    width: 45%;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.033);
}

.post-self {
    align-self: flex-end;
    background-color: rgba(255, 255, 255, 0.1);
}

.post_headline {
    position: relative;
    display: flex;
    align-items: first baseline;
    gap: 0.5rem;
}

.input_container {
    position: absolute;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    gap: 0.5rem;
    width: 100%;
    padding: 2rem 1rem;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

input {
    width: 95%;
    padding: 0.5rem;
    border: none;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
}

button {
    width: 5%;
    padding: 0.5rem;
    border: none;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    transition: 0.5s;
    font-weight: bold;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
}

img {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    filter: invert(100%);
    border-radius: 100%;
    transition: 0.5s;
    padding: 0.2rem;
}

img:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
    .discussion {
        padding: 0.1rem 1rem;
    }

    .chatbox {
        min-height: 85vh;
        max-height: 85vh;
        width: 75vw;
        overflow: hidden;
        padding: 0.5rem;
    }

    .post_container {
        max-height: 70vh;
    }

    .post {
        width: 90%;
    }

    .post_headline {
        flex-direction: column;
        gap: 0.1rem;
    }

    .post_headline>h2 {
        font-size: 1rem;
    }

    .post_headline>p {
        font-size: 0.8rem;
    }

    img {
        right: 0.2rem;
        top: 0.2rem;
    }

    .input_container {
        padding: 1rem 0.5rem;
    }

    input {
        width: 80%;
    }

    button {
        width: 15%;
    }
}
</style>