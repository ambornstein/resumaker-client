<script lang="ts">
import { inject, ref } from 'vue';
import type { Profile } from '../types/type';

export default {
    setup() {
        const key = inject<Profile>("name")
        const bullets = ref(['Used x to accomplish y by doing z'])
        return { bullets, key }
    }
}

</script>

<template>
    <div className="flex flex-col">
        <input type="text" v-model="key!.name"/>
        <label for="position">Position</label>
        <input id="position" type='text'>
        <label for="company">Company</label>
        <input id="company" type='text'>
        <p>Bullet Point</p>
        <input v-for="value in bullets" v-bind:value="value" type="text" />
        <button @click="bullets.push('Used x to accomplish y by doing z')"></button>
    </div>
</template>