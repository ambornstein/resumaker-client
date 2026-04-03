<script setup lang="ts">
import { useSnackbar } from "../../composables/useSnackbar";
import CloseIcon from "../icons/CloseIcon.vue";

const { message, style, showSnackbar, hide } = useSnackbar();
</script>

<template>
    <div v-show="showSnackbar" className="w-full h-full">
        <div className="fixed w-full bottom-20 flex justify-center">
            <div v-if="style == 'normal'"
                className="border-thick p-2 bg-highlight border-highlight-secondary flex justify-between gap-12 items-center min-w-md">
                <span>{{ message }}</span>
                <CloseIcon @click="hide" />
            </div>
            <div v-else className="border-thick p-2 bg-error border-error-secondary flex justify-between items-center gap-12 min-w-md">
                <span>{{ message }}</span>
                <CloseIcon @click="hide" />
            </div>
        </div>
    </div>
</template>
