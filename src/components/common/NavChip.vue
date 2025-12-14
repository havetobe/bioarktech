<template>
  <button
    class="group flex items-center gap-1 rounded-full border border-transparent bg-slate-100/70 px-4 py-2 text-sm text-slate-600 transition hover:border-brand-blue/40 hover:bg-white hover:text-slate-900"
  >
    <span>{{ label }}</span>
    <svg
      v-if="showCaret"
      class="h-4 w-4 text-slate-400 transition group-hover:text-brand-blue"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
    >
      <path d="m9 6 6 6-6 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  showCaret: {
    type: Boolean,
    default: true,
  },
});
</script>
