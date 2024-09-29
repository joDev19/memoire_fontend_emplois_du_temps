<template>
    <p class="font-semibold text-xl text-sky-600 mb-5">{{ title }} <br>
        <small class="font-normal text-black italic text-xs">{{ description }}</small>
        <br>
        <!-- <span class="font-normal text-black italic">{{ router }}</span> -->
    </p>
</template>

<script setup>
import router from '@/router';

const props = defineProps(['title', 'description'])
</script>

<style lang="css" scoped></style>