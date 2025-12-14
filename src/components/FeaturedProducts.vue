<template>
  <section class="mt-16 bg-[#edf2f7] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <h2 class="font-heading text-4xl font-semibold text-slate-900">Featured Products</h2>
        <p class="mx-auto mt-4 max-w-3xl text-base text-slate-500">
          High-performance reagents designed to accelerate your research and deliver reliable results.
        </p>
      </div>

      <div class="mt-12 flex items-center gap-6">
        <CarouselButton icon="left" :disabled="!canGoPrevious" @click="goToPrevious" />

        <div class="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="product in visibleProducts"
            :key="product.id"
            class="flex flex-col items-center text-center"
          >
            <div class="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/20">
              <div class="mx-auto flex h-48 w-48 items-center justify-center">
                <img :src="product.image" :alt="product.name" class="h-full object-contain" />
              </div>
            </div>
            <p class="mt-6 text-base font-semibold text-slate-800">{{ product.name }}</p>
          </article>
        </div>

        <CarouselButton icon="right" :disabled="!canGoNext" @click="goToNext" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { featuredProducts } from '../data/products.js';
import CarouselButton from './common/CarouselButton.vue';

const visibleCount = 4;
const startIndex = ref(0);

const maxStartIndex = computed(() =>
  Math.max(0, featuredProducts.length - visibleCount)
);

const visibleProducts = computed(() =>
  featuredProducts.slice(startIndex.value, startIndex.value + visibleCount)
);

const canGoPrevious = computed(() => startIndex.value > 0);
const canGoNext = computed(() => startIndex.value < maxStartIndex.value);

const goToNext = () => {
  if (canGoNext.value) {
    startIndex.value += 1;
  }
};

const goToPrevious = () => {
  if (canGoPrevious.value) {
    startIndex.value -= 1;
  }
};
</script>
