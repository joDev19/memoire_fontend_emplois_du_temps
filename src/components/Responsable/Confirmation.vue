<template>
    <VueFinalModal @closed="modalIsOpen = false" class="flex flex-col justify-center items-center"
        content-class="p-3 rounded-lg w-1/2 bg-white">
        <div class="">
            <p class="text-sky-600 font-semibold text-lg mb-3">Renseignez les stats</p>
            <form action="" class="text-black">

                <div class="lg:mb-3">
                    <template v-if="loading">
                        <div class="flex justify-center items-center my-5">
                            <Loader />
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="step == 'annee'">
                            <label for="label" class="lg:font-semibold lg:block lg:mb-1">Confirmez l'année</label>
                            <div class="grid grid-cols-3 gap-3">
                                <div class="flex justify-start items-center" v-for="year in rows" :key="year.id">
                                    <input type="radio" name="year" :id="`year-${year.id}`" v-model="yearId"
                                        class="focus:outline-sky-600" :value="year.id">
                                    <label :for="`year-${year.id}`" class="lg:font-semibold ml-3">{{ year.label
                                        }}</label>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <label for="label" class="lg:font-semibold lg:block lg:mb-1">Confirmez la filière</label>
                            <div class="grid grid-cols-3 gap-3">
                                <div class="flex justify-start items-center" v-for="filiere in rows" :key="filiere.id">
                                    <input type="radio" name="filiere" :id="`filiere-${filiere.id}`" v-model="filiereId"
                                        class="focus:outline-sky-600" :value="filiere.id">
                                    <label :for="`filiere-${filiere.id}`" class="lg:font-semibold ml-3">{{ filiere.label
                                        }}</label>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>

                <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                    <button type="button" class="lg:w-full lg:text-center text-white"
                        @click="chooseEc">Continuer</button>
                </div>
            </form>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { useResponsableStore } from '@/stores/responsable';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { onMounted, ref } from 'vue';
import Loader from '../Loader.vue';
const step = ref("annee");
const crudStore = useCrudStore();
const { url, rows, loading } = storeToRefs(crudStore)
const responsableStore = useResponsableStore()
const { modalIsOpen, filiereId, yearId } = storeToRefs(responsableStore)
url.value = 'years'
const chooseEc = () => {
    if (step.value == "annee") {
        step.value = "filiere"
        url.value = "filieres"
        crudStore.index().then(() => {
            filiereId.value = rows.value[2].id
        });
    } else {
        modalIsOpen.value = false;
        router.push({ name: 'responsable-matiere' })
    }

}
onMounted(() => {
    crudStore.index().then(() => {
        yearId.value = rows.value[1].id
    });
})
</script>

<style lang="css" scoped></style>