<template>
    <Layout>
        <div class="p-5">
            <p class="font-semibold text-xl text-sky-600 mb-5">Les jours <br> <small
                    class="font-normal text-black italic text-xs">Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio...</small></p>
            <div class="w-full mb-5 flex justify-between">
                <input type="" class="w-1/3 h-10 rounded focus:outline-sky-600 italic p-1 ml-1"
                    placeholder="Rechercher">
                <button class="bg-sky-300 py-1 px-2 text-white border rounded-lg hover:cursor-not-allowed">Ajouter
                    <font-awesome-icon :icon="faPlusCircle" /> </button>
            </div>
            <div class="grid lg:grid-cols-5 gap-5">

                <div class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1"
                    v-for="item in itemsToDisplay" :key="items.code">
                    <p class="text-center">{{ item.label }}</p>
                </div>
            </div>
        </div>
        <!-- recherche -->
    </Layout>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '@/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout.vue';
const items = ref([
    {
        code: "lun",
        label: "Lundi",
    },
    {
        code: "mar",
        label: "Mardi",
    },
    {
        code: "mer",
        label: "Mercredi",
    },
    {
        code: "jeu",
        label: "Jeudi",
    },
    {
        code: "ven",
        label: "Vendredi",
    },
    {
        code: "sam",
        label: "Samedi",
    },
])
const itemsToDisplay = ref([...items.value]);
</script>

<style lang="scss" scoped></style>