<template>
    <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg" @submit.prevent="handleSubmit">
        <p class="text-lg text-sky-600 font-semibold mb-3">Choix de la classe</p>
        <template v-if="loading">
            <div class="flex justify-center items-center my-5">
                <Loader />
            </div>
        </template>
        <template v-else>
            <div class="grid grid-cols-3 gap-3">
                <div class="flex justify-center items-center" v-for="classe in classes" :key="classe.id">
                    <!-- {{ data }} -->
                    <input name="classe" type="radio" :value="classe.id" :id="`classe-${classe.id}`"
                        class="focus:outline-sky-600" v-model="data.classe_id">
                    <label :for="`classe-${classe.id}`" class="lg:font-semibold ml-3">{{ classe.label }} ({{
                        classe.semestres?.map((el) => el.code).join(' & ') }}) </label>
                </div>
                <!-- <div class="flex justify-center items-center">
                    <input name="classe" type="radio" id="L2" class="focus:outline-sky-600">
                    <label for="L2" class="lg:font-semibold ml-3">S3 & S4 (L2)</label>
                    
                </div>
                <div class="flex justify-center items-center">
                    <input name="classe" type="radio" id="L3" class="focus:outline-sky-600">
                    <label for="L3" class="lg:font-semibold ml-3">S5 & S6 (L3)</label>
                </div> -->
            </div>
            <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                <button type="submit" class="lg:w-full lg:text-center text-white">Suivant
                    <font-awesome-icon :icon="faArrowRight" /></button>
            </div>
        </template>

    </form>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTableTimeStore } from '@/stores/timeTableStore';
import { storeToRefs } from 'pinia';
import { useCrudStore } from '@/stores/crudStore';
import { onMounted } from 'vue';
import Loader from '../Loader.vue';
const crudStore = useCrudStore();
const { loading, url, rows: classes } = storeToRefs(crudStore);
const tableTimeStore = useTableTimeStore()
const { currentStep, data } = storeToRefs(tableTimeStore)
url.value = 'years';
onMounted(() => {
    crudStore.index().then((response) => {
        if (response.length > 0)
            data.value.classe_id = response[0].id
    })
})
const handleSubmit = () => {
    currentStep.value = 'filiere'

}
</script>

<style lang="css" scoped></style>