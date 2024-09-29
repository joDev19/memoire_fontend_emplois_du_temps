<template>
    <VueFinalModal @closed="modalIsOpen = false" class="flex flex-col justify-center items-center"
        content-class="p-3 rounded-lg w-1/2 bg-white">
        <div class="">
            <p class="text-sky-600 font-semibold text-lg mb-3">Renseignez les stats</p>
            <form action="" class="text-black">
                
                <div class="lg:mb-3">
                    <label for="label" class="lg:font-semibold lg:block lg:mb-1">Confirmez la filière</label>
                    <div class="grid grid-cols-3 gap-3">
                        <div class="flex justify-center items-center">
                            <input type="checkbox" id="GL"
                                class="focus:outline-sky-600">
                            <label for="GL" class="lg:font-semibold ml-3">Génie Logiciel</label>
                        </div>
                        <div class="flex justify-center items-center">
                            <input type="checkbox" id="SI"
                                class="focus:outline-sky-600">
                            <label for="SI" class="lg:font-semibold ml-3">Sécurité informatique</label>
                        </div>
                        <div class="flex justify-center items-center">
                            <input type="checkbox" id="IA"
                                class="focus:outline-sky-600">
                            <label for="IA" class="lg:font-semibold ml-3">Intelligence artificielle</label>
                        </div>
                    </div>
                </div>

                <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                    <button type="button" class="lg:w-full lg:text-center text-white" @click="chooseEc">Continuer</button>
                </div>
            </form>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { useResponsableStore } from '@/stores/responsable';
import { storeToRefs } from 'pinia';
import router from '@/router';
const responsableStore = useResponsableStore()
const { modalIsOpen } = storeToRefs(responsableStore)

const chooseEc = () => {
    modalIsOpen.value = false;
    router.push({name: 'responsable-matiere'})

}
</script>

<style lang="css" scoped></style>