<template class="text-black">
    <FullCalendar ref="fullCalendar" :options="calendarOptions">
        <template v-slot:eventContent='arg'>
            <div class="flex flex-col gap-3 overflow-x-auto overflow-y-auto">
                <div class="flex w-full justify-end h-max-12">
                    <font-awesome-icon :icon="faCopy" size="lg" class="mr-2" @click.stop.prevent="copyEvent(arg)" />
                    <font-awesome-icon :icon="faXmark" size="lg" class="mr-2" @click="removeEvent(arg)" />
                </div>
                <div class="flex flex-col w-full h-full  justify-start items-center overflow-x-auto overflow-y-auto">
                    <p class="text-center">
                        {{ dateFormatter((arg.event.start).getHours()) }}h{{
                            dateFormatter((arg.event.start).getMinutes()) }} - {{
                            dateFormatter((arg.event.end).getHours()) }}h{{ dateFormatter((arg.event.end).getMinutes()) }} :
                        <span class="bg-sky-200 text-sky-700 font-semibold p-1">{{
                            arg.event.extendedProps.filieres.map((el) =>
                                (createData.filieres.find((fil) => fil.id == el).code)).join(' - ')
                        }}</span>
                    </p>
                    <!-- {{ arg.event.title }} -->
                    <p class="text-center"> {{ createData.ecs.find((el) => el.id == arg.event.title).label }} ( {{
                        createData.ecs.find((el) => el.id == arg.event.title).remaining_hour }}h/{{
                            createData.ecs.find((el) => el.id == arg.event.title).masse_horaire }}h)</p>
                    <p class="text-center">{{ createData.classes.find((el) => el.id ==
                        arg.event.extendedProps.salle).label
                        }}</p>
                    <p class="text-center">{{ arg.event.extendedProps.prof }}</p>
                </div>
            </div>
        </template>
    </FullCalendar>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr';
import { notify } from '@kyvg/vue3-notification';
import { eventFormToEventToDisplayFormatter, setDateWhenDragOrResize } from '@/helpers/helper';
import interactionPlugin from '@fullcalendar/interaction'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopy, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTableTimeStore } from '@/stores/timeTableStore';
import { storeToRefs } from 'pinia';
import { dateFormatter } from '@/helpers/helper';
import { useCrudStore } from '@/stores/crudStore';
import client from '@/axiosClient';


const emits = defineEmits(['openModal'])
const tableTimeStore = useTableTimeStore()
const crudStore = useCrudStore()
const { createData } = storeToRefs(crudStore);
const { events, modalIsOpen, event, isUpdateEvent, isShowingCalendar, dataToShow, eventInCopy, startDateOfTheWeek, data, year } = storeToRefs(tableTimeStore);

const calendarOptions = ref({
    plugins: [timeGridPlugin, interactionPlugin],
    locale: frLocale,
    initialView: 'timeGridWeek',
    handleWindowResize: true,
    hiddenDays: [0],
    headerToolbar: isShowingCalendar.value === false ? {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
    } : false,
    weekNumberCalculation: 'ISO',
    slotMinTime: "07:00:00",
    slotMaxTime: "20:00:00",
    eventOverlap: false,
    slotEventOverlap: false,
    slotLabelFormat: {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    },
    dayHeaderFormat: {
        day: '2-digit',
        weekday: 'long',
    },
    titleFormat: {
        // will produce something like "Tuesday, September 18, 2018"
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        weekday: 'long',
        // dayHeaders: false,
    },
    dateClick: function (info) {
        // const event = {}
        if (!isShowingCalendar.value) {
            const date = dateFormatter((new Date(info.dateStr)).getDate())
            const month = dateFormatter((new Date(info.dateStr)).getMonth() + 1)
            const year = (new Date(info.dateStr)).getFullYear()
            const hour = dateFormatter((new Date(info.dateStr)).getHours())
            const minute = dateFormatter((new Date(info.dateStr)).getMinutes())
            const fullDate = `${year}-${month}-${date}`
            const start = `${hour}:${minute}`

            event.value.date = fullDate
            event.value.start = start

            modalIsOpen.value = true
        }
    },
    events: events.value,
    eventClick: (arg) => {
        if (!isShowingCalendar.value) {
            isUpdateEvent.value = true
            // console.log(events.value.find(event => event.id == arg.event.id))
            event.value = events.value.find(event => event.id == arg.event.id)
            // console.log(event.value)
            const startHour = dateFormatter((new Date(event.value.start)).getHours())
            const startMinute = dateFormatter((new Date(event.value.start)).getMinutes())
            const endHour = dateFormatter((new Date(event.value.end)).getHours())
            const endMinute = dateFormatter((new Date(event.value.end)).getMinutes())
            const date = dateFormatter((new Date(event.value.start)).getDate())
            const month = dateFormatter((new Date(event.value.start)).getMonth() + 1)
            const year = (new Date(event.value.start)).getFullYear()
            const fullDate = `${year}-${month}-${date}`
            event.value.date = fullDate
            event.value.start = `${startHour}:${startMinute}`
            event.value.end = `${endHour}:${endMinute}`
            // console.log(event.value)
            modalIsOpen.value = true;
            // tableTimeStore.removeEvent(arg.event.id)
        }
    },
    eventResizableFromStart: true,
    eventDrop: function (info) {
        events.value = setDateWhenDragOrResize(info, events)
    },
    eventResize: function (info) {
        events.value = setDateWhenDragOrResize(info, events)
    },
    // viewDidMount: function (arg) {
    //     console.log(arg.view.activeStart);
    // },
    datesSet: function (dateInfo) {
        startDateOfTheWeek.value = dateInfo.start
    }

})
if (isShowingCalendar.value) {
    calendarOptions.value.initialDate = dataToShow.value.start
}
const removeEvent = (arg) => {
    if (!isShowingCalendar.value) {
        // console.log('test')
        // console.log(arg.event.id)
        tableTimeStore.removeEvent(arg.event.id)
        // console.log(events.value)

    }
}
const copyEvent = (arg) => {
    if (!isShowingCalendar.value) {
        eventInCopy.value = true;
        // console.log(arg.event.id)
        event.value = { ...events.value.find(ev => ev.id == arg.event.id) }
        // console.log(event.value)
        // chercher dans le tableau et prendre l'event qui a l'id qu'on veut (1)
        notify({
            text: "Copié avec success",
            type: "success"
        })
    }

}
watch(events, (newEvent) => {
    calendarOptions.value.events = newEvent
    // console.log("watrcher de event")
})

onMounted(() => {
    if(!isShowingCalendar.value){
        client.get(`api/years/${data.value.classe_id}`).then((response) => {
            year.value = response.data;
        })
    }
})
</script>

<style lang="scss" scoped></style>