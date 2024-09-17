<script setup lang="ts">
import JobListing from '../components/JobListing.vue';
</script>

<template>
  <!-- Go Back -->
  <section>
    <div class="container m-auto py-6 px-6">
      <a
        href="/"
        class="text-green-500 hover:text-green-600 flex items-center"
      >
        <i class="fas fa-arrow-left mr-2"></i> Back to Job Listings
      </a>
    </div>
  </section>
  <JobListing :btn_show="false"/>
</template>
