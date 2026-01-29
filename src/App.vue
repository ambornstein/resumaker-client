<script lang="ts">
import { inject, provide, reactive, type InjectionKey } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import type { Profile } from './types/type';
import ExperienceCard from './components/ExperienceCard.vue';

export default {
  setup() {
    const name: Profile = reactive({name: "Andrei"})

    provide("name", name)
    return {name}
  },
  components: {
    ExperienceCard
  }
}

</script>


<template>
  <div className="flex flex-row">
    <div className="w-100 h-20 bg-slate-800">
      {{ name.name }}
    </div>
    <ExperienceCard />
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
