<template>
    <div class="lg:w-full lg:min-h-screen lg:flex bg-slate-100 text-black">
        <div class="bg-white" :class="isNavBar ? 'w-1/5' : ''" v-if="isNavBar">
            <div class="h-12 border-b flex justify-between items-center">
                <p class="m-1 text-xl text-sky-600 font-semibold">Menus</p>
                <font-awesome-icon :icon="faXmark" size="3x" class="m-1 hover:cursor-pointer text-slate-300"
                    @click="isNavBar = false" />

            </div>
            <ul class="mt-3">
                <li>
                    <router-link :to="{ name: 'dashboard' }" class="h-12 flex justify-center items-center border-b"
                        :class="router.currentRoute.value.meta.activePath == 'dashboard' ? 'text-sky-600' : ''">
                        <font-awesome-icon :icon="faGauge" size="2x" class="hover:cursor-pointer w-1/5"
                            :class="router.currentRoute.value.meta.activePath == 'dashboard' ? 'text-sky-600' : ''"
                             />
                        <p class="w-4/5">
                            Tableau de bord
                        </p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'configs' }" class="h-12 flex justify-center items-center border-b"
                        :class="router.currentRoute.value.meta.activePath == 'config' ? 'text-sky-600' : ''">
                        <font-awesome-icon :icon="faGear" size="2x" class="hover:cursor-pointer w-1/5"
                            :class="router.currentRoute.value.meta.activePath == 'config' ? 'text-sky-600' : ''"
                             />
                        <p class="w-4/5">
                            Configurations
                        </p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'timetable-create' }" class="h-12 flex justify-center items-center border-b" :class="router.currentRoute.value.meta.activePath == 'timetables' ? 'text-sky-600' : ''">
                        <font-awesome-icon :icon="faCalendarWeek" size="2x"
                            class="hover:cursor-pointer w-1/5" :class="router.currentRoute.value.meta.activePath == 'timetables' ? 'text-sky-600' : ''"  />
                        <p class="w-4/5">
                            Créer un emplois du temps
                        </p>
                    </router-link>
                </li>

            </ul>
        </div>
        <div :class="isNavBar ? 'w-4/5' : 'w-full'">
            <!-- header -->
            <div class="h-12 bg-white mb-5 flex items-center">
                <font-awesome-icon :icon="faBars" size="3x" class="m-1 hover:cursor-pointer text-slate-300"
                    v-if="!isNavBar" @click="isNavBar = true" />
                <div class="h-full w-full flex justify-between items-center">
                    <p class="p-2 flex items-center gap-1"> <font-awesome-icon :icon="faUser" size="1x" class="m-1 hover:cursor-pointer border p-2 rounded-full bg-slate-100 " />{{ user.name }} <span class="text-sky-600">(en ligne)</span></p>
                    <font-awesome-icon :icon="faSignOut" size="2x" class="m-1 hover:cursor-pointer " @click="logout" />
                    
                </div>
            </div>
            <slot />

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faBars, faGauge, faGear, faCalendarWeek, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import router from '@/router';
import { useUserStore } from '@/stores/utilisateur';
import { storeToRefs } from 'pinia';
import client from '@/axiosClient';
const userStore = useUserStore()
const {user} = storeToRefs(userStore)
const isNavBar = ref(true)
const logout = () => {
    client.get('api/logout').then(() => {
       router.push({name: "login"}); 
    })
}
</script>

<style lang="css" scoped></style>