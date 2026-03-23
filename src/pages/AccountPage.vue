<script setup lang="ts">
import { useUser } from '../composables/useUser';

const { user, updateAccount } = useUser();
</script>

<template>
    <div className="flex flex-col gap-2">
        <RouterLink to="/profile">See Resumes</RouterLink>
        <h2>Your Profile</h2>
        <h3>Information</h3>
        <div className="split-column">
            <label>First Name</label><input type="text" v-model="user.firstName" />
            <label>Last Name</label><input type="text" v-model="user.lastName" />
            <label>Location</label><input type="text" v-model="user.location"/>
            <label>US Citizen</label><input type="checkbox" v-model="user.USCitizen"/>
        </div>
        <h3>Contact Information</h3>
        <div className="split-column">
            <label>Email</label><input id="email" type="email" v-model="user.email" />
            <label>Website</label><input id="websiteLink" type="url" v-model="user.website"/>
            <label>LinkedIn</label><input id="linkedInLink" type="url" v-model="user.linkedInLink" />
            <label>GitHub</label><input id="githubLink" type="url" v-model="user.githubLink" />
            <label>Phone Number</label><input id="phoneNumber" type="tel" v-model="user.phoneNumber"/>
        </div>
        <button className="w-md" @click="updateAccount(user!)">Save</button>
    </div>
</template>
