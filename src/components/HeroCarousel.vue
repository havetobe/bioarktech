<template>
  <section class="hero-section relative isolate flex w-full min-h-[calc(100vh-88px)] overflow-hidden bg-white">
    <article
      class="relative flex w-full flex-col justify-between bg-cover bg-center"
      :style="heroStyle"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white"></div>
      <div class="absolute -left-16 top-16 h-72 w-72 rounded-full bg-white/60 blur-[120px]"></div>
      <div class="absolute right-12 top-10 h-80 w-80 rounded-full bg-white/30 blur-[140px]"></div>

      <div class="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col justify-between px-6 py-12 text-left sm:px-10 lg:px-16">
        <div class="pt-4 sm:pt-8">
          <p class="font-heading text-sm font-semibold uppercase tracking-[0.5em] text-slate-400">
            {{ heroContent.eyebrow }}
          </p>
          <div class="mt-4 space-y-2">
            <p
              class="font-heading text-4xl font-semibold text-slate-900 sm:text-5xl lg:text-[62px] lg:leading-[1.05]
              bg-gradient-to-r from-brand-blue via-sky-500 to-emerald-400 bg-clip-text text-transparent"
            >
              {{ heroContent.headline }}
            </p>
            <p class="font-heading text-4xl font-semibold text-slate-900 sm:text-5xl lg:text-[62px] lg:leading-[1.05]">
              {{ heroContent.subheadline }}
            </p>
          </div>
          <p class="mt-6 text-lg leading-relaxed text-slate-600 lg:text-xl">
            {{ heroContent.copy }}
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-5">
            <button
              class="inline-flex items-center rounded-full bg-gradient-to-r from-brand-blue to-sky-500 px-9 py-3 text-lg font-semibold text-white shadow-[0_15px_30px_rgba(25,67,152,0.35)] transition hover:-translate-y-0.5"
            >
              Explore Services
            </button>
            <div class="flex items-center gap-3 text-sm font-medium text-slate-500">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-700">
              </span>
            </div>
          </div>
        </div>

        <div class="mt-14 border-t border-slate-200/70 pt-8">
          <div class="grid gap-8 text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="stat in heroContent.stats" :key="stat.label" class="text-left">
              <p class="text-3xl font-semibold text-slate-900 lg:text-4xl">{{ stat.value }}</p>
              <p class="text-xs uppercase tracking-[0.5em] text-slate-400">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </article>

    <button
      class="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-500 shadow-lg shadow-slate-500/30 transition hover:text-brand-blue"
      @click="goToPrevious"
      aria-label="Previous slide"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="m14 6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <button
      class="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-500 shadow-lg shadow-slate-500/30 transition hover:text-brand-blue"
      @click="goToNext"
      aria-label="Next slide"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="m10 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div class="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
      <span
        v-for="(slide, idx) in heroSlides"
        :key="slide.id"
        class="h-2 w-6 rounded-full bg-white/60"
        :class="idx === currentIndex ? 'bg-brand-blue' : 'bg-white/30'"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { heroSlides } from '../data/slides.js';

const currentIndex = ref(0);
const heroContent = heroSlides[0];

const heroStyle = computed(() => ({
  backgroundImage: `url(${heroSlides[currentIndex.value].image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center right',
  backgroundRepeat: 'no-repeat',
}));

const goToNext = () => {
  currentIndex.value = (currentIndex.value + 1) % heroSlides.length;
};

const goToPrevious = () => {
  currentIndex.value =
    (currentIndex.value - 1 + heroSlides.length) % heroSlides.length;
};
</script>
