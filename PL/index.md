---
prev: false
next: false
---

# Programming Languages

<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 py-6">
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