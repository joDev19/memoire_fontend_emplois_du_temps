<template>
    <Layout>
        <div class="p-5">
            <MiniHeader :title="'Créer un nouvel utilisateur ( ' + user.roles_id + ' )'" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />

            <template v-if="loading">
                <Loader />
            </template>
            <template v-else>
                <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg" @submit.prevent="createUser">
                    <div class="lg:mb-3">
                        <p class="text-center text-xl mb-2">Type d'utilisateur</p>
                        <div class="flex justify-center gap-5">
                            <div v-for="role in createData.roles">
                                <input name="role" type="checkbox" :id="`role_${role.id}`" :value="role.id"
                                    v-model="user.roles_id"> <label :for="`role_${role.id}`"
                                    class="hover:cursor-pointer">{{ role.label }}</label>
                            </div>
                            <!-- <div>
                                <input name="role" type="radio" id="responsable" value="responsable"
                                    v-model="role">
                                <label for="responsable" class="hover:cursor-pointer">Responsable</label>
                            </div> -->
                        </div>
                    </div>
                    <div class="lg:mb-3">
                        <label for="name" class="lg:font-semibold lg:block lg:mb-1">Nom & Prénoms</label>
                        <input type="text" id="name" v-model="user.name"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3">
                        <label for="email" class="lg:font-semibold lg:block lg:mb-1">Email</label>
                        <input type="email" id="email" v-model="user.email"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3"
                        v-if="user.roles_id?.find(id => id == createData.roles?.find(role => role.label == 'responsable').id) != undefined">
                        <label for="matricule" class="lg:font-semibold lg:block lg:mb-1">Numéro matricule</label>
                        <input type="text" id="matricule" v-model="user.matricule"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3"
                        v-if="user.roles_id?.find(id => id == createData.roles?.find(role => role.label == 'responsable').id) != undefined">
                        <label for="filiere" class="lg:font-semibold lg:block lg:mb-1">Filière</label>
                        <select id="filiere" v-model="user.filiere_id"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                            <option v-for="filiere in createData.filieres" :value="filiere.id" :key="filiere.id">
                                {{ filiere.label }} ({{ filiere.code }})</option>
                        </select>
                    </div>
                    <div class="lg:mb-3"
                        v-if="user.roles_id?.find(id => id == createData.roles?.find(role => role.label == 'responsable').id) != undefined">
                        <label for="year" class="lg:font-semibold lg:block lg:mb-1">Year</label>
                        <select id="year" v-model="user.year_id"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                            <option v-for="year in createData.years" :value="year.id" :key="year.id">{{ year.label
                                }} ({{
                                    year.semestres?.map((el) => el.code).join(' & ') }})</option>
                        </select>
                    </div>
                    <div class="lg:mb-3">
                        <label for="telephone" class="lg:font-semibold lg:block lg:mb-1">Téléphone</label>
                        <input type="tel" v-model="user.telephone" id="telephone" pattern="\+229-[0-9]{8}"
                            placeholder="+229-XXXXXXXX"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3">
                        <label for="password" class="lg:font-semibold lg:block lg:mb-1">Password</label>
                        <input type="password" id="password" v-model="user.password" autocomplete="autocomplete"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                        <button class="lg:w-full lg:text-center text-white">Ajouter</button>
                    </div>

                </form>
            </template>

        </div>

    </Layout>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { useUserStore } from '@/stores/utilisateur';
import Loader from '@/components/Loader.vue';
import router from '@/router';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import HorizontalStepper from 'vue-stepper';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import { useCrudStore } from '@/stores/crudStore';
const crudStore = useCrudStore()
const { url, loading, createData } = storeToRefs(crudStore)
const userStore = useUserStore();
// const { user } = storeToRefs(userStore)
const user = ref({})
const createUser = () => {
    // console.log()

    crudStore.store(user.value).then(() => {
        router.push({ name: 'users-list' })
    })
}
url.value = "api/users"
onMounted(() => {
    user.value.roles_id = [];
    crudStore.create().then(() => console.log('request ok')).catch(() => console.log('request failed'))
})
onUnmounted(() => {
    user.value = {}
})
</script>

<style lang="css" scoped></style>