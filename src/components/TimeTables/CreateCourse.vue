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
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Choisissez la filière {{
                            events.filieres }}</label>
                        <div class="grid grid-cols-3 gap-3">
                            <div class="flex items-center" v-for="filiere in data.filieres_id" :key="filiere">
                                <input v-model="event.filieres" :value="filiere" type="checkbox"
                                    :id="`filiere-${createData.filieres.find((el) => el.id == filiere).code}`"
                                    class="focus:outline-sky-600">
                                <label :for="`filiere-${createData.filieres.find((el) => el.id == filiere)?.code}`"
                                    class="lg:font-semibold ml-3">{{
                                        createData.filieres.find((el) => el.id == filiere).label }} {{ filiere }}</label>
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
import { notify } from '@kyvg/vue3-notification';
const crudStore = useCrudStore()
const { createData, loading } = storeToRefs(crudStore);
import { dateFormatter } from '@/helpers/helper';
const tableTimeStore = useTableTimeStore()

const { events, modalIsOpen, event, data, isUpdateEvent, eventInCopy } = storeToRefs(tableTimeStore);
if (!eventInCopy.value) {
    tableTimeStore.resetEventFiliere();
}
/**
* Vérification de conflis
* @todo prendre le jour, l'heure de début et l'heure de fin concerné et les stocker dans des const.
* @todo faire une boucle sur le tableau de events dans son état actuel.
* @todo dans la boucle, vérifier si il y a un cours qui à lieu le même jour et qui commence à une heure inférieur a l'heure de fin de l'ancien cours .
* @todo si oui, vérifier si les professeurs est le même pour les deux cours. Si oui, il y a conflit
* @todo sinon, vérifier s'il y a une ou plusieurs filieres de l'un qui se retrouve dans l'autre. Si oui il y a conflit.
* @todo sinon, vérifier si la salle de classe de l'un est la même pour l'autre. Si oui, il y a conflit.
* @toso sinon, créer l'event.
*/
const checkConflict = () => {
    const day = event.value.date;
    const start = event.value.start;
    const end = event.value.end;
    const filieres = event.value.filieres
    const salle = event.value.salle
    console.log(day, start, end,)
    let returnValue = false;
    events.value.forEach(course => {
        const courseDate = `${course.start.getFullYear()}-${dateFormatter(course.start.getMonth() + 1)}-${dateFormatter(course.start.getDate())}`
        const courseStart = `${dateFormatter(course.start.getHours())}:${dateFormatter(course.start.getMinutes())}`
        const courseEnd = `${dateFormatter(course.end.getHours())}:${dateFormatter(course.end.getMinutes())}`
        console.log(start, courseEnd, Date.parse('01/01/2024 ' + start) < Date.parse('01/01/2024 ' + courseEnd))

        if (courseDate == day && (Date.parse('01/01/2024 ' + start) < Date.parse('01/01/2024 ' + courseEnd))) {
            // alert('on est dans le cas où il peut y avoir un conflit')
            notify("verification des conflits")
            // vérification du professeur
            console.log(course)
            if (event.value.prof == course.prof) {
                // alert('on a un conflit de professeur');
                notify({
                    text: "Il y a un conflit d'enseignant",
                    type: "error"
                })
                returnValue = true;
                return returnValue
            }
            // vérification de la filiere
            filieres.forEach(filiere => {
                if (course.filieres.includes(filiere)) {
                    // alert('on a un conflit de filiere')
                    notify({
                        text: "Il y a un conflit de filière",
                        type: "error"
                    })
                    returnValue = true;
                    return returnValue;
                }
            });
            // vérification de la salle de classe
            if (salle == course.salle) {
                // alert('on a un conflit de salle')
                notify({
                    text: "Il y a un conflit de salle de classe",
                    type: "error"
                })
                returnValue = true;
                return returnValue
            }
        }
    });
    return returnValue;
}
const addEvent = () => {
    if ((event.value.start < "07:00") || (event.value.start > "19:00") || "07:00" > event.value.end || event.value.end > "19:00") {
        notify({
            text: "Veuillez vérifier les horaires",
            type: "error"
        })
    } else {
        if (false == checkConflict()) {
            tableTimeStore.addEvent(eventFormToEventToDisplayFormatter(events.value, event.value))
            modalIsOpen.value = false;
            if (eventInCopy.value) {
                eventInCopy.value = false
            }
            tableTimeStore.resetEvent();
            notify({
                text: "Cours ajouté avec succès",
                type: "success"
            })
        }
    }
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
        event.value.filieres = createData.value.ecs.find((el) => el.id == newEc).filieres.map((e => e.id))
        console.log(event.value.filieres)
    }
})

</script>

<style lang="css" scoped></style>