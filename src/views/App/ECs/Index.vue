<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Les matières (ECs)" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
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
                    <template #filieres="props">
                        <div class="flex justify-start">
                            {{props.cellData.map(filiere => {
                                return filiere.code
                                // return {
                                //     // id: filiere.id,
                                //     code: filiere.code
                                // }
                            }).join(' - ')}}
                        </div>
                    </template>
                    <template #ue="props">
                        <div class="flex justify-start">
                            {{props.cellData.label}}
                        </div>
                    </template>
                    <template #action="props">

                        <div class="flex justify-center">
                            <button @click="showEc(props.cellData.id)"
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
import { useCrudStore } from '@/stores/crudStore';
import 'datatables.net-responsive-dt';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore();
DataTable.use(DataTablesCore);
// DataTable.use(language);
const {url, loading, rows: ecs} = storeToRefs(crudStore);
url.value = "api/ecs"
const options = {
    //language: languageFr,
    loading: loading,
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
        zeroRecords: "Aucune ECs trouvée",
        loading: loading.value,

    },
}
const columns = ref([
    { data: 'code' },
    { data: 'label' },
    { data: 'ue', render: '#ue' },
    { data: 'filieres', render: '#filieres' },
    {
        data: null,
        render: '#action',
        title: 'Action',

    }
])
const data = ref([])

const showEc = (id) => {
    router.push({ name: 'ec-show', params: { id: id } })
}
onMounted(() => {
    crudStore.index().then(() => {
       data.value = ecs.value
    })
})

</script>

<style lang="scss" scoped></style>