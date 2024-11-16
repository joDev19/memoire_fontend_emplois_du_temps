<template>
    <Layout>
        <div class="p-5">
            <MiniHeader :title="year.label ? 'Créer un nouvel emplois du temps '+'('+year.label+')': 'Créer un nouvel emplois du temps '"
                description="Programmer des cours pour une semaine de votre choix" />
            <div>
                <template v-if="currentStep == 'classe'">
                    <ChooseClasse />
                </template>
                <template v-if="currentStep == 'filiere'">
                    <ChooseFiliere />
                </template>
                <div class="bg-white w-full p-2 mx-auto rounded-lg" v-if="currentStep == 'calendar'">
                    <div class="flex justify-end gap-3">
                        <button class="btn bg-sky-600 text-white p-2 rounded-lg"
                            @click="currentStep = 'filiere'"><font-awesome-icon :icon="faArrowLeft" /> Précédent
                        </button>
                        <button class="btn bg-sky-600 text-white p-2 rounded-lg" @click="handleImport">Importer
                        </button>
                        <button class="btn bg-sky-600 text-white p-2 rounded-lg" @click="modalIsOpen = true">Ajouter
                            un crénaux</button>
                        <button class="btn bg-sky-600 text-white p-2 rounded-lg"
                            @click="storeTimeTables">Enregistrer</button>

                    </div>
                    <Calendar />
                    <ModalsContainer />
                </div>
            </div>
        </div>

    </Layout>
</template>

<script setup>
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Calendar from '@/components/TimeTables/Calendar.vue';
import CreateCourse from '@/components/TimeTables/CreateCourse.vue';
import { ModalsContainer, useModal } from 'vue-final-modal'
import { onUnmounted, ref, watch } from 'vue';
import ChooseFiliere from '@/components/TimeTables/ChooseFiliere.vue';
import { useTableTimeStore } from '@/stores/timeTableStore';
import ChooseClasse from '@/components/TimeTables/ChooseClasse.vue';
import { storeToRefs } from 'pinia';
import { dateFormatter, getFirstDayOfWeek } from '@/helpers/helper';
const tableTimeStore = useTableTimeStore()
const { modalIsOpen, currentStep, data, events, startDateOfTheWeek, year } = storeToRefs(tableTimeStore)
import { useCrudStore } from '@/stores/crudStore';
import Matiere from '../Responsable/Matiere.vue';
import client from '@/axiosClient';
import { notify } from '@kyvg/vue3-notification';
const crudStore = useCrudStore()
const { loading, url, rows, createData } = storeToRefs(crudStore);
// const emits = defineEmits(['getDateOfCalendar'])
const steps = ref([
    {
        title: 'Choix de la classe',
        name: 'classe',
    },
    {
        title: 'Choix des filières',
        name: 'filiere',
    },
    {
        title: 'Construire l\'emplois du temps',
        name: 'calendar'
    }
])
const { open, close } = useModal({
    component: CreateCourse,
    attrs: {
        // title: 'Hello World!',
        onConfirm() {
            close()
        },
    },
    slots: {
        default: '<p>The content of the modal</p>',
    },
})
const storeTimeTables = () => {
    // console.log(year.value.id);
    if (events.value.length > 0) {
        const firstDayOfTheWeek = getFirstDayOfWeek(new Date(events.value[0].start))
        const lastDayOfTheWeek = new Date(firstDayOfTheWeek);
        lastDayOfTheWeek.setDate(firstDayOfTheWeek.getDate() + 5);
        //console.log(events.value)
        const weekEvents = [...events.value].map(el => {
            return {
                ec_id: el.title,
                day: `${new Date(el.start).getFullYear()}-${dateFormatter(new Date(el.start).getMonth() + 1)}-${dateFormatter(new Date(el.start).getDate())}`,
                start: `${dateFormatter(new Date(el.start).getHours())}:${dateFormatter(new Date(el.start).getMinutes())}`,
                end: `${dateFormatter(new Date(el.end).getHours())}:${dateFormatter(new Date(el.end).getMinutes())}`,
                filieres_id: el.filieres,
                classe_id: el.salle
            }
        })
        const data_to_send = {
            courses: weekEvents,
            year_id: year.value.id,
            weekStartDate: `${firstDayOfTheWeek.getFullYear()}-${dateFormatter(firstDayOfTheWeek.getMonth() + 1)}-${dateFormatter(firstDayOfTheWeek.getDate())}`,
            weekEndDate: `${lastDayOfTheWeek.getFullYear()}-${dateFormatter(lastDayOfTheWeek.getMonth() + 1)}-${dateFormatter(lastDayOfTheWeek.getDate())}`,
        }
        // console.log(data_to_send)
        client.post('api/timetables', data_to_send).then((response) => {
            notify({
                text: "Enregistré avec succès",
                type: "success"
            })
            router.push({ name: 'dashboard' });
        })
    } else {
        notify({
            text: "Veuillez ajouter au moins un événement.",
            type: "warn"
        })
    }

}
const handleImport = () => {
    loading.value = true
    client.get(`api/course/create/year/${data.value.classe_id}`).then((response) => {
        createData.value = response.data;
        loading.value = false
    })
    // récupérer la date de début de la semaine
    const date = startDateOfTheWeek.value;
    // enlever une semaine ( 7 jours ) à cette date
    date.setDate(date.getDate() - 7);
    // faire la requete api
    const _data = `${date.getFullYear()}-${dateFormatter(date.getMonth() + 1)}-${dateFormatter(date.getDate())}`
    client.post('api/courses/get-old-courses', {
        oldDate: _data,
        yearId: data.value.classe_id
    }).then(response => {
        events.value = response.data
    });
    // mettre à jour events
}
watch(modalIsOpen, (newModalIsOpen) => {
    if (newModalIsOpen == true) {
        open()
    } else {
        close()
    }
})
onUnmounted(() => {
    currentStep.value = 'classe'
    events.value = []
    data.value =
    {
        filieres_id: [],
    }

})

</script>

<style lang="css"></style>