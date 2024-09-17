<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Task {
    title: String,
    completed: Boolean,
}

const name = ref<string>("Renz Aerol Ravela");
const status = ref<boolean>(true);
const tasks = ref<Task[]>([]);
const newTask = ref<Task>({
    title: '',
    completed: false
})

const toggleBtn = () => {
  if (status.value == true) {
    status.value = false;
  } else {
    status.value = true;
  }
};

const handleSubmit = () => {
  if (newTask.value.title.trim() !== '') {
    tasks.value.push({ ...newTask.value });
    newTask.value = {
      title: '',
      completed: false
    };
  }
} 

const handleDelete = (index: number) => {
  tasks.value.splice(index, 1) // it delete the first index instead of the actual index
}

onMounted( async () => { 
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      tasks.value = data;
  } catch (error)  {
    console.error(error)
  }
} ) 
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="new_task"></label>
      <input type="text" id="new_task" name="new_task" v-model="newTask.title">
      <br>
      <button type="submit">Add New Task</button>
    </form>
    <h1>hi {{ name }}</h1>
    <p v-if="status">User is active</p>
    <p v-else>User is inactive</p>

    <h3>Task:</h3>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">{{ task.title }} <button @click="handleDelete(index)">Delete</button></li>
    </ul>

    <button @click="toggleBtn">Toggle</button>
  </div>
</template>
