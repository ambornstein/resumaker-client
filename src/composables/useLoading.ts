import { ref } from "vue";

const loading = ref<boolean>(false);

export function useLoading() {

    function setLoading(value: boolean) {
        loading.value = value
    }

    return { loading, setLoading }
}