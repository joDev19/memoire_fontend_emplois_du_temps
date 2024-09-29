<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Les matières (ECs) de la GL" description="Choisissez la matière dont vous voulez mettre à jour la masse horaire." />
            <div class="w-full mb-3 flex justify-end">
                <button class="bg-sky-600 py-1 px-2 text-white border rounded-lg"
                    @click="router.push({ name: 'ec-create' })">Ajouter
                    <font-awesome-icon :icon="faPlusCircle" /> </button>
            </div>
            <div class="bg-slate-200 p-2 rounded-xl min-h-96">
                <DataTable class="table is-bordered is-striped is-hoverable is-fullwidth" :columns="columns"
                    :data="data" :options="options">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Label</th>
                            <th>UEs</th>
                            <th class="text-center">Filiere</th>
                        </tr>
                    </thead>
                    <template #action="props">

                        <div class="flex justify-center">
                            <button @click="showEc(props.cellData.id)"
                                class="bg-sky-600 py-1 px-2 text-white border rounded-lg">Modifier
                                <font-awesome-icon :icon="faPen" /> </button>
                        </div>

                    </template>
                </DataTable>
            </div>
        </div>
        <!-- recherche -->
    </Layout>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '@/router';
import { faPlusCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bm';
import languageFr from 'datatables.net-plugins/i18n/fr-FR.mjs'
import 'datatables.net-responsive-dt';
DataTable.use(DataTablesCore);
// DataTable.use(language);
const options = {
    //language: languageFr,
    language: {
        emptyTable: 'Pas d\'ECs disponible.',
        entries: {
            _: 'ECs',
            1: 'EC'
        },
        search: "Rechercher",
        info: 'Affichage de _START_ à _END_ sur _TOTAL_ ECs',
        infoEmpty: 'Affichage de 0 à 0 sur 0 EC',
        lengthMenu: "Afficher _MENU_ ECs",
        zeroRecords: "Aucune ECs trouvée"

    },
}
const columns = ref([
    { data: 'code' },
    { data: 'label' },
    { data: 'ue' },
    { data: 'filiere' },
    {
        data: null,
        render: '#action',
        title: 'Action',

    }
])
const data = ref([
    {
        'code': '1INF1322',
        'label': 'Analyse et conception orientée objet',
        'ue': 'Structures algébriques et Leurs applications en informatique',
        'filiere': 'SI',
        'id': 1
    },
    {
        'code': '1INF1322',
        'label': 'Analyse et conception orientée objet',
        'ue': 'Structures algébriques et Leurs applications en informatique',
        'filiere': 'SI',
        'id': 2
    },
    {
        'code': '1INF1322',
        'label': 'Analyse et conception orientée objet',
        'ue': 'Structures algébriques et Leurs applications en informatique',
        'filiere': 'SI',
        'id': 3
    },
]);
const showEc = (id) => {
    router.push({ name: 'responsable-matiere-update', params: { id: id } })
}

</script>

<style lang="scss" scoped></style>