<template>
    <Layout>
        <div class="p-5">
            <Transition v-if="showBanner" appear name="notif">
                <div class="bg-orange-300 p-2 text-white font-bold text-lg rounded-lg">Vous devez créer l'emplois du
                    temps de la semaine prochaine</div>
            </Transition>
            <!-- Dasboard -->
            <h1 class="text-sky-600 text-lg font-semibold mb-3">Voir les emplois du temps</h1>
            <div class="grid lg:grid-cols-5 gap-5">
                <TransitionGroup name="list">
                    <div v-for="year in years" :key="year.id"
                        class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1"
                        @click="chooseYear(year.id)">
                        <p class="text-center">{{ year.label }} ({{
                            year.semestres?.map((el) => el.code).join(' & ') }})</p>
                    </div>
                </TransitionGroup>
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

            <h1 class="text-sky-600 text-lg font-semibold mb-3">Voir les statistiques</h1>
            <div class="stats.userTypes mb-5">
                <h2 class="ml-5 text-sky-400 font-semibold mb-3">Utilisateurs</h2>
                <div class="flex items-center">
                    <div class="flex gap-5  w-2/3 h-full" v-if="statsData.nbrCoordonnateur">
                        <div v-for="userType in stats.userTypes" :key="userType.id"
                            class="h-24 w-1/3 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                            <p class="text-center">
                                {{ userType.label }} <br>
                                <strong class="text-sky-600">{{ userType.count }}</strong>
                            </p>
                        </div>
                    </div>
                    <div style="width: 300px;" class=""><canvas id="userGraph"></canvas></div>
                </div>
            </div>
            <div class="stats.salles mb-5">
                <h2 class="ml-5 text-sky-400 font-semibold mb-3">Autres...</h2>
                <!-- graphique salle de classe | graphique de filières -->
                <div class="grid lg:grid-cols-5 gap-5" v-if="stats.salle">
                    <div
                        class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                        <p class="text-center">
                            {{ stats.salle.label }} <br>
                            <strong class="text-sky-600">{{ stats.salle.count }}</strong>
                        </p>
                    </div>
                    <div
                        class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                        <p class="text-center">
                            {{ stats.filiere.label }} <br>
                            <strong class="text-sky-600">{{ stats.filiere.count }}</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div class="stats l1 mb-5" v-if="statsData.years">
                <template v-for="year in statsData.years" :key="year.id">
                    <h2 class="ml-5 text-sky-400 font-semibold mb-3">Année: L1</h2>
                    <div class="grid lg:grid-cols-5 gap-5">
                        <div
                            class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                            <p class="text-center">
                                Nombre d'Ues <br>
                                <strong class="text-sky-600">00</strong>
                            </p>
                        </div>
                        <div
                            class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                            <p class="text-center">
                                Nombre d'emploi du temps créer<br>
                                <strong class="text-sky-600">00</strong>
                            </p>
                        </div>
                        <div
                            class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                            <p class="text-center">
                                Nombre de responsables<br>
                                <strong class="text-sky-600">00</strong>
                            </p>
                        </div>
                        <div
                            class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1">
                            <p class="text-center">
                                Nombre de professeurs<br>
                                <strong class="text-sky-600">00</strong>
                            </p>
                        </div>
                    </div>
                </template>
            </div>

        </div>
    </Layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout.vue';
import { useCrudStore } from '@/stores/crudStore';
import { useShowTableTime } from '@/stores/showTableTime';
import { notify } from '@kyvg/vue3-notification';
import { useResponsableStore } from '@/stores/responsable';
import { useUserStore } from '@/stores/utilisateur';
import Loader from '@/components/Loader.vue';
import { onMounted } from 'vue';
import router from '@/router';
import { isResponsable } from '@/helpers/helper';
import Chart from 'chart.js/auto';
import client from '@/axiosClient';
import { getFirstDayOfWeek } from '@/helpers/helper';
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 7);
const commingWeekMonday = getFirstDayOfWeek(currentDate);
const showBanner = ref(false);
client.post('api/showBanner', {
    _date: commingWeekMonday
}).then((response) => {
    showBanner.value = response.data
})
notify({
    text: "Content de vous revoir",
    type: "success"
})


const statsData = ref({})
const stats = ref({

})


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
    //console.log(newValue);
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
const userGraph = () => {
    const _data = [
        { label: "Coordonateurs", count: statsData.value.nbrCoordonnateur },
        { label: "Enseignants", count: statsData.value.nbrEnseignants },
        { label: "Responsables", count: statsData.value.nbrResponsable },
    ];
    // console.log(document.getElementById('userGraph'))vue js onCreated
    new Chart(document.getElementById('userGraph'),
        {
            type: 'pie',
            data: {
                labels: _data.map(row => row.label),
                datasets: [
                    {
                        label: 'Nombre',
                        data: _data.map(row => row.count)
                    }
                ]
            }
        })
}

onMounted(() => {
    crudStore.index().then((data) => {
        //console.log(data);
    })
    client.get('api/dashboard/create').then((response) => {
        statsData.value = response.data;
        //console.log(statsData.value)
        stats.value = {
            userTypes: [
                {
                    label: "Coordonnateur",
                    count: statsData.value.nbrCoordonnateur,
                },
                {
                    label: "Enseignants",
                    count: statsData.value.nbrEnseignants,
                },
                {
                    label: "Responsables",
                    count: statsData.value.nbrResponsable,
                },
            ],
            salle: {
                label: "Salles de classe",
                count: statsData.value.nbrSalleDeClasse,
            },
            filiere: {
                label: "Filières disponibles",
                count: statsData.value.nbrFiliere,
            }
        }
        userGraph();
    })
})

</script>

<style lang="css" scoped>
.notif-enter-active {
    animation-name: monAnimation;
    animation-duration: 1.5s;
}

@keyframes monAnimation {
    from {
        opacity: 0;
        position: relative;
        bottom: 50px;
    }

    to {
        opacity: 1;
        position: relative;
        bottom: 0px;
    }
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}
</style>