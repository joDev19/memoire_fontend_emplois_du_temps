<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Les utilsateurs (Coordinateurs et responsables)" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
            <div class="w-full mb-3 flex justify-end">
                <button class="bg-sky-600 py-1 px-2 text-white border rounded-lg"
                    @click="router.push({ name: 'user-create' })">Ajouter
                    <font-awesome-icon :icon="faPlusCircle" /> </button>
            </div>
            <div class="bg-slate-200 p-2 rounded-xl min-h-96">
                <DataTable class="table is-bordered is-striped is-hoverable is-fullwidth" :columns="columns"
                    :data="data" :options="options">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th class="text-center">Rôle</th>
                        </tr>
                    </thead>
                    <template #roles="props">
                        {{ props.cellData.map(role => role.label).join(', ') }}
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
import { useCrudStore } from '@/stores/crudStore';
import DataTablesCore from 'datatables.net-bm';
import languageFr from 'datatables.net-plugins/i18n/fr-FR.mjs'
import 'datatables.net-responsive-dt';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const { url, rows: users } = storeToRefs(crudStore)
url.value = "api/users"
DataTable.use(DataTablesCore);
// DataTable.use(language);
const options = {
    //language: languageFr,
    language: {
        emptyTable: 'Pas d\'utilisateurs disponible.',
        entries: {
            _: 'utilisateurs',
            1: 'utilisateur'
        },
        search: "Rechercher",
        info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs',
        infoEmpty: 'Affichage de 0 à 0 sur 0 utilisateur',
        lengthMenu: "Afficher _MENU_ utilisateurs",
        zeroRecords: "Aucun utilisateur trouvée"

    },
}
const columns = ref([
    { data: 'name' },
    { data: 'email' },
    { data: 'telephone' },
    { data: 'roles', render: '#roles' },
    {
        data: null,
        render: '#action',
        title: 'Action',

    }
])
const data = ref([]);
const showEc = (id) => {
    router.push({ name: 'user-show', params: { id: id } })
}
onMounted(() => {
    crudStore.index().then(() => {
        data.value = users.value
    })
})
</script>

<style lang="css" scoped></style>