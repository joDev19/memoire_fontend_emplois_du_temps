<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Détail de la filiere" />
            <div class="flex gap-3 justify-end mb-2">
                <button class="p-2 border rounded-lg text-white bg-yellow-500">Modifier</button>
                <button class="p-2 border rounded-lg text-white bg-red-500">Supprimer</button>
            </div>
            <div class="w-full flex gap-2">
                <div class="w-2/5 border-r-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations générales</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p class="pl-10">Code :</p>
                        <p>{{ filiere?.code }}</p>
                        <p class="pl-10">Label :</p>
                        <p>{{ filiere?.label }}</p>
                        <p class="pl-10">Créer le :</p>
                        <p>{{ filiere?.created_at }}</p>
                        <p class="pl-10">Mise à jour le :</p>
                        <p>_</p>
                    </div>
                </div>
                <div class="w-3/5 border-l-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations supplémentaires</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p class="pl-10">Nombre d'UEs :</p>
                        <p>{{ filiere?.ues.length }}</p>
                        <p class="pl-10">Nombre d'ECs' :</p>
                        <p>{{ filiere?.ecs.length }}</p>
                    </div>
                </div>

            </div>
            <br>
            <div class="w-full">
                <div class="w-full overflow-scroll border-l-slate-100 bg-white rounded shadow p-2 h-96">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Listes des UEs</p>
                    <div class="p-2">
                        <input type="text" class="border w-1/3 h-10 italic p-1 focus:outiline-sky-600 rounded"
                            placeholder="Recchercher par le code">
                    </div>
                    <div class="w-full">filiere
                        <table class="w-full border-collapse border border-red-500" style="width: 100%;">
                            <thead class="">
                                <tr>
                                    <th class="text-justify border p-2">Code</th>
                                    <th class="border text-justify p-2">Label</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in 17">
                                    <td class="border p-2">
                                        MTH1 321
                                    </td>
                                    <td class="border p-2">
                                        Structures algébriques et Leurs applications en informatique
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import Loader from '@/components/Loader.vue';
import { storeToRefs } from 'pinia';
import { useCrudStore } from '@/stores/crudStore';
import { onMounted } from 'vue';
const crudStore = useCrudStore()
const { url, row: filiere, loading } = storeToRefs(crudStore)
url.value = "filieres"
const props = defineProps(['id']);
onMounted(() => {
    crudStore.show(props.id).then((data) => console.log(data))
})
</script>

<style lang="css" scoped></style>