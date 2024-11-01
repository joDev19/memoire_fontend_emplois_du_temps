<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Créer une nouvelle salle de classe" />
            <div>
                <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg" @submit.prevent="handleSubmit">
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Label</label>
                        <input type="text" v-model="classe.label" id="label" class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3">
                        <label for="capacity" class="lg:font-semibold lg:block lg:mb-1">Capacité maximale</label>
                        <input type="number" v-model="classe.max_capacity" id="capacity" class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                        <button class="lg:w-full lg:text-center text-white">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
const crudStore = useCrudStore();
const {url} = storeToRefs(crudStore)
url.value = "classes"
import { ref } from 'vue';
const classe = ref({})
const handleSubmit = () => {
    crudStore.store(classe.value).then(() =>{
        router.push({name: 'classe-list'})
    })
}
</script>

<style lang="css" scoped></style>