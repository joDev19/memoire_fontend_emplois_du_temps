<template>
    <Layout>
        <div class="p-5">
            Dasboard
            <h1 class="text-sky-600 text-lg font-semibold mb-3">Voir les emplois du temps</h1>
            <div class="grid lg:grid-cols-5 gap-5">
                <div v-for="year in years" :key="year.id"
                    class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1" @click="chooseYear(year.id)">
                    <p class="text-center">{{ year.label }} ({{
                        year.semestres?.map((el) => el.code).join(' & ') }})</p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Layout from './Layout.vue';
import { useCrudStore } from '@/stores/crudStore';
import { useShowTableTime } from '@/stores/showTableTime';
import { onMounted } from 'vue';
import router from '@/router';
const crudStore = useCrudStore()
const showTableTimeStore = useShowTableTime()
const {year_id} = storeToRefs(showTableTimeStore)
const {url, rows: years} = storeToRefs(crudStore)
url.value = "years"
const chooseYear = (id) => {
    year_id.value = id
    router.push({name: 'choose-week'})
}
onMounted(()=>{
    crudStore.index().then((data)=>{
        console.log(data);
    })
})
</script>

<style lang="css" scoped></style>