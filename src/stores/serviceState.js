import { computed, reactive } from 'vue';
import { services } from '../data/services.js';

const state = reactive({
  active: services.map((item, index) => ({ ...item, originalIndex: index })),
  removed: [],
});

const sortByOriginal = (list) => list.slice().sort((a, b) => a.originalIndex - b.originalIndex);

const activeServices = computed(() => sortByOriginal(state.active));
const removedServices = computed(() => sortByOriginal(state.removed));
const categories = computed(() => ['All', ...new Set(services.map((service) => service.category || 'Other'))]);

const removeService = (id) => {
  const index = state.active.findIndex((service) => service.id === id);
  if (index !== -1) {
    const [service] = state.active.splice(index, 1);
    state.removed.push(service);
  }
};

const restoreService = (id) => {
  const index = state.removed.findIndex((service) => service.id === id);
  if (index !== -1) {
    const [service] = state.removed.splice(index, 1);
    state.active.push(service);
  }
};

const removedGroups = computed(() => {
  const groups = {};
  removedServices.value.forEach((service) => {
    const key = service.title || 'Other';
    if (!groups[key]) groups[key] = [];
    groups[key].push(service);
  });
  return Object.entries(groups).map(([category, items]) => ({ category, items }));
});

export const useServiceStore = () => ({
  activeServices,
  removedServices,
  removeService,
  restoreService,
  removedGroups,
  categories,
});
