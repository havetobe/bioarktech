<template>
  <section class="bg-[#edf2f7] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <h2 class="font-heading text-4xl font-semibold text-slate-900">Services</h2>
        <p class="mx-auto mt-4 max-w-3xl text-base text-slate-500">
          Partner with our expert team for tailored services that meet your unique project requirements.
        </p>
      </div>

      <div class="mt-10 flex flex-col items-center gap-4 text-sm text-slate-500 sm:flex-row sm:justify-between">
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="category in categories"
            :key="category"
            class="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition"
            :class="
              category === activeCategory
                ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                : 'border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-900'
            "
            @click="setCategory(category)"
          >
            {{ category }}
          </button>
        </div>
        <p class="rounded-full bg-white/80 px-4 py-1 text-xs uppercase tracking-[0.3em] shadow">
          Showing {{ filteredServices.length }} items
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="service in filteredServices"
          :key="service.id"
          class="group relative flex flex-col rounded-3xl bg-white px-6 pb-6 pt-10 shadow-lg shadow-slate-400/15 transition duration-200 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(15,23,42,0.15)]"
        >
          <button
            class="absolute right-4 top-4 hidden rounded-full bg-white/90 p-2 text-slate-500 shadow group-hover:flex hover:text-red-500"
            type="button"
            @click.stop="promptDelete(service)"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
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

      <transition name="fade">
        <div
          v-if="pendingDelete"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        >
          <div class="w-full max-w-md rounded-3xl bg-white p-6 text-left shadow-2xl shadow-slate-900/30">
            <p class="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Confirm removal</p>
            <h3 class="mt-3 text-lg font-semibold text-slate-900">
              Remove {{ pendingDelete.title }} from Services?
            </h3>
            <p class="mt-2 text-sm text-slate-500">
              This hides the service card here. You can restore it from the Services menu later.
            </p>
            <div class="mt-6 flex justify-end gap-3">
              <button
                class="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800"
                @click="cancelDelete"
              >
                Keep showing it
              </button>
              <button
                class="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30"
                @click="confirmDelete"
              >
                Hide this service
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useServiceStore } from '../stores/serviceState.js';

const { activeServices, removeService, categories, removeService: removeStoredService } = useServiceStore();
const pendingDelete = ref(null);
const activeCategory = ref('All');

const filteredServices = computed(() => {
  if (activeCategory.value === 'All') {
    return activeServices.value;
  }
  return activeServices.value.filter((service) => service.category === activeCategory.value);
});

const promptDelete = (service) => {
  pendingDelete.value = service;
};

const confirmDelete = () => {
  if (pendingDelete.value) {
    removeService(pendingDelete.value.id);
    pendingDelete.value = null;
  }
};

const cancelDelete = () => {
  pendingDelete.value = null;
};

const setCategory = (category) => {
  activeCategory.value = category;
};
</script>
