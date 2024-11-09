<template>
    <Layout>
        <div class="p-5">
            Bienvenue Karen HOUEHA.
            <MiniHeader title="Quelle action voulez vous effectuer ?" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
            <div class="grid lg:grid-cols-5 gap-5">
                <div class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col"
                    v-for="item in itemsToDisplay" :key="item" @click="router.push({ name: 'responsable-matiere' })">
                    <FontAwesomeIcon :icon="item.icon" size="3x" :title="item.label" />
                    <p class="text-center">{{ item.label }}</p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Layout from './Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
// import Confirmation from '@/components/Responsable/Confirmation.vue';
import router from '@/router';
import { useResponsableStore } from '@/stores/responsable';
import { useUserStore } from '@/stores/utilisateur';
import { storeToRefs } from 'pinia';
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
watch(user, (newValue) => {
    //console.log(newValue);
    yearId.value = user.value.year_id;
    filiereId.value = user.value.filiere_id;
})
</script>

<style lang="css" scoped></style>