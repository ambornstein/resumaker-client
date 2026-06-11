<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { EntryCategory } from '../lib/types'
import SectionLoading from '../components/overlay/SectionLoading.vue'

const route = useRoute()

type ProfileSection = 'profile' | EntryCategory

const viewMode = ref<ProfileSection>('profile')

if (route.query.section) {
  viewMode.value = route.query.section as ProfileSection
}
</script>

<template>
  <div className="flex flex-col gap-4">
    <div className="flex col-span-2 justify-between">
      <h1 className="align-text-bottom">Your Profile</h1>
      <RouterLink className="link" to="/dashboard">
        <h3>See Resumes</h3>
      </RouterLink>
    </div>
    <div className="flex flex-col gap-4 w-full">
      <ul className="grid grid-flow-col w-fit panel h-fit p-2 gap-2">
        <RouterLink to="/profile/info">
          <li className="text-lg p-2 bg-contrast/20 hover:bg-link-hover/20 hover:border-link border border-transparent">
            <span>Information</span>
          </li>
        </RouterLink>
        <RouterLink to="/profile/entries">
          <li className="text-lg p-2 bg-contrast/20 hover:bg-link-hover/20 hover:border-link border border-transparent">
            <span>Resume Entries</span>
          </li>
        </RouterLink>
      </ul>
      <Suspense>
        <RouterView />
        <template #fallback>
          <SectionLoading />
        </template>
      </Suspense>
    </div>
  </div>
</template>
