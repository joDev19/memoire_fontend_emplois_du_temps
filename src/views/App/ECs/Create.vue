<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Créer une nouvelle matière   " description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
            <div>

                <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg">
                    <div class="lg:mb-3">
                        <label for="code" class="lg:font-semibold lg:block lg:mb-1">Code</label>
                        <input type="text" id="code"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="data.code">
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Label</label>
                        <input type="text" id="label"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="data.label">
                    </div>
                    <div class="lg:mb-3">
                        <label for="semestre" class="lg:font-semibold lg:block lg:mb-1">Unité d'enseignement</label>
                        <select id="semestre" v-model="data.ue"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                            <option v-for="ue in createData.ues" :value="ue.id">{{ ue.label }}</option>
                        </select>
                    </div>
                    <div class="lg:mb-3">
                        <label for="semestre" class="lg:font-semibold lg:block lg:mb-1">Filière concernée</label>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="filiere in createData.filieres"
                                class="flex items-center justify-start gap-2 inline-block">
                                <label :for="`filiere-${filiere.id}`">{{ filiere.label }}</label><input
                                    :id="`filiere-${filiere.id}`" :value="filiere.id" v-model="data.filieres"
                                    type="checkbox">
                            </div>
                        </div>
                    </div>
                    <div class="lg:mb-3 flex gap-2 items-center">
                        <input type="checkbox" name="" v-model="chooseTeacher" id="prof?" class="">
                        <label for="prof?" class="lg:font-semibold">Choisir un enseignant</label>
                    </div>
                    <template v-if="chooseTeacher">
                        <div class="lg:mb-3">
                            <label for="chooseTeacher" class="lg:font-semibold lg:mb-1 lg:block">Choisissez
                                l'enseignant</label>
                            <select name="" v-model="data.enseignant"
                                class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                                id="chooseTeacher">
                                <option v-for="enseignant in createData.enseignants" :value="enseignant.id">{{
                                    enseignant.name }}
                                </option>
                            </select>
                            <RouterLink :to="{name: 'user-create'}" class="text-blue-500 hover:cursor-pointer">Créer un nouvel
                                enseignant</RouterLink>
                        </div>
                    </template>
                    <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                        <button class="lg:w-full lg:text-center text-white">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { useCrudStore } from '@/stores/crudStore';
import client from '@/axiosClient';
import { storeToRefs } from 'pinia';

const crudStore = useCrudStore();
const { loading } = storeToRefs(crudStore)
const chooseTeacher = ref(false);
const createData = ref({})

const data = ref({})
data.value.filieres = []
onMounted(() => {
    loading.value = true;
    client.get('api/ecs/create').then((response) => {
        createData.value = response.data;
    }).finally(() => {
        loading.value = false;
    })
})
</script>

<style lang="css" scoped></style>