<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { EntryCategory } from '../lib/types'
import Loading from '../components/overlay/Loading.vue'

const route = useRoute()

type ProfileSection = 'profile' | EntryCategory

const viewMode = ref<ProfileSection>('profile')

if (route.query.section) {
  viewMode.value = route.query.section as ProfileSection
}
</script>

<template>
  <div className="flex flex-col gap-8">
    <div className="flex col-span-2 justify-between">
      <h1>Your Profile</h1>
      <RouterLink className="link" to="/dashboard">
        <h3>See Resumes</h3>
      </RouterLink>
    </div>
    <div className="flex flex-row gap-8 w-full">
      <ul className="flex flex-col w-fit gap-4 panel rounded-lg h-fit p-4">
        <li className="link text-2xl w-48">
          <RouterLink to="/profile/info"><span>Profile Information</span></RouterLink>
        </li>
        <li className="link text-2xl w-48">
          <RouterLink to="/profile/entries"><span>Resume Entries</span></RouterLink>
        </li>
      </ul>
      <Suspense>
        <RouterView />
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </div>
  </div>
</template>
