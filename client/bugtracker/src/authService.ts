import axios from "axios";


export default {
    async isAuthenticated() {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/session/check-auth`);
        return response.data.isAuthenticated;
    }
}