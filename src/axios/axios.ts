import env from "#config/env/env.js";
import axios from "axios";

export const WbBoxTariffsApi = axios.create({
    baseURL: env.WB_API_URL,
    timeout:5000,
    headers: {
        Authorization: `Bearer ${env.WB_API_TOKEN}`
    }
})