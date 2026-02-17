<script setup lang="ts">
import { useUser } from '../../composable/useUser';

const { user } = useUser();
</script>

<template>
    <h2>Your Profile</h2>
    <h3>Information</h3>
    <p>First Name: {{ user?.firstName }}</p>
    <p>Last Name: {{ user?.lastName }}</p>
    <p></p>
</template>
