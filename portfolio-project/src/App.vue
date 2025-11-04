<script setup>
import NavBar from './components/NavBar.vue';
import FooTer from './components/FooTer.vue';
import { ref, onMounted, onUnmounted } from "vue";
import { addProject, listenProjects } from "../src/services/projects";

const projects = ref([]);
const newProjectName = ref("");

// Toevoegen nieuw project
const addNewProject = async () => {
    if (!newProjectName.value) return;
    await addProject({ name: newProjectName.value, createdAt: new Date() });
    newProjectName.value = "";
};

// Realtime updates
let unsubscribe;
onMounted(() => {
    unsubscribe = listenProjects((data) => {
        projects.value = data;
    });
});
onUnmounted(() => {
    if (unsubscribe) unsubscribe();
});

// Datum formatteren
const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
};
</script>

<template>
    <NavBar />
    <div class="--mainContainer">
        <div class="--textContainer">
            <h1>Alexander Zoet</h1>
            <p>Ik ben Alexander Zoet, een enthousiaste front-end developer die graag nieuwe technieken ontdekt. Mijn
                specialiteit is het ontwerpen van gebruiksvriendelijke websites met moderne tools zoals HTML/CSS,
                JavaScript en
                Tailwind. Momenteel studeer ik aan de BIT Academy en ben ik bezig mijn kennis van JavaScript verder te
                verdiepen.
            </p>
            <div class="mt-5 gap-8 flex">
                <button>Projecten</button>
                <button>Contact</button>
            </div>
        </div>
        <div class="--imageContainer">
            <img src="../public/img/Ik.png" alt="">
        </div>
    </div>
    <div id="projects">
        <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 class="text-3xl font-bold mb-6">Mijn Portfolio</h1>

            <!-- Formulier om nieuw project toe te voegen -->
            <div class="flex space-x-2 mb-6 max-w-md w-full">
                <input v-model="newProjectName" type="text" placeholder="Nieuw project"
                    class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button @click="addNewProject" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Toevoegen
                </button>
            </div>

            <!-- Lijst met projecten -->
            <ul class="space-y-4 w-full max-w-md">
                <li v-for="p in projects" :key="p.id"
                    class="bg-white p-4 rounded shadow flex justify-between items-center">
                    <span>{{ p.name }}</span>
                    <span class="text-gray-400 text-sm">{{ formatDate(p.createdAt) }}</span>
                </li>
            </ul>
        </div>
    </div>
    <FooTer />
</template>
