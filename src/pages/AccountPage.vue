<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAccount } from '../composables/useAccount';

const { account, updateAccount } = useAccount();

const router = useRouter();

if (!!account.value) router.back()
</script>

<template>
    <div className="flex flex-col gap-2">
        <RouterLink to="/profile">See Resumes</RouterLink>
        <h2>Your Profile</h2>
        <h3>Information</h3>
        <div className="split-column">
            <label>First Name</label><input type="text" v-model="account!.firstName" />
            <label>Last Name</label><input type="text" v-model="account!.lastName" />
            <label>Location</label><input type="text" v-model="account!.location"/>
            <label>US Citizen</label><input type="checkbox" v-model="account!.USCitizen"/>
        </div>
        <h3>Contact Information</h3>
        <div className="split-column">
            <label>Email</label><input id="email" type="email" v-model="account!.email" />
            <label>Website</label><input id="websiteLink" type="url" v-model="account!.website"/>
            <label>LinkedIn</label><input id="linkedInLink" type="url" v-model="account!.linkedInLink" />
            <label>GitHub</label><input id="githubLink" type="url" v-model="account!.githubLink" />
            <label>Phone Number</label><input id="phoneNumber" type="tel" v-model="account!.phoneNumber"/>
        </div>
        <button className="w-md" @click="updateAccount(account!)">Save</button>
    </div>
</template>
