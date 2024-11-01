<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Détail de l'unité d'enseignement" />
            <div class="flex gap-3 justify-end mb-2">
                <button class="p-2 border rounded-lg text-white bg-yellow-500">Modifier</button>
                <button class="p-2 border rounded-lg text-white bg-red-500">Supprimer</button>
            </div>
            <div class="w-full flex gap-2">
                <div class="w-1/2 border-r-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations générales</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p class="pl-10">Code :</p>
                        <p>{{ ue?.code }}</p>
                        <p class="pl-10">Label :</p>
                        <p>{{ ue?.label }}</p>
                        <p class="pl-10">Créer le :</p>
                        <p>{{ ue?.created_at }}</p>
                        <p class="pl-10">Mise à jour le :</p>
                        <p>_</p>
                    </div>
                </div>
                <div class="w-1/2 border-l-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations supplémentaires</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p class="pl-10">Nombre de matières :</p>
                        <p>{{ ue?.ecs.length }}</p>
                        <p class="pl-10">Filière :</p>
                        <p>{{ ue?.filieres.map(filiere => filiere.code).join(', ')}}</p>
                        <p class="pl-10">Semestre :</p>
                        <p>{{ ue?.semestre.label }}</p>
                    </div>
                </div>

            </div>
            <br>
            <div class="w-full">
                <div class="w-full overflow-scroll border-l-slate-100 bg-white rounded shadow p-2 h-96">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Listes des ECs</p>
                    <div class="p-2">
                        <input type="text" class="border w-1/3 h-10 italic p-1 focus:outiline-sky-600 rounded"
                            placeholder="Recchercher par le code">
                    </div>
                    <div class="w-full">
                        <table class="w-full border-collapse border border-red-500" style="width: 100%;">
                            <thead class="">
                                <tr>
                                    <th class="text-justify border p-2">Code</th>
                                    <th class="border text-justify p-2">Label</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ec in ue?.ecs">
                                    <td class="border p-2">
                                        {{ ec.code }}
                                    </td>
                                    <td class="border p-2">
                                        {{ ec.label }}
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
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const crudStore = useCrudStore()
const { url, row: ue } = storeToRefs(crudStore)
url.value = "ues"
const props = defineProps(['id'])
onMounted(() => {
    crudStore.show(props.id);
})
</script>

<style lang="css" scoped></style>