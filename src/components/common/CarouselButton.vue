<template>
  <button
    class="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-lg shadow-slate-300/40 transition hover:border-brand-blue/40 hover:text-brand-blue"
    :class="{
      'cursor-not-allowed opacity-40 hover:border-slate-200 hover:text-slate-500': disabled,
    }"
    :disabled="disabled"
    @click="$emit('click')"
    :aria-label="icon === 'left' ? 'Previous' : 'Next'"
  >
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path v-if="icon === 'left'" d="m14 6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
      <path v-else d="m10 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
