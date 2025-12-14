<template>
  <section class="bg-[#edf2f7] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <h2 class="font-heading text-4xl font-semibold text-slate-900">Gene Editing Products</h2>
        <p class="mx-auto mt-4 max-w-3xl text-base text-slate-500">
          A comprehensive portfolio of tools for precise and efficient genome engineering, from CRISPR to viral vectors.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <article
          v-for="product in geneEditingProducts"
          :key="product.id"
          class="flex flex-col rounded-3xl bg-white px-6 pb-6 pt-8 shadow-lg shadow-slate-400/15"
        >
          <div class="h-36">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-contain" />
          </div>
          <h3 class="mt-6 text-lg font-semibold text-slate-900">{{ product.title }}</h3>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{{ product.description }}</p>
          <button
            class="mt-6 rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/20"
          >
            View the details
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { geneEditingProducts } from '../data/geneProducts.js';
</script>
