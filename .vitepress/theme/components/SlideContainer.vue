<template>
  <div class="SlideBox" ref="SlideBox">
    <div class="SlideBoxContent" :style="contentStyle" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';

const slideBox = useTemplateRef('SlideBox')
const { width, height } = useElementSize(slideBox)
const contentStyle = computed(() => {
  const scale = Math.min(width.value / 980)
  return {
    width: '980px',
    height: '552px',
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  }
})
</script>

<style scoped>
.SlideBox {
  width: min(100%, 480px);
  position: relative;
  --uno: border-#ccc rounded border-1.5px border-solid mx-auto;
}

.SlideBox::before {
  content: "";
  display: block;
  padding-top: calc(100% / 16 * 9);
}

.SlideBoxContent {
  position: absolute;
  top: 0;
  left: 0;
}
</style>