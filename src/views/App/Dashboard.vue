<template>
    <Layout>
        <div class="p-5">
            <!-- Dasboard -->
            <h1 class="text-sky-600 text-lg font-semibold mb-3">Voir les emplois du temps</h1>
            <div class="grid lg:grid-cols-5 gap-5">
                <div v-for="year in years" :key="year.id"
                    class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1"
                    @click="chooseYear(year.id)">
                    <p class="text-center">{{ year.label }} ({{
                        year.semestres?.map((el) => el.code).join(' & ') }})</p>
                </div>
            </div>
            <template v-if="isResponsable(user?.roles)">
                <h1 class="text-sky-600 text-lg font-semibold mb-3">Renseigner les heures de cours</h1>
                <div class="grid lg:grid-cols-5 gap-5">
                    <div class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col"
                        v-for="item in itemsToDisplay" :key="item"
                        @click="router.push({ name: 'responsable-matiere' })">
                        <FontAwesomeIcon :icon="item.icon" size="3x" :title="item.label" />
                        <p class="text-center">{{ item.label }}</p>
                    </div>
                </div>
            </template>
        </div>
    </Layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout.vue';
import { useCrudStore } from '@/stores/crudStore';
import { useShowTableTime } from '@/stores/showTableTime';
import { notify } from '@kyvg/vue3-notification';
import { useResponsableStore } from '@/stores/responsable';
import { useUserStore } from '@/stores/utilisateur';
notify({
    text: "Content de vous revoir",
    type: "success"
})
import { onMounted } from 'vue';
import router from '@/router';
import { isResponsable } from '@/helpers/helper';
const responsableStore = useResponsableStore()
const { filiereId, yearId } = storeToRefs(responsableStore)
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const itemsToDisplay = ref([
    {
        label: "Renseigner des stats",
        icon: faChartLine,
        // routeName: 'filieres-list'
    },
])
yearId.value = user.value.year_id;
filiereId.value = user.value.filiere_id;
watch(user, (newValue) => {
    console.log(newValue);
    yearId.value = user.value.year_id;
    filiereId.value = user.value.filiere_id;
})
const crudStore = useCrudStore()
const showTableTimeStore = useShowTableTime()
const { year_id } = storeToRefs(showTableTimeStore)
const { url, rows: years } = storeToRefs(crudStore)
url.value = "api/years"
const chooseYear = (id) => {
    year_id.value = id
    router.push({ name: 'choose-week' })
}
onMounted(() => {
    crudStore.index().then((data) => {
        //console.log(data);
    })
})
</script>

<style lang="css" scoped></style>