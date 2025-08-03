<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { vMaska } from "maska/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const waitingForResponse = ref(false);
const credentials = reactive({
  phone: null,
});
const verify = reactive({
  code: null,
});

const errorMessages = reactive({
  phone: null,
  code: null,
});

const handleSubmit = () => {
  axios
    .post("http://127.0.0.1:8000/api/login", {
      phone: clearText(credentials.phone),
    })
    .then((response) => {
      console.log(response);
      waitingForResponse.value = true;
    })
    .catch((error) => {
      errorMessages.phone = error.response.data.message;
    });
};

const handleVerify = () => {
  axios
    .post("http://127.0.0.1:8000/api/login/verify", {
      phone: clearText(credentials.phone),
      login_code: parseInt(clearText(verify.code)),
    })
    .then((response) => {
      console.log(response);
      router.push({ name: "home" });
    })
    .catch((error) => {
      errorMessages.code = error.response.data.message;
    });
};

const clearText = (text) => {
  return text
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
};
</script>

<template>
  <!-- LOGIN -->
  <div
    v-if="!waitingForResponse"
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
        Enter Your Mobile Number
      </h2>
    </div>

    <div
      class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-8 py-16 rounded-lg shadow-sm shadow-green-300 bg-gray-200 hover:bg-transparent hover:shadow-green-600 transition duration-300 ease-in-out"
    >
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <div class="mt-2">
            <input
              v-model="credentials.phone"
              v-maska="'(###) ##-####-###'"
              placeholder="(971) 55-5555-555"
              type="tel"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <p v-if="errorMessages.phone" class="text-red-500 text-sm mt-1">
              {{ errorMessages.phone }}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- END LOGIN -->

  <!-- VERIFICATION -->
  <div
    v-else-if="waitingForResponse"
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
        Enter Your Verification Code
      </h2>
    </div>

    <div
      class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-8 py-16 rounded-lg shadow-sm shadow-green-300 bg-gray-200 hover:bg-transparent hover:shadow-green-600 transition duration-300 ease-in-out"
    >
      <form class="space-y-6" @submit.prevent="handleVerify">
        <div>
          <div class="mt-2">
            <input
              v-model="verify.code"
              v-maska="'###-###'"
              placeholder="555-555"
              type="text"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <p v-if="errorMessages.code" class="text-red-500 text-sm mt-1">
              {{ errorMessages.code }}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- END VERIFICATION -->
</template>
