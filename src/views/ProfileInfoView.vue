<script setup lang="ts">
import { useAccount } from '../composables/useAccount'

const { account, updateAccount, fetchAccount, deleteAccount } = useAccount()

function handleDeleteAccount() {
    if (confirm("Really delete your account? All of your information will be lost.")) {
        deleteAccount()
    }
}

if (!account.value) await fetchAccount();
</script>

<template>
    <div className="flex flex-col w-full gap-8 panel p-4 has-[button:hover]:bg-button transition-all duration-150">
        <div className="split-column w-fit">
            <h2 className="col-span-full mb-4" id="personal-info">
                Personal Information
            </h2>
            <label>First Name</label><input type="text" className="input-field" v-model="account!.firstName" />
            <label>Last Name</label><input type="text" className="input-field" v-model="account!.lastName" />
            <label>Location</label><input type="text" className="input-field" v-model="account!.location" />
            <label>US Citizen</label><input type="checkbox" className="input-field" v-model="account!.USCitizen" />
        </div>
        <div className="split-column max-w-lg">
            <h2 className="col-span-full mb-4" id="contact-info">
                Contact Information
            </h2>
            <label>Email</label><input id="email" type="email" className="input-field" v-model="account!.email" />
            <label>Website</label><input id="websiteLink" type="url" className="input-field"
                v-model="account!.website" />
            <label>LinkedIn</label><input id="linkedInLink" type="url" className="input-field"
                v-model="account!.linkedInLink" />
            <label>GitHub</label><input id="githubLink" type="url" className="input-field"
                v-model="account!.githubLink" />
            <label>Phone Number</label><input id="phoneNumber" type="tel" className="input-field"
                v-model="account!.phoneNumber" />
        </div>
        <button className="max-w-sm" @click="updateAccount(account!)">
            Save
        </button>
        <button className="text-error max-w-sm" @click="handleDeleteAccount">
            Delete Account
        </button>
    </div>
</template>
