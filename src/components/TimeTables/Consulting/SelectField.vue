<template>
    <div class="flex justify-start gap-3 mb-2 h-12">
        <!-- {{ filiere_id }} {{ week_id }} {{ year_id }} -->
        <select name="" v-model="filiere_id" id="">

            <option :value="null">Toutes les filieres</option>
            <option v-for="filiere in filieres" :key="filiere.id" :value="filiere.id">{{ filiere.label }}</option>
        </select>
        <button class="p-2 rounded-lg bg-sky-600 text-white" @click="forward" v-if="isCoordonateur(user?.roles)">Partager</button>
    </div>
</template>

<script setup>
import client from '@/axiosClient';
import { onMounted, ref, watch } from 'vue';
import { useShowTableTime } from '@/stores/showTableTime';
import { useTableTimeStore } from '@/stores/timeTableStore';
const { dataToShow, events } = storeToRefs(useTableTimeStore())
const { loading } = storeToRefs(useCrudStore())
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const showTableTime = useShowTableTime();
const { filiere_id, year_id, week_id } = storeToRefs(showTableTime)
import { useUserStore } from '@/stores/utilisateur';
import { isCoordonateur } from '@/helpers/helper';
const userStore = useUserStore();
const {user} = storeToRefs(userStore);

const filieres = ref([])
onMounted(() => {
    client.get('api/filieres').then((response) => {
        filieres.value = response.data;
    }).catch(() => {
        alert('une erreur s\'est produite')
    })
})
watch(filiere_id, (newFiliereId) => {
    loading.value = true
    client.get(`api/timetables/year/${year_id.value}/week/${week_id.value}`, {
        params: {
            'filiere_id': newFiliereId
        }
    }).then((response) => {
        dataToShow.value = response.data;
        events.value = dataToShow.value.courses
    }).finally(() => {
        loading.value = false;
    })
})
const forward = () => {
    // console.log(year_id.value, filiere_id.value, week_id.value)
    client.get(`api/timetables/forward/year/${year_id.value}/week/${week_id.value}/filiere/${filiere_id.value}`).then((response) => {
        // console.log(response.data)
    })
}
</script>

<style lang="css" scoped></style>