<template>
    <Layout>
        <div class="p-5">
            <p class="font-semibold text-xl text-sky-600 mb-5">Les filières disponibles <br> <small
                    class="font-normal text-black italic text-xs">Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio...</small></p>
            <div class="w-full mb-5 flex justify-between">
                <input type="" class="w-1/3 h-10 rounded focus:outline-sky-600 italic p-1 ml-1"
                    placeholder="Rechercher">
                <button class="bg-sky-600 py-1 px-2 text-white border rounded-lg"
                    @click="router.push({ name: 'filieres-create' })">Ajouter <font-awesome-icon :icon="faPlusCircle" />
                </button>
            </div>
            <template v-if="loading">
                <div class="flex justify-center items-center my-5">
                    <Loader />
                </div>
            </template>
            <template v-else>
                <div class="grid lg:grid-cols-5 gap-5">
                    <router-link v-for="filiere in filieres" :key="items.id" :to="{ name: 'filiere-show', params: { id: filiere.id } }"
                        class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                        <p class="text-center">{{ filiere.label }} ( {{ filiere.code }} )</p>
                    </router-link>
                </div>
            </template>
        </div>
        <!-- recherche -->
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '@/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout.vue';
import { useCrudStore } from '@/stores/crudStore';
import Loader from '@/components/Loader.vue';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const { url, rows: filieres, loading } = storeToRefs(crudStore)
url.value = "api/filieres"
const items = ref([
    {
        code: "GL",
        label: "Génie Logiciel",
    },
    {
        code: "SI",
        label: "Sécurité Informatique",
    },
    {
        code: "IM",
        label: "Internet et Multimédia",
    },
    {
        code: "IA",
        label: "Intelligence artificiel",
    },
])
const itemsToDisplay = ref([...items.value]);
onMounted(() => {
    crudStore.index();
})
</script>

<style lang="scss" scoped></style>