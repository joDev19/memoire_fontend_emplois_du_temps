<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Créer une nouvelle unité d'enseignement" description="" />
            <div>
                <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg" @submit.prevent="createUe">
                    <div class="lg:mb-3">
                        <label for="code" class="lg:font-semibold lg:block lg:mb-1">Code</label>
                        <input type="text" id="code"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="ue.code">
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Label</label>
                        <input type="text" id="label"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600"
                            v-model="ue.label">
                    </div>
                    <div class="lg:mb-3">
                        <label for="filiere" class="lg:font-semibold lg:block lg:mb-1">Filière</label>
                        <p class="py-5"><input type="checkbox" id="allChecked" v-model="allIsChecked"> <label
                                for="allChecked">Tout
                                cocher</label></p>
                        <div class="grid grid-cols-3 gap-3">
                            <div class="flex  items-center" v-for="filiere in createData?.filieres" :key="filiere.id">
                                <!-- {{ filiere }} -->
                                <input name="classe" type="checkbox" :id="`filiere-${filiere.id}`"
                                    class="focus:outline-sky-600" v-model="ue.filieres_id" :value="filiere.id">
                                <label :for="`filiere-${filiere.id}`" class="lg:font-semibold ml-3">{{ filiere.label }}
                                    ({{ filiere.code
                                    }})</label>
                            </div>
                        </div>
                    </div>
                    <div class="lg:mb-3">
                        <label for="semestre" class="lg:font-semibold lg:block lg:mb-1">Semestre</label>
                        <select id="semestre" v-model="ue.semestre_id"
                            class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                            <option v-for="semestre in createData?.semestres" :value="semestre.id">{{ semestre.label }}
                                ({{ semestre.code }})</option>
                        </select>
                    </div>
                    <div class="lg:mt-3 lg:h-10 w-1/3 mx-auto lg:bg-sky-600 lg:flex hover:bg-sky-700">/
                        <button class="lg:w-full lg:text-center text-white">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import router from '@/router';
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
const ue = ref({
    filieres_id: [],
});
const allIsChecked = computed({
    get() {
        return ue.value.filieres_id.length == 5;
    },
    set(newValue) {
        if (newValue) {
            ue.value.filieres_id = [...createData.value.filieres.map(filiere => filiere.id)]
        } else {
            ue.value.filieres_id = []
        }
    }
})
const crudStore = useCrudStore();
const { url, createData } = storeToRefs(crudStore);
url.value = "api/ues";
crudStore.create();
const createUe = () => {
    crudStore.store(ue.value).then(() => {
        router.push({ name: "ues-list" });
    })
}
</script>

<style lang="css" scoped></style>