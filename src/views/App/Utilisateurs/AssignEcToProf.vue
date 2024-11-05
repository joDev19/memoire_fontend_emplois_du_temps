<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Assignez une matiere à un professeur" />
            <div class="w-2/3 bg-white p-1 rounded-lg mx-auto overflow-auto" style="height: 600px;">
                <p class="text-xl font-semibold mb-3">Choisissez une ou plusieurs matières {{ profId }}, {{ ecsId }}</p>
                <div class="w-full p-2 flex gap-3">
                    <input type="text" placeholder="Rechercher par code"
                        class="h-10  border rounded-lg focus:outline-sky-600 p-1 italic" v-model="filter.code">
                    <input type="text" placeholder="Rechercher par nom"
                        class="h-10 border rounded-lg focus:outline-sky-600 p-1 italic" v-model="filter.name">
                </div>
                <div class="grid grid-cols-3 gap-2 mt-3">
                    <div class="bg-slate-100 p-1 flex gap-2 justify-around items-center rounded"
                        v-for="ec in ecsDisplay" :key="ec.id">
                        <input type="checkbox" name="" class="w-4" :id="`ec-${ec.id}`" v-model="ecsId" :value="ec.id">
                        <label :for="`ec-${ec.id}`" class="text-sm">{{ ec.label }}</label>
                    </div>
                </div>
                <div class="float-right mr-5">
                    <button class="p-2 border rounded-lg text-white bg-sky-600" @click="assign">Assigner</button>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import client from '@/axiosClient';
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { useAssignEcToProfStore } from '@/stores/AssignEcToProfStore';
const assignEcToProfStore = useAssignEcToProfStore()
const { profId, ecsId } = storeToRefs(assignEcToProfStore)
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useCrudStore } from '@/stores/crudStore';
const {rows} = storeToRefs(useCrudStore())
const ecs = ref([])
const ecsDisplay = ref([])
if (profId.value == null) {
    router.push({ name: 'users-list' })
}
onMounted(() => {
    client.get('apiecs').then((response) => {
        ecs.value = response.data
        ecsDisplay.value = ecs.value
    })
})
const filter = ref({
    code: '',
    name: '',
})
const assign = () => {
    client.post(`api/ecs/assign-teacher/${profId.value}`, {
        "ecsId": ecsId.value
    }).then(() => {
        rows.value = [];
        router.push({ name: 'user-show', params: { id: profId.value } })
    }).catch(() => {
        alert('une erreur est rencontré')
    })
}
watch(() => filter.value.code, (newCode) => {
    if (newCode == '') {
        ecsDisplay.value = ecs.value;
    } else {
        ecsDisplay.value = ecs.value.filter(ec => ec.code.includes(newCode));
    }
})
watch(() => filter.value.name, (newName) => {
    if (newName == '') {
        ecsDisplay.value = ecs.value;
    } else {
        ecsDisplay.value = ecs.value.filter(ec => ec.label.toLowerCase().includes(newName.toLowerCase()));
    }
})
onUnmounted(() => {
    ecsId.value = []
})
</script>

<style lang="scss" scoped></style>