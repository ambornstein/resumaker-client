<script setup lang="ts">
import { inject } from 'vue';
import type { Profile } from '../../types/type';

const key = inject<Profile>("name")

</script>
<template>
    <div className="grid grid-cols-2">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="key!.name"/>
    </div>
</template>