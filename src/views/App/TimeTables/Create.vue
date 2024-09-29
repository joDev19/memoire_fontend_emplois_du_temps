<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Créer un nouvel emplois du temps" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." /> {{ events }}
            <div>
                <template v-if="currentStep == 'classe'">
                    <ChooseClasse />
                </template>
                <template v-if="currentStep == 'filiere'">
                    <ChooseFiliere />
                </template>
                <div class="bg-white w-full p-2 mx-auto rounded-lg" v-if="currentStep == 'calendar'">

                    <div class="flex justify-end">
                        <button class="btn bg-sky-600 text-white p-2 rounded-lg" @click="modalIsOpen = true">Ajouter
                            un crénaux</button>

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

import Calendar from '@/components/TimeTables/Calendar.vue';
import CreateCourse from '@/components/TimeTables/CreateCourse.vue';
import { ModalsContainer, useModal } from 'vue-final-modal'
import { ref, watch } from 'vue';
import ChooseFiliere from '@/components/TimeTables/ChooseFiliere.vue';
import { useTableTimeStore } from '@/stores/timeTableStore';
import ChooseClasse from '@/components/TimeTables/ChooseClasse.vue';
import { storeToRefs } from 'pinia';
const tableTimeStore = useTableTimeStore()
const { modalIsOpen, currentStep, data, events } = storeToRefs(tableTimeStore)
import { useCrudStore } from '@/stores/crudStore';
const crudStore = useCrudStore()
const { loading, url, rows } = storeToRefs(crudStore);
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
watch(modalIsOpen, (newModalIsOpen) => {
    if (newModalIsOpen == true) {
        open()
    } else {
        close()
    }
})
</script>

<style lang="css"></style>