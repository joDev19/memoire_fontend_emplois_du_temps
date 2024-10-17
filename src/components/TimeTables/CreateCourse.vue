<template>
    <VueFinalModal @click-outside="console.log('test')" @closed="closed" @before-open="beforeOpen"
        class="flex flex-col justify-center items-center" content-class="p-3 rounded-lg w-2/3 bg-white overflow-auto">
        <div class="overflow-auto">
            <p class="text-sky-600 font-semibold text-lg mb-3"><span v-show="!isUpdateEvent">Créer un cours</span><span
                    v-show="isUpdateEvent">Modifier un cours</span></p>
            <template v-if="loading">
                <div class="flex justify-center items-center my-5">
                    <Loader />
                </div>
            </template>
            <template v-else>
                <form action="" class="text-black">
                    <!-- {{ createData.ecs }} -->
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Filtrer les matières</label>
                        <div class="flex justify-around">
                            <input type="text" id="label"
                                class="lg:border lg:rounded h-10 w-auto lg:h-10 lg:p-2 focus:outline-sky-600"
                                placeholder="Filtrer par nom" />
                            <input type="text" id="label"
                                class="lg:border lg:rounded h-10 w-auto lg:h-10 lg:p-2 focus:outline-sky-600"
                                placeholder="Filtrer par code" />
                            <select id="label"
                                class="lg:border lg:rounded h-10 w-auto lg:h-10 lg:p-2 focus:outline-sky-600">
                                <option>Filtrer par UE</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Choisissez la matière</label>
                        <select id="label"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="event.title">
                            <!-- <option value="1">Politique de sécurité des systèmes d'information</option> -->
                            <option v-for="ec in createData.ecs" :key="ec.id" :value="ec.id">{{ ec.label }}</option>
                        </select>
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Choisissez la filière</label>
                        <div class="grid grid-cols-3 gap-3">
                            <div class="flex items-center" v-for="filiere in data.filieres_id" :key="filiere">
                                <input v-model="event.filieres" :value="filiere" type="checkbox"
                                    :id="`filiere-${createData.filieres.find((el) => el.id == filiere).code}`"
                                    class="focus:outline-sky-600">
                                <label :for="`filiere-${createData.filieres.find((el) => el.id == filiere).code}`"
                                    class="lg:font-semibold ml-3">{{
                                        createData.filieres.find((el) => el.id == filiere).label }}</label>
                            </div>
                            <!-- <div class="flex justify-center items-center">
                                <input v-model="event.filieres" value="2" type="checkbox" id="SI"
                                    class="focus:outline-sky-600">
                                <label for="SI" class="lg:font-semibold ml-3">Sécurité informatique</label>
                            </div>
                            <div class="flex justify-center items-center">
                                <input v-model="event.filieres" value="3" type="checkbox" id="IA"
                                    class="focus:outline-sky-600">
                                <label for="IA" class="lg:font-semibold ml-3">Intelligence artificielle</label>
                            </div> -->
                        </div>
                    </div>

                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Professeur</label>
                        <!-- input ou selectk -->
                        <input type="text" id="label"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600" readonly
                            v-model="event.prof" />
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Choisissez la salle</label>
                        <select id="label"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="event.salle">
                            <option v-for="classe in createData.classes" :key="classe.id" :value="classe.id">{{
                                classe.label }}</option>
                        </select>
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Jour</label>
                        <!-- {{ event.date }} -->
                        <input id="label" type="date"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="event.date" />
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Heure de début</label>
                        <!-- {{ event.start }} -->
                        <input id="label" type="time"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="event.start" />
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Heure de fin</label>
                        <input id="label" type="time"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="event.end" />
                    </div>
                    <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">
                        <button v-if="!isUpdateEvent" type="button" class="lg:w-full lg:text-center text-white"
                            @click="addEvent">Ajouter</button>
                        <button v-else type="button" class="lg:w-full lg:text-center text-white"
                            @click="updateEvent">Modifier</button>
                    </div>
                </form>
            </template>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { useTableTimeStore } from '@/stores/timeTableStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { eventFormToEventToDisplayFormatter } from '@/helpers/helper';
import { VueFinalModal } from 'vue-final-modal'
import { useCrudStore } from '@/stores/crudStore';
import Loader from '../Loader.vue';
import client from '@/axiosClient';
const crudStore = useCrudStore()
const { createData, loading } = storeToRefs(crudStore);
const tableTimeStore = useTableTimeStore()

const { events, modalIsOpen, event, data, isUpdateEvent, eventInCopy } = storeToRefs(tableTimeStore);
if (!eventInCopy.value) {
    tableTimeStore.resetEventFiliere();
}

const addEvent = () => {
    if ((event.value.start < "07:00") || (event.value.start > "19:00") || "07:00" > event.value.end || event.value.end > "19:00") {
        alert('vérifiez les heures')
    } else {
        tableTimeStore.addEvent(eventFormToEventToDisplayFormatter(events.value, event.value))
        tableTimeStore.resetEvent();
        modalIsOpen.value = false;
        if (eventInCopy.value) {
            eventInCopy.value = false
        }
    }
}
const clickOutside = () => {
    alert('click outside')


}
const beforeOpen = () => {
    // alert('before open');
}
const closed = () => {
    if (event.value.date != undefined) {
        // si l'id du event est dans la tableau events alors je change le format sinon je fais rien.
        const tmpEvents = [...events.value];
        console.log(tmpEvents.find(ev => ev.id == event.value.id))
        tmpEvents.forEach((el, i) => {
            if (el.id == event.value.id) {
                //alert(find);
                tmpEvents[i] = eventFormToEventToDisplayFormatter(events.value, event.value, event.value.id)
            }
        })
        events.value = []
        events.value = tmpEvents
        //alert('changer le format')
        event.value = {};
    }
    // alert('oki')
    modalIsOpen.value = false;
    if (isUpdateEvent.value == true) {
        isUpdateEvent.value = false
    }
}
const updateEvent = () => {

    const tmpTable = events.value
    tmpTable.forEach((el, i) => {
        if (el.id == event.value.id) {
            tmpTable[i] = eventFormToEventToDisplayFormatter(events.value, event.value, event.value.id)
        }
    })
    events.value = [];
    events.value = tmpTable;
    console.log("mais")
    modalIsOpen.value = false;
    // console.log(event.value.id)
    // tmpTable.forEach(loop_event => {
    //     if(loop_event.id == event.value.id){
    //         console.log("j'ai trouvé")
    //         console.log(loop_event)
    //         console.log(event.value)
    //     }
    // });

}
onMounted(() => {
    loading.value = true
    client.get(`course/create/year/${data.value.classe_id}`).then((response) => {
        createData.value = response.data;
        loading.value = false
    })
})

watch(() => event.value.title, (newEc) => {
    if (event.value.title != undefined) {
        const profId = createData.value.ecs.find((el) => el.id == newEc).professeur_id;
        event.value.prof = createData.value.professeurs.find((el) => el.id == profId).name
    }
})
</script>

<style lang="css" scoped></style>