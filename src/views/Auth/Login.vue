<template>
    <Layout>
        <div class="lg:border lg:rounded-lg p-5 bg-white text-black">
            <div class="">
                <p class="lg:text-xl lg:text-justify">Gérez vos emplois du temps</p>
            </div>
            <form action="" class="mt-5" @submit="router.push({name: 'dashboard'})">
                <div class="lg:mb-3 w-2/3 mx-auto">
                    <p class="text-center text-xl mb-2">Type d'utilisateur</p>
                    <div class="flex justify-around">
                        <div>
                            <input name="typeOfUser" type="radio" id="coordinateur" value="coordinateur" v-model="typeOfUser"> <label for="coordinateur" class="hover:cursor-pointer">Coordinateur</label>
                        </div>
                        <div>
                            <input name="typeOfUser" type="radio" id="responsable" value="responsable" v-model="typeOfUser"> <label for="responsable" class="hover:cursor-pointer">Responsable</label>
                        </div>
                    </div>
                </div>
                <div class="lg:mb-3" v-if="typeOfUser == 'coordinateur'">
                    <label for="email" class="lg:font-semibold lg:block lg:mb-1">Adresse email</label>
                    <input type="email" id="email" class="lg:border lg:rounded lg:w-full lg:h-10 lg:p-2 focus:outline-sky-600">
                </div>
                <div class="lg:mb-3" v-if="typeOfUser == 'responsable'">
                    <label for="numeroMatricule" class="lg:font-semibold lg:block lg:mb-1">Numéro matricule</label>
                    <input type="text" id="numeroMatricule" class="lg:border lg:rounded lg:w-full lg:h-10 lg:p-2 focus:outline-sky-600">
                </div>
                <div class="lg:mb-3">
                    <label for="password" class="lg:font-semibold lg:block lg:mb-1">Mot de passe</label>
                    <input type="password" id="password" class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    <p class="lg:text-sm lg:text-sky-600">Mot de passe oublié</p>
                </div>
                <div class="lg:mt-3 lg:h-10 lg:bg-sky-600 lg:flex hover:bg-sky-700">
                    <button class="lg:w-full lg:text-center text-white">Se connecter</button>
                </div>
            </form>
            <p class="mt-5 text-italic">Vous n'avez pas de compte ? Veuillez contacter le coordinateur.</p>
        </div>
    </Layout>
</template>

<script setup>
import router from "@/router";
import Layout from "@/views/Auth/Layout.vue"
import { ref } from "vue";
const typeOfUser = ref("coordinateur")
</script>

<style lang="css" scoped></style>