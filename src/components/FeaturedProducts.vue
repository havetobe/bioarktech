<template>
  <section class="mt-16 bg-[#edf2f7] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <div class="flex flex-col gap-6 text-left sm:flex-row sm:items-center sm:justify-between">
          <div class="max-w-3xl">
            <h2 class="font-heading text-4xl font-semibold text-slate-900">Featured Products</h2>
            <p class="mt-3 text-base text-slate-500">
              High-performance reagents designed to accelerate your research and deliver reliable results.
            </p>
          </div>
          <div class="flex flex-col items-center gap-3 text-sm text-slate-500 sm:items-end">
            <div class="flex flex-wrap justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 shadow-sm shadow-white/60 backdrop-blur">
              <button
                v-for="category in categories"
                :key="category"
                class="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition"
                :class="
                  category === activeCategory
                    ? 'bg-brand-blue text-white shadow-lg shadow-blue-400/30'
                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                "
                @click="setCategory(category)"
              >
                {{ category }}
              </button>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-3 font-medium text-slate-500">
              <p class="rounded-full bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.3em] shadow">
                Showing
                <span class="font-semibold text-slate-800">{{ visibleProducts.length }}</span>
                /
                <span class="font-semibold text-slate-800">{{ filteredProducts.length }}</span>
              </p>
              <button
                class="rounded-full border border-slate-300 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm transition hover:border-slate-400 hover:text-slate-900"
                @click="toggleShowAll"
              >
                {{ showAll ? 'Show fewer' : 'View all products' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex items-start gap-6">
        <CarouselButton v-if="!showAll" icon="left" :disabled="!canGoPrevious" @click="goToPrevious" />

        <div
          class="grid flex-1 gap-6"
          :class="showAll ? 'sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-4'"
        >
          <article
            v-for="product in visibleProducts"
            :key="product.id"
            class="group relative flex h-full flex-col items-center rounded-[32px] bg-white p-6 text-center shadow-[0_15px_40px_rgba(15,23,42,0.1)] transition hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(15,23,42,0.15)]"
          >
            <button
              class="absolute right-4 top-4 hidden rounded-full bg-white/90 p-2 text-slate-500 shadow group-hover:flex hover:text-red-500"
              type="button"
              @click.stop="handleDelete(product)"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div class="mx-auto flex h-48 w-full max-w-[180px] items-center justify-center">
              <img :src="product.image" :alt="product.name" class="h-full w-full object-contain" />
            </div>
            <div class="mt-6">
              <p class="text-base font-semibold text-slate-800">{{ product.name }}</p>
              <p class="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">{{ product.category }}</p>
            </div>
          </article>
        </div>

        <CarouselButton v-if="!showAll" icon="right" :disabled="!canGoNext" @click="goToNext" />
      </div>

      <div v-if="!showAll" class="mt-10 flex justify-center gap-2">
        <button
          v-for="idx in pageIndicators"
          :key="idx"
          type="button"
          class="h-2 w-10 rounded-full transition"
          :class="idx === currentPage ? 'bg-brand-blue shadow-inner shadow-blue-900/30' : 'bg-white/60'"
          @click="jumpToPage(idx)"
        ></button>
      </div>

      <transition name="fade">
        <div
          v-if="pendingDelete"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        >
          <div class="w-full max-w-md rounded-3xl bg-white p-6 text-left shadow-2xl shadow-slate-900/30">
            <p class="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
              Confirm removal
            </p>
            <h3 class="mt-3 text-lg font-semibold text-slate-900">
              Remove {{ pendingDelete.name }} from Featured Products?
            </h3>
            <p class="mt-2 text-sm text-slate-500">
              This hides the product from the carousel. You can restore it anytime from the Products dropdown.
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
                Hide this product
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
import CarouselButton from './common/CarouselButton.vue';
import { useProductStore } from '../stores/productState.js';

const { categories, activeProducts, removeProduct } = useProductStore();

const visibleCount = 4;
const currentPage = ref(0);
const showAll = ref(false);
const activeCategory = ref('All');
const pendingDelete = ref(null);

const filteredProducts = computed(() => {
  const list = activeProducts.value;
  if (activeCategory.value === 'All') {
    return list;
  }
  return list.filter((product) => product.category === activeCategory.value);
});

const pageCount = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / visibleCount))
);

const visibleProducts = computed(() => {
  if (showAll.value) {
    return filteredProducts.value;
  }

  const start = currentPage.value * visibleCount;
  return filteredProducts.value.slice(start, start + visibleCount);
});

const canGoPrevious = computed(() => !showAll.value && currentPage.value > 0);
const canGoNext = computed(() => !showAll.value && currentPage.value < pageCount.value - 1);

const goToNext = () => {
  if (canGoNext.value) {
    currentPage.value += 1;
  }
};

const goToPrevious = () => {
  if (canGoPrevious.value) {
    currentPage.value -= 1;
  }
};

const jumpToPage = (index) => {
  if (!showAll.value) {
    currentPage.value = index;
  }
};

const toggleShowAll = () => {
  showAll.value = !showAll.value;
  if (!showAll.value && currentPage.value >= pageCount.value) {
    currentPage.value = 0;
  }
};

const pageIndicators = computed(() => Array.from({ length: pageCount.value }, (_, idx) => idx));

const setCategory = (category) => {
  activeCategory.value = category;
  currentPage.value = 0;
  showAll.value = false;
};

const handleDelete = (product) => {
  pendingDelete.value = product;
};

const confirmDelete = () => {
  if (pendingDelete.value) {
    removeProduct(pendingDelete.value.id);
    pendingDelete.value = null;
  }
};

const cancelDelete = () => {
  pendingDelete.value = null;
};
</script>
