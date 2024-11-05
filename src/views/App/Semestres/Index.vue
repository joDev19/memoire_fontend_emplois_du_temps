<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Les semestres" />
            <div class="w-full mb-5 flex justify-between">
                <input type="" class="w-1/3 h-10 rounded focus:outline-sky-600 italic p-1 ml-1"
                    placeholder="Rechercher">
                <button class="bg-sky-600 py-1 px-2 text-white border rounded-lg" @click="router.push({name: 'semestres-create'})">Ajouter
                    <font-awesome-icon :icon="faPlusCircle" /> </button>
            </div>
            <div class="grid lg:grid-cols-5 gap-5">

                <div class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1"
                    v-for="semestre in semestres" :key="semestre.id">
                    <p class="text-center">{{ semestre.label }} ( {{ semestre.code }} )</p>
                </div>
            </div>
        </div>
        <!-- recherche -->
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import MiniHeader from '@/components/MiniHeader.vue';
import Layout from '../Layout.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
const crudStore = useCrudStore()
const {url, rows: semestres} = storeToRefs(crudStore)
url.value = 'api/semestres'
const items = ref([
    // {
    //     code: "S1",
    //     label: "Semestre 1",
    // },
    // {
    //     code: "S2",
    //     label: "Semestre 2",
    // },
    // {
    //     code: "S3",
    //     label: "Semestre 3",
    // },
    // {Structures algébriques et Leurs applications en informatique
    //     code: "S4",
    //     label: "Semestre 4",
    // },
    // {
    //     code: "S5",
    //     label: "Semestre 5",
    // },
    // {
    //     code: "S6",
    //     label: "Semestre 6",
    // },
])
const itemsToDisplay = ref([...items.value]);
onMounted(() => {
    crudStore.index()
})
</script>

<style lang="scss" scoped></style>