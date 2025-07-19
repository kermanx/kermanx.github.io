---
prev: false
next: false
pageClass: index-page
---

# Programming Language Exploration

<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-6 px-2px">
  <template v-for="{ name, link }, day in data" :key="day">
    <div>
      {{ day }}
    </div>
    <div>
      <a :href="link">{{ name }}</a>
    </div>
  </template>
</div>

<script setup>
import { data } from './index.data.ts'
</script>