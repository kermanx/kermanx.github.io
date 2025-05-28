# Programming Language

<div class="grid grid-cols-[auto_1fr] gap-4 py-6">
  <template v-for="{ name, link }, day in data" :key="day">
    <div>
      <a :href="link" target="_blank">{{ day }}</a>
    </div>
    <div>
      {{ name }}
    </div>
  </template>
</div>

<script setup>
import { data } from './index.data.ts'
</script>