<template>
    <p class="font-semibold text-xl text-sky-600 mb-5"><RouterLink :to="{name: 'dashboard'}">Dashboard / <span  ></span> </RouterLink></p>
    <p class="font-semibold text-xl text-sky-600 mb-5">{{ title }} <br>
        <small class="font-normal text-black italic text-xs">{{ description }}</small>
        <br>
        <!-- <span class="font-normal text-black italic">{{ router }}</span> -->
    </p>
</template>

<script setup>
import router from '@/router';
import { faLeftLong, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink } from 'vue-router';
const props = defineProps(['title', 'description', 'links'])

</script>

<style lang="css" scoped></style>