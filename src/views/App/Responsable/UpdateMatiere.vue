<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Mettre à jour la masse horaire de la matière" />
            <div class="flex gap-3 justify-end mb-2">
                <button class="p-2 border rounded-lg text-white bg-yellow-500">Modifier</button>
                <!-- <button class="p-2 border rounded-lg text-white bg-red-500">Supprimer</button> -->
            </div>
            <div class="w-full">
                <div class="w-full border-r-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations générales</p>
                    <template v-if="loading">
                        <div class="flex justify-center items-center my-5">
                            <Loader />
                        </div>
                    </template>
                    <template v-else>
                        <div class="grid grid-cols-2 text-lg">
                            <p class="pl-10">Code :</p>
                            <p>{{ ec?.code }}</p>
                            <p class="pl-10">Label :</p>
                            <p>{{ ec?.label }}</p>
                            <p class="pl-10">Masse horaire totale :</p>
                            <p>{{ ec?.masse_horaire }}h</p>
                            <p class="pl-10">Masse horaire restante :</p>
                            <p>{{ ec?.remaining_hour }}h</p>
                            <!-- <p class="pl-10">Créer le :</p>
                            <p>02/01/2003</p>
                            <p class="pl-10">Mise à jour le :</p>
                            <p>_</p> -->
                        </div>
                    </template>
                </div>
                <br>
                <div class="w-full border-l-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Modification</p>
                    <form action="">
                        <div class="lg:mb-3">
                            <label for="date" class="lg:font-semibold lg:block lg:mb-1">Date du cours</label>
                            <input id="date" type="date" v-model="currentDate"
                                class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600" />
                        </div>
                        <div class="lg:mb-3">
                            <label for="number" class="lg:font-semibold lg:block lg:mb-1">Nombre d'heure</label>
                            <input id="hours" type="number" min="1"
                                class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600" v-model="nbr_hour" />
                        </div>
                        <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                            <button type="button" class="lg:w-full lg:text-center text-white" @click="storeEcDone">Sauvegarder</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { dateFormatter } from '@/helpers/helper';
import { ref } from 'vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Loader from '@/components/Loader.vue';
import client from '@/axiosClient';
import router from '@/router';
import { notify } from '@kyvg/vue3-notification';
const crudStore = useCrudStore()
const { url, row: ec, loading } = storeToRefs(crudStore)
const props = defineProps(['ecId'])
// const currentDate = ref(Date.now().toLocaleString())
const currentDate = ref(`${dateFormatter(new Date().getFullYear())}-${dateFormatter(((new Date().getMonth()) + 1))}-${dateFormatter(new Date().getDate())}`)
console.log(currentDate.value)
const nbr_hour = ref(4)
const storeEcDone = () => {
    const data = {
        ec_id: ec.value.id,
        day: currentDate.value,
        nbr_hour: nbr_hour.value
    }
    // console.log(data)
   client.post('api/ec-dones', data).then(()=>{
    notify({
        text: "Masse horaire mis à jour avec succès",
        type: "success",
    })
    router.push({name: 'responsable-matiere'})
   })
}
onMounted(() => {
    
    url.value = "api/ecs"
    crudStore.show(props.ecId)
})
</script>

<style lang="css" scoped></style>