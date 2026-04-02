<script setup lang="ts">
import { useSnackbar } from "../../composables/useSnackbar";

const { message, style, showSnackbar, hide } = useSnackbar();
</script>

<template>
    <div v-show="showSnackbar" className="w-full h-full">
        <div className="fixed w-full bottom-20 flex justify-center">
            <div v-if="style == 'normal'"
                className="border-thick p-2 bg-highlight border-highlight-secondary flex justify-between items-center min-w-md">
                <p>{{ message }}</p>
                <input type="image" className="size-5 aspect-square p-1" src="/src/assets/close.png" @click="hide" />
            </div>
            <div v-else className="border-thick p-2 bg-error border-error-secondary flex justify-between items-center min-w-md">
                <p>{{ message }}</p>
                <input type="image" className="size-5 aspect-square p-1" src="/src/assets/close.png" @click="hide" />
            </div>
        </div>
    </div>
</template>
