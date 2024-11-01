<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Les Unités d'enseignements" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
            <div class="w-full mb-3 flex justify-end">
                <button class="bg-sky-600 py-1 px-2 text-white border rounded-lg" @click="router.push({name: 'ue-create'})">Ajouter
                    <font-awesome-icon :icon="faPlusCircle" /> </button>
            </div>
            <div class="bg-slate-200 p-2 rounded-xl min-h-96">
                <DataTable class="table is-bordered is-striped is-hoverable is-fullwidth" :columns="columns"
                    :data="data" :options="options">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Label</th>
                            <th>Filières</th>
                            <th class="text-center">Semestre</th>
                        </tr>
                    </thead>
                    <template #filieres="props">
                        {{ props.rowData.filieres.map(filiere => filiere.code).join(', ') }}
                    </template>
                    <template #semestre="props">
                        {{ props.rowData.semestre.label }}
                    </template>
                    <template #action="props">

                        <div class="flex justify-center">
                            <button @click="showUe(props.cellData.id)"
                                class="bg-sky-600 py-1 px-2 text-white border rounded-lg">Voir
                                <font-awesome-icon :icon="faEye" /> </button>
                        </div>

                    </template>
                </DataTable>
            </div>
        </div>
        <!-- recherche -->
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '@/router';
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bm';
import languageFr from 'datatables.net-plugins/i18n/fr-FR.mjs'
import 'datatables.net-responsive-dt';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const {url, rows: ues, loading} = storeToRefs(crudStore);
url.value = "/ues"
DataTable.use(DataTablesCore);
// DataTable.use(language);
const options = {
    //language: languageFr,
    language: {
        emptyTable: 'Pas d\'UEs disponible.',
        entries: {
            _: 'UEs',
            1: 'UE'
        },
        search: "Rechercher",
        info: 'Affichage de _START_ à _END_ sur _TOTAL_ UEs',
        infoEmpty: 'Affichage de 0 à 0 sur 0 UE',
        lengthMenu: "Afficher _MENU_ UEs",
        zeroRecords: "Aucune UEs trouvée"

    },
}
const columns = ref([
    { data: 'code' },
    { data: 'label' },
    { data: 'filieres', render: '#filieres' },
    { data: 'semestre', render: '#semestre' },
    {
        data: null,
        render: '#action',
        title: 'Action',

    }
])
const data = ref([
    // {
    //     'code': 'MTH1321',
    //     'label': 'Structures algébriques et Leurs applications en informatique',
    //     'filiere': 'GL',
    //     'semestre': 'S1',
    //     'id': 1
    // },
    // {
    //     'code': 'MTH1321',
    //     'label': 'Structures algébriques et Leurs applications en informatique',
    //     'filiere': 'GL',
    //     'semestre': 'S1',
    //     'id': 2
    // },
    // {
    //     'code': 'MTH1321',
    //     'label': 'Structures algébriques et Leurs applications en informatique',
    //     'filiere': 'GL',
    //     'semestre': 'S1',
    //     'id': 3
    // },
]);
const showUe = (id) => {
    router.push({ name: 'ue-show', params: { id: id } })
}
onMounted(() => {
    crudStore.index().then((responseData) =>{
        data.value = responseData;
    })

})
</script>

<style lang="scss" scoped></style>