<template>
  <section class="bg-[#edf2f7] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <h2 class="font-heading text-4xl font-semibold text-slate-900">Services</h2>
        <p class="mx-auto mt-4 max-w-3xl text-base text-slate-500">
          Partner with our expert team for tailored services that meet your unique project requirements.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="service in services"
          :key="service.id"
          class="flex flex-col rounded-3xl bg-white px-6 pb-6 pt-10 shadow-lg shadow-slate-400/15"
        >
          <div class="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100">
            <img :src="service.image" :alt="service.title" class="h-full w-full object-cover" />
          </div>
          <h3 class="mt-6 text-lg font-semibold text-slate-900">{{ service.title }}</h3>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{{ service.description }}</p>
          <button class="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-navy">
            Learn More
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="m10 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { services } from '../data/services.js';
</script>
