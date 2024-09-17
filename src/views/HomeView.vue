<script setup lang="ts">
import Hero from "../components/Hero.vue";
import HomeCards from "../components/HomeCards.vue";
import JobListing from "../components/JobListing.vue";
</script>

<template>
  <Hero />
  <HomeCards />
  <JobListing :limit="3" :btn_show="true"/>
</template>
