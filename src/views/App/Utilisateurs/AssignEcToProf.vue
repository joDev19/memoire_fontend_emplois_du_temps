<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Assignez une matiere à un professeur" />
            <div class="w-2/3 bg-white p-1 rounded-lg mx-auto overflow-auto" style="height: 600px;">
                <p class="text-xl font-semibold mb-3">Choisissez une ou plusieurs matières</p>
                <div class="w-full p-2 flex gap-3">
                    <input type="text" placeholder="Rechercher par code"  class="h-10  border rounded-lg focus:outline-sky-600 p-1 italic">
                    <input type="text" placeholder="Rechercher par nom"  class="h-10 border rounded-lg focus:outline-sky-600 p-1 italic">
                </div>
                <div class="grid grid-cols-3 gap-2 mt-3">
                    <div class="bg-slate-100 p-1 flex gap-1 justify-around rounded" v-for="i in 10" :key="i">
                        <input type="checkbox" name="" class="w-4" id=""> <label for="">Devéloppement web avancé</label>
                    </div>
                </div>
                <div class="float-right mr-5">
                    <button class="p-2 border rounded-lg text-white bg-sky-600">Assigner</button>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
</script>

<style lang="scss" scoped>

</style>