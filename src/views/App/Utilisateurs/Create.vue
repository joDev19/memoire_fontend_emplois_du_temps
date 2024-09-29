<template>
    <Layout>
        <div class="p-5">
            <MiniHeader :title="'Créer un nouvel utilisateur (' + typeOfUser + ')'" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
            <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg">
                <div class="lg:mb-3">
                    <p class="text-center text-xl mb-2">Type d'utilisateur</p>
                    <div class="flex justify-center gap-5">
                        <div>
                            <input name="typeOfUser" type="radio" id="coordinateur" value="coordinateur"
                                v-model="typeOfUser"> <label for="coordinateur"
                                class="hover:cursor-pointer">Coordinateur</label>
                        </div>
                        <div>
                            <input name="typeOfUser" type="radio" id="responsable" value="responsable"
                                v-model="typeOfUser">
                            <label for="responsable" class="hover:cursor-pointer">Responsable</label>
                        </div>
                    </div>
                </div>
                <div class="lg:mb-3">
                    <label for="label" class="lg:font-semibold lg:block lg:mb-1">Nom & Prénoms</label>
                    <input type="text" id="label"
                        class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                </div>
                <div class="lg:mb-3">
                    <label for="label" class="lg:font-semibold lg:block lg:mb-1">Email</label>
                    <input type="email" id="label"
                        class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                </div>
                <div class="lg:mb-3" v-if="typeOfUser == 'responsable'">
                    <label for="label" class="lg:font-semibold lg:block lg:mb-1">Numéro matricule</label>
                    <input type="text" id="label"
                        class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                </div>
                <div class="lg:mb-3">
                    <label for="label" class="lg:font-semibold lg:block lg:mb-1">Téléphone</label>
                    <input type="tel" id="label" pattern="\+229-[0-9]{8}" placeholder="+229-XXXXXXXX"
                        class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                </div>
                <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">/
                    <button class="lg:w-full lg:text-center text-white">Ajouter</button>
                </div>

            </form>
        </div>

    </Layout>
</template>

<script setup>
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { useUserStore } from '@/stores/utilisateur';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import HorizontalStepper from 'vue-stepper';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const userStore = useUserStore();
const { typeOfUser } = storeToRefs(userStore)
const steps = ref(2)
const currentStep = ref(0)
const prev = () => {
    if (currentStep.value > 0)
        currentStep.value--

}
const next = () => {
    if (currentStep.value < steps.value)
        currentStep.value++
}
</script>

<style lang="css" scoped></style>