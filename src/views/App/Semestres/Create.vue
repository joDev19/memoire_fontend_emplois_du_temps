<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Créer un nouveau semestre" description="" />
            <div>
                <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg" @submit.prevent="createSemester">

                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Label</label>
                        <input type="text" v-model="semester.label" id="label"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3">
                        <label for="code" class="lg:font-semibold lg:block lg:mb-1">Code</label>
                        <input type="text" v-model="semester.code" id="code"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3" v-if="!loading">
                        <label for="semestre" class="lg:font-semibold lg:block lg:mb-1">Année</label>
                        <select v-model="semester.year_id" id="semestre"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                            <option v-for="year in createData?.years" :value="year.id">{{ year.label }}</option>
                        </select>
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
import { onMounted, ref } from 'vue';
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import router from '@/router';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore();
const { url, loading, createData } = storeToRefs(crudStore);
url.value = "api/semestres";
crudStore.create();
const semester = ref({});
onMounted(() => {
    //crudStore.index();
})
const createSemester = () => {
    crudStore.store(semester.value).then((response) => {
        router.push({ name: "semestres-list" });
    });
}
</script>

<style lang="css" scoped></style>