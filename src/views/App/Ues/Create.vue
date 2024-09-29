<template>
    <Layout>
        <div class="p-5">
            <MiniHeader title="Créer une nouvelle unité d'enseignement" description="Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nulla rerum distinctio..." />
            <div>
                <form action="" class="bg-white w-2/3 p-2 mx-auto rounded-lg">
                    <div class="lg:mb-3">
                        <label for="code" class="lg:font-semibold lg:block lg:mb-1">Code</label>
                        <input type="text" id="code" class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3">
                        <label for="label" class="lg:font-semibold lg:block lg:mb-1">Label</label>
                        <input type="text" id="label" class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                    </div>
                    <div class="lg:mb-3">
                        <label for="filiere" class="lg:font-semibold lg:block lg:mb-1">Filière</label>
                        <select id="filiere" class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                            <option>Choisissez une filiere</option>
                        </select>
                    </div>
                    <div class="lg:mb-3">
                        <label for="semestre" class="lg:font-semibold lg:block lg:mb-1">Semestre</label>
                        <select id="semestre" class="lg:border lg:rounded lg:w-full h-10 lg:h-10 lg:p-2 focus:outline-sky-600">
                            <option>Choisissez un semestre</option>
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
import Layout from '../Layout.vue';
import MiniHeader from '@/components/MiniHeader.vue';
</script>

<style lang="css" scoped></style>