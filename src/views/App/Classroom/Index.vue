<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Listes des classes" />
            <div class="w-full mb-5 flex justify-between">
                <input type="" class="w-1/3 h-10 rounded focus:outline-sky-600 italic p-1 ml-1"
                    placeholder="Rechercher">
                <RouterLink :to="{ name: 'classe-create' }">
                    <button class="bg-sky-600 py-1 px-2 text-white border rounded-lg ">Ajouter
                        <font-awesome-icon :icon="faPlusCircle" /> </button>
                </RouterLink>
            </div>
            <div class="grid lg:grid-cols-5 gap-5">

                <div class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1"
                    v-for="classe in classes" :key="classe.id">
                    <p class="text-center">{{ classe.label }}</p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../Layout.vue';
import { RouterLink } from 'vue-router';
import MiniHeader from '@/components/MiniHeader.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const {url, rows: classes} = storeToRefs(crudStore)
url.value = 'classes'

const items = ref([
    // {
    //     id: 1,
    //     label: "PADTICE",
    //     capacity: 60,
    // },
    // {
    //     id: 2,
    //     label: "IRAN 2",
    //     capacity: 150,
    // }
])
const itemsToDisplay = ref([...items.value])
onMounted(() => {
    crudStore.index()
})
</script>

<style lang="css" scoped></style>