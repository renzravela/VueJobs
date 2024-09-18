<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import axios from "axios";
import { onMounted, reactive } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useToast } from "vue-toast-notification";

// Define interfaces for job and company
interface Company {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: Company;
}

const route = useRoute();
const router = useRouter();
const toast = useToast();
const id = route.params.id;

// Reactive state with proper types
const state = reactive({
  job: {} as Job, // Declare job as an object of type Job
  company: {} as Company, // Declare company as an object of type Company
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${id}`);
    state.job = response.data;
    state.company = state.job.company; // Assuming the company comes nested in the job object
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
});

const handleDelete = async () => {
  try {
    await axios.delete(`/api/jobs/${id}`);
    toast.success('Job Deleted Successfully!');
    router.push('/jobs');
  } catch (error) {
    console.error(error);
    toast.error('Job Deletion Failed.');
  }
};
</script>

<template>
  <!-- Go Back -->
  <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink
        to="/"
        class="text-green-500 hover:text-green-600 flex items-center"
      >
        <i class="fas fa-arrow-left mr-2"></i> Back to Job Listings
      </RouterLink>
    </div>
  </section>

  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Job Description</h3>
            <p class="mb-4">{{ state.job.description }}</p>
            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>
            <p class="mb-4">{{ state.job.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>
            <h2 class="text-2xl">{{ state.company.name }}</h2>
            <p class="my-2">{{ state.company.description }}</p>
            <hr class="my-4" />
            <h3 class="text-xl">Contact Email:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.company.contactEmail }}</p>
            <h3 class="text-xl">Contact Phone:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${state.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Edit Job
            </RouterLink>
            <button @click="handleDelete"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
