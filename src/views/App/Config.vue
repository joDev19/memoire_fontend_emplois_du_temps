<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Les configurations" description="Configurez les différents aspects de votre application." links="[{label: 'Configuration', link: 'config'}]" />
        
            <div>
                <!-- recherche -->
                <div class="w-1/3 mb-5 ml-1">
                    <input type="" class="w-full h-10 rounded focus:outline-sky-600 italic p-1" placeholder="Rechercher"
                        v-model="searchValue">
                </div>
            </div>
            <div class="grid lg:grid-cols-5 gap-5">
                <div class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col"
                    v-for="item in itemsToDisplay" :key="item" @click="router.push({name: item.routeName})">
                    <FontAwesomeIcon :icon="item.icon" size="3x" :title="item.label" />
                    <p class="text-center">{{ item.label }}</p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCodeBranch, faCalendarPlus, faBookAtlas, faBook, faUsers, faCalendarDays, faClock, faLandmark } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { ref, watch } from 'vue';
import router from '@/router';

const items = ref([
    {
        label: "Filières",
        icon: faCodeBranch,
        routeName: 'filieres-list'
    },
    {
        label: "Semestres",
        icon: faCalendarPlus,
        routeName: 'semestres-list'
    },
    {
        label: "Unités d'enseignement (UEs)",
        icon: faBookAtlas,
        routeName: 'ues-list'
    },
    {
        label: "Matières (ECs)",
        icon: faBook,
        routeName: 'ecs-list'
    },
    {
        label: "Utilisateurs",
        icon: faUsers,
        routeName: 'users-list'
    },
    {
        label: "Jours",
        icon: faCalendarDays,
        routeName: 'days-list'
    },
    {
        label: "Horaires",
        icon: faClock,
        routeName: 'hours-list'
    },
    {
        label: "Classes",
        icon: faLandmark,
        routeName: 'classe-list'
    },
])
const itemsToDisplay = ref([...items.value]);
const searchValue = ref("");
watch(searchValue, (newSearchValue) => {
    if (searchValue.value == "") {
        itemsToDisplay.value = items.value
    } else {
        itemsToDisplay.value = items.value.filter((item) => item.label.toLowerCase().includes(newSearchValue.toLowerCase()))
    }
})
</script>

<style lang="css" scoped></style>