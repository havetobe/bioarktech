import { computed, reactive } from 'vue';
import { featuredProducts } from '../data/products.js';

const state = reactive({
  active: featuredProducts.map((product, index) => ({ ...product, originalIndex: index })),
  removed: [],
});

const sortByOriginal = (list) => list.slice().sort((a, b) => a.originalIndex - b.originalIndex);

const activeProducts = computed(() => sortByOriginal(state.active));
const removedProducts = computed(() => sortByOriginal(state.removed));

const allCategories = Array.from(new Set(featuredProducts.map((product) => product.category)));

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

const removedByCategory = computed(() => {
  const groups = {};
  removedProducts.value.forEach((product) => {
    if (!groups[product.category]) groups[product.category] = [];
    groups[product.category].push(product);
  });
  return Object.entries(groups).map(([category, items]) => ({ category, items }));
});

export const useProductStore = () => ({
  categories: computed(() => ['All', ...allCategories]),
  activeProducts,
  removedProducts,
  removeProduct,
  restoreProduct,
  removedByCategory,
});
