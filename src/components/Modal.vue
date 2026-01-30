<script lang="ts">
export default {
    data() {
        return {
            showModal: true
        }
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    },
}
</script>

<template>
    <div v-show="showModal" className="fixed w-full h-full flex items-center justify-center bg-stone-800/40">
        <div className="w-100 h-100 bg-stone-700">
            <slot>
            </slot>
            <button className="fixed top-4 right-4" @click="closeModal">X</button>
        </div>
    </div>
</template>