<template>
  <header class="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
    <div class="mx-auto flex w-full max-w-[1280px] items-center gap-8 px-5 py-4">
      <div class="flex items-center gap-3">
        <img :src="logo" alt="BioArk logo" class="h-11 w-auto" />
        <p class="font-heading text-xl font-semibold text-slate-900">BioArk Technologies</p>
      </div>

      <div class="hidden flex-1 items-center justify-end gap-5 text-sm font-medium text-slate-600 lg:flex">
        <nav class="flex items-center gap-2">
          <NavChip v-for="item in navItems" :key="item" :label="item" />
          <button class="px-3 py-2 text-slate-600 transition hover:text-slate-900">Design</button>
          <button class="px-3 py-2 text-slate-600 transition hover:text-slate-900">Blog</button>
          <NavChip label="About" :show-caret="false" />
        </nav>

        <div class="flex items-center gap-3">
          <button class="rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/20">
            Quote
          </button>
          <button
            class="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-brand-blue hover:text-brand-blue"
            aria-label="Open cart"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                d="M5 6h1.6a1 1 0 0 1 .98.79L9 17h8m-8-3h8a1 1 0 0 0 .98-.8L18.8 8H7.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from '/root/bioarktech/src/assets/Logo.png';
import NavChip from './common/NavChip.vue';

const navItems = ['Products', 'Services', 'Reagents'];
</script>
