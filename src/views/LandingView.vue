<script setup>
import { useRouter } from "vue-router";
  
const router = useRouter();
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen w-screen bg-gradient-to-r from-green-100 to-blue-50 transition duration-300 ease-in-out"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Choose Your Role
      </h2>
    </div>

    <div
      class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-8 py-16 rounded-lg shadow-sm shadow-green-300 bg-gray-200 hover:bg-transparent hover:shadow-green-600 transition duration-300 ease-in-out"
    >
      <div class="flex space-x-4">
        <router-link
          :to="{ name: 'driver' }"
          class="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:bg-green-700 hover:text-white"
        >
          Driver
        </router-link>
        <router-link
          :to="{ name: 'passenger' }"
          class="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:bg-green-700 hover:text-white  "
        >
          Passenger
        </router-link>
      </div>
    </div>
  </div>
</template>
