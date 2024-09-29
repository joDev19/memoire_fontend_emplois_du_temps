<template>
    <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg">
        <p class="text-lg text-sky-600 font-semibold mb-3">Choix des filières</p>
        <div class="grid grid-cols-3 gap-3">
            <div class="flex  items-center" v-for="filiere in filieres" :key="filiere.id">
                <!-- {{ filiere }} -->
                <input name="classe" type="checkbox" :id="`filiere-${filiere.id}`" class="focus:outline-sky-600" v-model="data.filieres_id" :value="filiere.id">
                <label :for="`filiere-${filiere.id}`" class="lg:font-semibold ml-3">{{ filiere.label }} ({{ filiere.code }})</label>
            </div>
            <!-- <div class="flex justify-center items-center">
                <input name="classe" type="checkbox" id="SI" class="focus:outline-sky-600">
                <label for="SI" class="lg:font-semibold ml-3">Sécurité informatique</label>
            </div>
            <div class="flex justify-center items-center">
                <input name="classe" type="checkbox" id="IA" class="focus:outline-sky-600">
                <label for="IA" class="lg:font-semibold ml-3">Intelligence artificielle</label>
            </div> -->
        </div>
        <div class="lg:mt-3 lg:h-10 w-full mx-auto  flex justify-around">
            <button type="button" class="lg:bg-sky-600 p-1 w-1/3 border lg:text-center text-white"
                @click="currentStep = 'classe'"><font-awesome-icon :icon="faArrowLeft" /> Précédent
            </button>
            <button type="button" class="lg:text-center lg:bg-sky-600 p-1 w-1/3 text-white"
                @click="currentStep = 'calendar'">Suivant <font-awesome-icon :icon="faArrowRight" /></button>

        </div>
    </form>
</template>

<script setup>
import { useTableTimeStore } from '@/stores/timeTableStore';
import { storeToRefs } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useCrudStore } from '@/stores/crudStore';
import { onMounted } from 'vue';
const crudStore = useCrudStore();
const { loading, url, rows: filieres } = storeToRefs(crudStore);
url.value = "filieres";
const tableTimeStore = useTableTimeStore()
const { currentStep, data } = storeToRefs(tableTimeStore)
onMounted(() => {
    crudStore.index();
})
</script>

<style lang="scss" scoped></style>