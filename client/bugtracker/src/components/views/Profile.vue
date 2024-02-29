<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SideBar from '../SideBar.vue';
import EditProfile from '../EditProfile.vue';
import axios from 'axios';

const userData = ref(null as { id: number, username: string, email: string, team: { name: string } } | null);

const editData = ref(null as { data: string, headline: string, placeholder: string } | null);

onMounted(async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/users/profile`);
        userData.value = response.data;
    } catch (error) {
        console.error(error);
    }
});

function editProfile(field: string) {
    switch (field) {
        case 'username':
            editData.value = { data: 'username', headline: 'Edit Username', placeholder: userData.value?.username || '' };
            break;

        case 'email':
            editData.value = { data: 'email', headline: 'Edit Email', placeholder: userData.value?.email || '' };
            break;

        case 'team':
            editData.value = { data: 'team', headline: 'Edit Team', placeholder: userData.value?.team?.name || '' };
            break;
    }
}

const saveProfile = (value: string) => {
    if (!value) {
        editData.value = null;
        return;
    }

    switch (editData.value?.data) {
        case 'username':
            userData.value!.username = value;
            break;

        case 'email':
            userData.value!.email = value;
            break;

        case 'team':
            if (!userData.value!.team) {
                userData.value!.team = { name: value };
                break;
            }
            userData.value!.team.name = value;
            break;
    }

    requestProfileUpdate(editData.value?.data || '', value);
    editData.value = null;
}

function requestProfileUpdate(data: string, value: string) {
    if (!userData.value?.id) return;

    axios.put(`${import.meta.env.VITE_APP_API_ENDPOINT}/users/${userData.value?.id}`, {
        [data]: value
    }).then(() => {
        console.log('Profile updated');
    }).catch((error) => {
        console.error(error);
    });
}

</script>

<template>
    <SideBar :selected="'profile'"></SideBar>

    <div class="profile">
        <h1>Profile</h1>
        <div class="dataContainer">
            <div class="dataRow">
                <p class="textBold">Name</p>
                <div>
                    <p class="dataText">{{ userData?.username }}</p>
                    <img src="../../assets/edit.svg" alt="edit" @click="editProfile('username')">
                </div>
            </div>

            <div class="dataRow">
                <p class="textBold">Email</p>
                <div>
                    <p class="dataText">{{ userData?.email }}</p>
                    <img src="../../assets/edit.svg" alt="edit" @click="editProfile('email')">
                </div>
            </div>

            <div class="dataRow">
                <p class="textBold">Team</p>
                <div>
                    <p class="dataText">{{ userData?.team?.name }}</p>
                    <img src="../../assets/edit.svg" alt="edit" @click="editProfile('team')">
                </div>
            </div>
        </div>
    </div>

    <EditProfile v-if="editData" :data="editData" @update:data="saveProfile"></EditProfile>
</template>


<style scoped>
.profile {
    padding: 1rem 2rem;
}

h1 {
    margin-bottom: 1rem;
}

.dataContainer {
    display: flex;
    flex-direction: column;
    width: 40vw;
}

.dataRow {
    border: 1px solid #3d3d3d21;
    background-color: #3d3d3d21;
    padding: 1rem;

    display: flex;
    justify-content: space-between;
}

.dataRow>div {
    display: flex;
    align-items: center;
}

.textBold {
    font-weight: bold;
}

.dataText {
    margin-right: 1rem;
}

img {
    width: 20px;
    height: 20px;
    filter: invert(40%);
}

img:hover {
    cursor: pointer;
}
</style>