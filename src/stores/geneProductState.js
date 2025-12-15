import { computed, reactive } from 'vue';
import { geneEditingProducts } from '../data/geneProducts.js';

const state = reactive({
  active: geneEditingProducts.map((item, index) => ({ ...item, originalIndex: index })),
  removed: [],
});

const sortByOriginal = (list) => list.slice().sort((a, b) => a.originalIndex - b.originalIndex);

const activeProducts = computed(() => sortByOriginal(state.active));
const removedProducts = computed(() => sortByOriginal(state.removed));

const categories = computed(() => ['All', ...new Set(geneEditingProducts.map((item) => item.category || 'Other'))]);

const removeProduct = (id) => {
  const index = state.active.findIndex((product) => product.id === id);
  if (index !== -1) {
    const [product] = state.active.splice(index, 1);
    state.removed.push(product);
  }
};

const restoreProduct = (id) => {
  const index = state.removed.findIndex((product) => product.id === id);
  if (index !== -1) {
    const [product] = state.removed.splice(index, 1);
    state.active.push(product);
  }
};

const removedGroups = computed(() => {
  const groups = {};
  removedProducts.value.forEach((product) => {
    const groupKey = product.category || 'Other';
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(product);
  });
  return Object.entries(groups).map(([category, items]) => ({ category, items }));
});

export const useGeneProductStore = () => ({
  activeProducts,
  removedProducts,
  categories,
  removeProduct,
  restoreProduct,
  removedGroups,
});
