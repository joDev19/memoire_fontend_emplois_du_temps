<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Détail de l'utilisateur" />
            <div class="flex gap-3 justify-end mb-2">
                <router-link :to="{name: 'assign-ec'}" class="p-2 border rounded-lg text-white bg-sky-600">Assigner une matière</router-link>
                <button class="p-2 border rounded-lg text-white bg-yellow-500">Modifier</button>
                <button class="p-2 border rounded-lg text-white bg-red-500">Supprimer</button>
            </div>
            <div class="w-full flex gap-2">
                <div class="w-1/2 border-r-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations générales</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p class="pl-10">Numéro matricule :</p>
                        <p>18525256</p>
                        <p class="pl-10">Nom & prénoms :</p>
                        <p>GNANIH Jordy</p>
                        <p class="pl-10">Email :</p>
                        <p class="">jordygnanih@gmail.com</p>
                        <p class="pl-10">Rôle :</p>
                        <p class="">Responsable</p>
                        <p class="pl-10">Téléphone :</p>
                        <p class="">+229 66686153</p>
                        <p class="pl-10">Créer le :</p>
                        <p>02/01/2003</p>
                        <p class="pl-10">Mise à jour le :</p>
                        <p>_</p>
                    </div>
                </div>
                <div class="w-1/2 border-l-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations supplémentaires</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p> ------ si c'est un professeurs</p>
                        <p></p>
                        <p class="pl-10">Nombre de matières :</p>
                        <p>3</p>
                        <p> ------ si c'est un etudiant</p>
                        <p></p>
                        <p class="pl-10">Semestres :</p>
                        <p>S1 - S2</p>
                        <p class="pl-10">Filière :</p>
                        <p>GL</p>
                        <p class="pl-10">Dernière connexion :</p>
                        <p>Jeudi 22 août à 19:00</p>

                    </div>
                </div>

            </div>
            <br>
            <div class="w-full">
                <div class="w-full overflow-auto border-l-slate-100 bg-white rounded shadow p-2 h-96">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Listes des matières (enseignés par le professeur)</p>
                    <div class="p-2 flex gap-2">
                        <input type="text" class="border w-1/3 h-10 italic p-1 focus:outiline-sky-600 rounded" placeholder="Recchercher par le code">
                        <input type="text" class="border w-1/3 h-10 italic p-1 focus:outiline-sky-600 rounded" placeholder="Recchercher par le nom">
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
                                <tr v-for="i in 3">
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
import { RouterLink } from 'vue-router';
import MiniHeader from '@/components/MiniHeader.vue';
</script>

<style lang="css" scoped></style>