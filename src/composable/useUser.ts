import { ref } from "vue";
import type { Account } from "../types/type";
import api from "../services/api";

const user = ref<Account>();

//await api.post("/api/accounts", {"firstName": "Andrei", "lastName": "Bornstein"});

export function useUser() {
    async function fetchUserData() {
        const result = await api.get("/api/accounts/1");
        user.value = result.data
    }

    return { user, fetchUserData }
}
