<template>
    <Layout>
        <div class="p-5">
            <template v-if="step == 'weeks'">
                <MiniHeader title="Les semaines de cours" />
                <template v-if="loading">
                    <div class="flex justify-center items-center">
                        <Loader />
                    </div>
                </template>
                <template v-else>
                    <div class="grid lg:grid-cols-5 gap-5">
                        <div v-for="week in weeks" :key="week.id"
                            class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col px-1"
                            @click="chooseWeek(week.id)">
                            <p class="text-center">Semaine du <span class="font-semibold">{{ week.start }}</span> au
                                <span class="font-semibold">{{ week.end }}</span></p>
                        </div>
                    </div>
                </template>
            </template>

            <template v-else-if="step == 'calendar'">
                <template v-if="loading">
                    <div class="flex justify-center items-center">
                        <Loader />
                    </div>
                </template>
                <template v-else>
                    <SelectField />
                    <Calendar />
                </template>
            </template>
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { useCrudStore } from '@/stores/crudStore';
import { useShowTableTime } from '@/stores/showTableTime';
import SelectField from '@/components/TimeTables/Consulting/SelectField.vue';
import Calendar from '@/components/TimeTables/Calendar.vue';
import { storeToRefs } from 'pinia';
import { useTableTimeStore } from '@/stores/timeTableStore';
import Loader from '@/components/Loader.vue';
import client from '@/axiosClient';
import router from '@/router';


const step = ref('weeks')
const crudStore = useCrudStore()
const showTableTime = useShowTableTime()
const tableTimeStore = useTableTimeStore()
const { week_id, year_id } = storeToRefs(showTableTime)
const { isShowingCalendar, dataToShow, events } = storeToRefs(tableTimeStore)
const { url, rows: weeks, loading, createData } = storeToRefs(crudStore)

url.value = 'courseWeeks'
if (!year_id.value)
    router.push({ name: "dashboard" })

const chooseWeek = (id) => {
    week_id.value = id;
    isShowingCalendar.value = true;
    loading.value = true
    url.value = `timetables/year/${year_id.value}/week/${week_id.value}`
    client.get(url.value).then(response => {

        dataToShow.value = response.data
        //map 
        console.log(response.data.courses)
        events.value = response.data.courses


        step.value = 'calendar'


    }).catch(error => {
        console.log(error)
    }).finally(() => {
        loading.value = false
    })
}
onUnmounted(() => {
    events.value = [];
    isShowingCalendar.value = false;
})
onMounted(() => {
    crudStore.index()
    loading.value = true
    client.get(`course/create/year/${year_id.value}`).then((response) => {
        createData.value = response.data;
        loading.value = false
    })
})
</script>

<style lang="css" scoped></style>