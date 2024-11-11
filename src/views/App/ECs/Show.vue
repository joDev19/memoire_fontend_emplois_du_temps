<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Détail de la matière" />
            <div class="flex gap-3 justify-end mb-2">
                <button class="p-2 border rounded-lg text-white bg-yellow-500">Modifier</button>
                <button class="p-2 border rounded-lg text-white bg-red-500">Supprimer</button>
            </div>
            <div class="w-full">
                <template v-if="loading">
                    <div class="flex justify-center items-center">
                        <Loader />
                    </div>
                </template>
                <template v-else>
                    <div class="w-full border-r-slate-100 bg-white rounded shadow p-2">
                        <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations générales</p>
                        <div class="grid grid-cols-2 text-lg">
                            <p class="pl-10">Code :</p>
                            <p>{{ ec?.code }}</p>
                            <p class="pl-10">Label :</p>
                            <p>{{ ec?.label }}</p>
                            <p class="pl-10">Masse horaire totale :</p>
                            <p>{{ ec?.masse_horaire }}h</p>
                            <p class="pl-10">Masse horaire restante :</p>
                            <p>{{ ec?.masse_horaire_restante }}h</p>
                            <p class="pl-10">Créer le :</p>
                            <p>{{ ec?.created_at }}</p>
                            <p class="pl-10">Mise à jour le :</p>
                            <p>_</p>
                        </div>
                    </div>
                    <br>
                    <div class="w-full border-l-slate-100 bg-white rounded shadow p-2">
                        <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations supplémentaires</p>
                        <div class="grid grid-cols-2 text-lg">
                            <p class="pl-10">Professeur :</p>
                            <p>{{ ec?.professeur }}</p>
                            <p class="pl-10">UE :</p>
                            <p>{{ ec?.ue?.label }}</p>
                            <p class="pl-10">Filières :</p>
                            <p>{{ ec?.filieres.map(filiere => filiere.code).join(', ') }}</p>
                            <p class="pl-10">Semestre :</p>
                            <p>{{ ec?.semestre.label }}</p>
                        </div>
                    </div>
                </template>


            </div>

        </div>
    </Layout>
</template>

<script setup>
import { onMounted } from 'vue';
import Layout from '../Layout.vue';
import { useCrudStore } from '@/stores/crudStore';
const crudStore = useCrudStore()
import Loader from '@/components/Loader.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { storeToRefs } from 'pinia';
const props = defineProps(['id'])
const { loading, row: ec, url } = storeToRefs(crudStore);
url.value = 'api/ecs'
onMounted(() => {
    crudStore.show(props.id)
    // console.log(ec.value)
})
</script>

<style lang="css" scoped></style>