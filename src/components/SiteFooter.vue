<template>
  <footer class="bg-[#edf2f7] pt-16 pb-10">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="group in footerLinks" :key="group.title">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{{ group.title }}</p>
          <ul class="mt-4 space-y-3 text-sm font-medium text-slate-600">
            <li v-for="link in group.links" :key="link">{{ link }}</li>
          </ul>
        </div>
      </div>

      <hr class="mt-12 border-slate-200" />

      <div class="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-3">
          <img :src="logo" alt="BioArk logo" class="h-12 w-auto" />
          <p class="font-heading text-lg font-semibold text-slate-900">BioArk Technologies</p>
        </div>
        <div class="text-sm text-slate-500">
          <p>© 2025 BioArk Technologies, LLC. All Rights Reserved</p>
          <div class="mt-1 flex gap-4">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
        <div class="flex items-center gap-4 text-slate-500">
          <a
            v-for="icon in socialIcons"
            :key="icon.label"
            href="#"
            class="transition hover:text-brand-blue"
            :aria-label="icon.label"
          >
            <component :is="icon.component" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { h } from 'vue';
import logo from '../assets/Logo.png';

const footerLinks = [
  {
    title: 'Explore',
    links: ['Products', 'Services', 'Blog', 'Request Quote'],
  },
  {
    title: 'Company',
    links: ['Why BioArk', 'Investors', 'Contact Us'],
  },
  {
    title: 'Store',
    links: ['Shopping Cart', 'Gene Design'],
  },
];

const socialIcons = [
  {
    label: 'Twitter',
    component: {
      render() {
        return h(
          'svg',
          { viewBox: '0 0 24 24', fill: 'currentColor' },
          [
            h('path', {
              d: 'M22 5.8c-.7.3-1.5.6-2.3.6a3.7 3.7 0 0 0 1.6-2 7.3 7.3 0 0 1-2.4.9 3.7 3.7 0 0 0-6.4 3.4A10.4 10.4 0 0 1 3.8 4.4a3.7 3.7 0 0 0 1.2 5 3.6 3.6 0 0 1-1.6-.4v.1a3.7 3.7 0 0 0 3 3.6 3.6 3.6 0 0 1-1.6.1 3.7 3.7 0 0 0 3.4 2.5A7.5 7.5 0 0 1 2 19c2 .1 7.8.2 12-3.7 3.5-3.4 3.7-7.8 3.7-9.5z',
            }),
          ],
        );
      },
    },
  },
  {
    label: 'LinkedIn',
    component: {
      render() {
        return h(
          'svg',
          { viewBox: '0 0 24 24', fill: 'currentColor' },
          [
            h('path', {
              d: 'M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-.9 6.5H7V21H4.1zM10 9.5h2.7v1.6h.1c.4-.7 1.4-1.6 2.9-1.6C18.7 9.5 20 11 20 14v7h-2.9v-6.3c0-1.5-.6-2.5-1.9-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.8V21H10z',
            }),
          ],
        );
      },
    },
  },
  {
    label: 'YouTube',
    component: {
      render() {
        return h(
          'svg',
          { viewBox: '0 0 24 24', fill: 'currentColor' },
          [
            h('path', {
              d: 'M21.6 7.2c-.2-.9-.9-1.7-1.8-1.9C18 5 12 5 12 5s-6 0-7.8.3a2.4 2.4 0 0 0-1.8 1.9C2 9 2 12 2 12s0 3 .4 4.8c.2.9.9 1.6 1.8 1.8C6 18.9 12 19 12 19s6 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM10 15V9l5.2 3z',
            }),
          ],
        );
      },
    },
  },
];
</script>
