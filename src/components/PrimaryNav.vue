<template>
  <header class="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
    <div class="mx-auto flex w-full max-w-[1280px] items-center gap-8 px-5 py-4">
      <div class="flex items-center gap-3">
        <img :src="logo" alt="BioArk logo" class="h-11 w-auto" />
        <p class="font-heading text-xl font-semibold text-slate-900">BioArk Technologies</p>
      </div>

      <div class="hidden flex-1 items-center justify-end gap-5 text-sm font-medium text-slate-600 lg:flex">
        <nav class="flex items-center gap-2">
          <div class="relative" @mouseenter="openProducts" @mouseleave="scheduleCloseProducts">
            <button
              class="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 transition hover:border-brand-blue hover:text-brand-blue"
              :aria-expanded="showProductCatalog"
            >
              Products
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div
              v-if="showProductCatalog"
              class="absolute left-0 top-full mt-3 w-[640px] rounded-3xl bg-white p-6 shadow-2xl shadow-slate-400/30"
            >
              <div class="flex gap-6">
                <div class="w-1/3 border-r border-slate-100 pr-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Product Catalog</p>
                  <button
                    v-for="category in productCatalog"
                    :key="category.id"
                    class="mt-3 flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm transition"
                    :class="
                      category.id === activeCatalogId
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-500 hover:bg-slate-50'
                    "
                    @mouseenter="setActiveCatalog(category.id)"
                  >
                    <span>{{ category.label }}</span>
                    <span class="text-xs text-slate-400">{{ category.count }}</span>
                  </button>
                </div>
                <div class="flex-1 space-y-4">
                  <div v-for="section in activeSections" :key="section.heading">
                    <p class="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                      {{ section.heading }}
                    </p>
                    <ul class="mt-2 space-y-2 text-sm text-slate-600">
                      <li
                        v-for="item in section.items"
                        :key="item"
                        class="cursor-pointer rounded-lg px-2 py-1 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                v-if="removedByCategory.length || removedGeneGroups.length"
                class="mt-6 border-t border-slate-100 pt-4"
              >
                <div class="flex max-h-56 flex-col gap-4 overflow-y-auto pr-1">
                  <div v-if="removedByCategory.length">
                    <p class="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                      Removed featured products
                    </p>
                    <div v-for="section in removedByCategory" :key="section.category" class="mt-3">
                      <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {{ section.category }}
                      </p>
                      <ul class="mt-2 space-y-1 text-sm text-slate-600">
                        <li
                          v-for="product in section.items"
                          :key="product.id"
                          class="cursor-pointer rounded-lg px-2 py-1 transition hover:bg-slate-50 hover:text-slate-900"
                          @click="restoreProduct(product.id)"
                        >
                          {{ product.name }}
                          <span class="ml-2 text-xs text-brand-blue">Restore</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="removedGeneGroups.length">
                    <p class="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Removed gene products</p>
                    <div v-for="group in removedGeneGroups" :key="group.category" class="mt-3">
                      <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {{ group.category }}
                      </p>
                      <ul class="mt-2 space-y-1 text-sm text-slate-600">
                        <li
                          v-for="product in group.items"
                          :key="product.id"
                          class="cursor-pointer rounded-lg px-2 py-1 transition hover:bg-slate-50 hover:text-slate-900"
                          @click="restoreGeneProduct(product.id)"
                        >
                          {{ product.title }}
                          <span class="ml-2 text-xs text-brand-blue">Restore</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative" @mouseenter="openServices" @mouseleave="scheduleCloseServices">
            <button
              class="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 transition hover:border-brand-blue hover:text-brand-blue"
              :aria-expanded="showServicesCatalog"
            >
              Services
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div
              v-if="showServicesCatalog"
              class="absolute left-0 top-full mt-3 w-[520px] rounded-3xl bg-white p-6 shadow-2xl shadow-slate-400/30"
            >
              <div class="flex gap-6">
                <div class="w-1/3 border-r border-slate-100 pr-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Service Overview</p>
                  <button
                    v-for="group in serviceCatalog"
                    :key="group.id"
                    class="mt-3 flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm transition"
                    :class="
                      group.id === activeServiceId
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-500 hover:bg-slate-50'
                    "
                    @mouseenter="setActiveService(group.id)"
                  >
                    <span>{{ group.label }}</span>
                    <span class="text-xs text-slate-400">{{ group.count }}</span>
                  </button>
                </div>
                <div class="flex-1">
                  <ul class="space-y-3 text-sm text-slate-600">
                    <li
                      v-for="service in activeServiceItems"
                      :key="service"
                      class="cursor-pointer rounded-lg px-2 py-1 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {{ service }}
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="removedServiceGroups.length" class="mt-6 border-t border-slate-100 pt-4">
                <p class="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Removed services</p>
                <div class="max-h-56 overflow-y-auto pr-1">
                  <div v-for="group in removedServiceGroups" :key="group.category" class="mt-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {{ group.category }}
                    </p>
                    <ul class="mt-2 space-y-1 text-sm text-slate-600">
                      <li
                        v-for="service in group.items"
                        :key="service.id"
                        class="cursor-pointer rounded-lg px-2 py-1 transition hover:bg-slate-50 hover:text-slate-900"
                        @click="restoreService(service.id)"
                      >
                        {{ service.title }}
                        <span class="ml-2 text-xs text-brand-blue">Restore</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 核心修改：给Reagents的NavChip添加灰色禁用样式 -->
          <NavChip 
            v-for="item in navItems" 
            :key="item" 
            :label="item" 
            :class="{
              'text-gray-400 pointer-events-none hover:text-gray-400 hover:bg-transparent cursor-not-allowed': item === 'Reagents'
            }"
          />
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
import { computed, ref } from 'vue';
import logo from '../assets/Logo.png';
import NavChip from './common/NavChip.vue';
import { useProductStore } from '../stores/productState.js';
import { useGeneProductStore } from '../stores/geneProductState.js';
import { useServiceStore } from '../stores/serviceState.js';

const navItems = ['Reagents'];
const { removedByCategory, restoreProduct } = useProductStore();
const { removedGroups: removedGeneGroups, restoreProduct: restoreGeneProduct } = useGeneProductStore();
const { removedGroups: removedServiceGroups, restoreService } = useServiceStore();

const productCatalog = [
  {
    id: 'genome',
    label: 'Genome Editing',
    count: 7,
    sections: [
      {
        heading: 'DNA',
        items: [
          'KnockIn Kit at Safe Harbor Sites',
          'Gene Tagging Kit',
          'Gene Deletion Kit',
          'CRISPR KnockOut Kit',
          'CRISPR Activation Kit',
          'CRISPR Inhibition Kit',
        ],
      },
      {
        heading: 'RNA',
        items: ['CRISPR Knockdown Kit'],
      },
    ],
  },
  {
    id: 'vector',
    label: 'Vector Clones',
    count: 4,
    sections: [
      {
        heading: 'Solutions',
        items: ['Premium Lentiviral Vectors', 'AAV Packaging Kits', 'Custom Vector Design'],
      },
    ],
  },
  {
    id: 'ivt',
    label: 'IVT mRNA',
    count: 0,
    sections: [
      {
        heading: 'Highlights',
        items: ['mRNA Design Studio', 'GMP-ready mRNA', 'mRNA Stabilization Reagents'],
      },
    ],
  },
  {
    id: 'protein',
    label: 'Purified Protein',
    count: 0,
    sections: [
      {
        heading: 'Proteins',
        items: ['Enzyme Suites', 'Custom Purification', 'Protein QC Services'],
      },
    ],
  },
  {
    id: 'virus',
    label: 'Virus Product',
    count: 2,
    sections: [
      {
        heading: 'Viruses',
        items: ['AAV Serotype Library', 'Lentivirus Starter Kits'],
      },
    ],
  },
  {
    id: 'cell',
    label: 'Cell Lines',
    count: 1,
    sections: [
      {
        heading: 'Cell Platforms',
        items: ['Stable Cell Line Development', 'Banks & QC'],
      },
    ],
  },
  {
    id: 'reagents',
    label: 'Reagents and Markers',
    count: 14,
    sections: [
      {
        heading: 'Reagents',
        items: ['Prestained Protein Markers', 'DNA Marker Kits', 'Transfection Reagents'],
      },
    ],
  },
];

const showProductCatalog = ref(false);
const activeCatalogId = ref(productCatalog[0].id);
let closeProductsTimeout;

const activeSections = computed(() => {
  const active = productCatalog.find((group) => group.id === activeCatalogId.value);
  return active ? active.sections : [];
});

const openProducts = () => {
  clearTimeout(closeProductsTimeout);
  showProductCatalog.value = true;
};

const scheduleCloseProducts = () => {
  clearTimeout(closeProductsTimeout);
  closeProductsTimeout = setTimeout(() => {
    showProductCatalog.value = false;
  }, 150);
};

const setActiveCatalog = (id) => {
  activeCatalogId.value = id;
};

const serviceCatalog = [
  {
    id: 'serviceGenome',
    label: 'Genome Editing',
    count: 3,
    items: ['CRISPR KnockIn Services', 'Knockdown Libraries', 'Validation Packages'],
  },
  {
    id: 'serviceSynthesis',
    label: 'Synthesis & Cloning',
    count: 2,
    items: ['De novo Cloning', 'GMP Plasmid Synthesis'],
  },
  {
    id: 'serviceIVT',
    label: 'IVT mRNA Services',
    count: 1,
    items: ['IVT mRNA Production Suite'],
  },
  {
    id: 'serviceProtein',
    label: 'Protein Purification',
    count: 0,
    items: ['Custom Purification', 'Quality Analytics'],
  },
  {
    id: 'serviceVirus',
    label: 'Virus Packaging',
    count: 4,
    items: ['AAV High-Throughput', 'Lentivirus Custom Packaging', 'Retrovirus Scale-Up', 'QC Reporting'],
  },
  {
    id: 'serviceCell',
    label: 'Cell Line Services',
    count: 2,
    items: ['Cell line services', 'Lab Supplies'],
  },
  {
    id: 'serviceUncategorized',
    label: 'Uncategorized',
    count: 2,
    items: ['Consulting Programs', 'Custom Support'],
  },
  {
    id: 'servicePremium',
    label: 'Premium-Market',
    count: 1,
    items: ['Enterprise Partnerships'],
  },
];

const showServicesCatalog = ref(false);
const activeServiceId = ref(serviceCatalog[0].id);
let closeServicesTimeout;

const activeServiceItems = computed(() => {
  const active = serviceCatalog.find((group) => group.id === activeServiceId.value);
  return active ? active.items : [];
});

const openServices = () => {
  clearTimeout(closeServicesTimeout);
  showServicesCatalog.value = true;
};

const scheduleCloseServices = () => {
  clearTimeout(closeServicesTimeout);
  closeServicesTimeout = setTimeout(() => {
    showServicesCatalog.value = false;
  }, 150);
};

const setActiveService = (id) => {
  activeServiceId.value = id;
};
</script>
