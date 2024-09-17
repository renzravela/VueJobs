<script setup lang="ts">
import Job from "./Job.vue";
import { defineProps, onMounted, reactive } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { RouterLink } from "vue-router";
import axios from "axios";

interface Job {
  id: number;
  title: string;
  type: string;
  description: string;
  salary: number;
  location: string;
}

const state = reactive({
  jobs: [] as Job[],
  isLoading: true,
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
    console.error(error);
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
        v-if="state.isLoading == true"
        class="text-center text-gray-500 py-6"
      >
        <PulseLoader />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(job, index) in state.jobs.slice(
            0,
            props.limit || state.jobs.length
          )"
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
          >View All Jobs</RouterLink
        >
      </section>
    </div>
  </section>
</template>
