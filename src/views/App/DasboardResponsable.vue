<template>
    <Layout>
        <div class="p-5">
            Bienvenue Karen HOUEHA.
            <MiniHeader title="Quelle action voulez vous effectuer ?" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
            <div class="grid lg:grid-cols-5 gap-5">
                <div class="h-24 border rounded bg-white hover:border-sky-600 hover:cursor-pointer flex justify-around flex-col"
                    v-for="item in itemsToDisplay" :key="item" @click="modalIsOpen = true">
                    <FontAwesomeIcon :icon="item.icon" size="3x" :title="item.label" />
                    <p class="text-center">{{ item.label }}</p>
                </div>
            </div>
            <ModalsContainer />
        </div>
    </Layout>
</template>

<script setup>
import { ref, watch } from 'vue';
import Layout from './Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { ModalsContainer, useModal } from 'vue-final-modal'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Confirmation from '@/components/Responsable/Confirmation.vue';
import { useResponsableStore } from '@/stores/responsable';
import { storeToRefs } from 'pinia';
const responsableStore = useResponsableStore()
const { modalIsOpen } = storeToRefs(responsableStore)
const itemsToDisplay = ref([
    {
        label: "Renseigner des stats",
        icon: faChartLine,
        // routeName: 'filieres-list'
    },
])
const { open, close } = useModal({
    component: Confirmation,
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

<style lang="css" scoped></style>