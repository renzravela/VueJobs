<script setup lang="ts">
import Job from "./Job.vue";
import { defineProps, onMounted, reactive } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import JobsData from "../jobs.json";

interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  salary: string;
  location: string;
}

const state = reactive({
  jobs: [] as Job[],
  isLoading: true,
  local_data: JobsData.jobs as Job[], 
});

interface Props {
  limit?: number;
  btn_show: boolean;
}
const props = defineProps<Props>();

onMounted(async () => {
  try {
    const response = await axios.get("/api/jobs");
    state.jobs = response.data;
  } catch (error) {
    console.error("Failed to fetch jobs, loading local data:", error);
    state.jobs = state.local_data; // Use local JSON data if API request fails
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <!-- Browse Jobs -->
  <section class="bg-green-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div
        v-if="state.isLoading"
        class="text-center text-gray-500 py-6"
      >
        <PulseLoader />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-else>
        <div
          v-for="(job, index) in state.jobs.slice(0, props.limit || state.jobs.length)"
          :key="index"
        >
          <Job
            :id="job.id"
            :title="job.title"
            :type="job.type"
            :description="job.description"
            :salary="job.salary"
            :location="job.location"
          />
        </div>
      </div>
      <section v-if="props.btn_show" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
          to="/jobs"
          class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Jobs
        </RouterLink>
      </section>
    </div>
  </section>
</template>
