<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Détail de la matière" />
            <div class="flex gap-3 justify-end mb-2">
                <button class="p-2 border rounded-lg text-white bg-yellow-500">Modifier</button>
                <button class="p-2 border rounded-lg text-white bg-red-500">Supprimer</button>
            </div>
            <div class="w-full">
                <div class="w-full border-r-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations générales</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p class="pl-10">Code :</p>
                        <p>MTH1321</p>
                        <p class="pl-10">Label :</p>
                        <p>Structures algébriques et Leurs applications en informatique</p>
                        <p class="pl-10">Masse horaire totale :</p>
                        <p>50h</p>
                        <p class="pl-10">Masse horaire restante :</p>
                        <p>25h</p>
                        <p class="pl-10">Créer le :</p>
                        <p>02/01/2003</p>
                        <p class="pl-10">Mise à jour le :</p>
                        <p>_</p>
                    </div>
                </div>
                <br>
                <div class="w-full border-l-slate-100 bg-white rounded shadow p-2">
                    <p class="font-semibold text-lg mt-3 ml-5 mb-5 text-sky-600">Informations supplémentaires</p>
                    <div class="grid grid-cols-2 text-lg">
                        <p class="pl-10">Professeur :</p>
                        <p>Jordy GNANIH</p>
                        <p class="pl-10">UE :</p>
                        <p>Aspect avancée des technologies web</p>
                        <p class="pl-10">Filière :</p>
                        <p>Génie logiciel</p>
                        <p class="pl-10">Semestre :</p>
                        <p>Semestre 1</p>
                    </div>
                </div>

            </div>
           
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
</script>

<style lang="css" scoped></style>