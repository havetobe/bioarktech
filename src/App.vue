<template>
  <div class="min-h-screen bg-hero-gradient pb-16">
    <PrimaryNav />
    <HeroCarousel />
    <main class="px-4 sm:px-8">
      <FeaturedProducts />
      <GeneEditingProducts />
      <ServicesSection />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import HeroCarousel from './components/HeroCarousel.vue';
import PrimaryNav from './components/PrimaryNav.vue';
import FeaturedProducts from './components/FeaturedProducts.vue';
import GeneEditingProducts from './components/GeneEditingProducts.vue';
import ServicesSection from './components/ServicesSection.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>
