<script setup lang="ts">
import { ref } from 'vue';


const emit = defineEmits(['update:data']);
const data = ref('');

const props = defineProps<{
    data: { headline: string, placeholder: string }
}>();

function save() {
    if (!data.value) return;

    emit('update:data', data.value);
}

function cancel() {
    emit('update:data', null);
}

</script>

<template>
    <div class="editBox">
        <h2>{{ props.data?.headline }}</h2>
        <input type="text" v-model="data" :placeholder="props.data?.placeholder">

        <div>
            <button @click="save">Save</button>
            <button @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<style scoped>
.editBox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.049);
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    width: 100%;
    max-height: 300px;
    overflow: auto;
}

input {
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: #149e52;
    color: white;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
}
</style>