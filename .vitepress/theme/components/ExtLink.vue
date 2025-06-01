<script lang="ts" setup>
defineProps<{
  href: string
}>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i class="i-mynaui-external-link inline-block w-0.8em h-0.8em" />
    <slot />
  </a>  
</template>
