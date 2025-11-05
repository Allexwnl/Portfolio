<template>
    <NavBar />
    <div class="dashboard flex flex-col items-center justify-center pt-[150px]">
        <h1 class="dashboardTitle">Project Dashboard</h1>

        <section class="--newProjectContainer">
            <h2 class="sectionTitle text-black">Nieuw Project</h2>

            <input v-model="title" placeholder="Titel" class="inputField bg-white border-[#00FF85] border-2 p-4 w-full rounded-[100px]" />
            <textarea v-model="description" placeholder="Beschrijving" class="inputField w-[350px] h-[300px] border-[#00FF85] border-2 p-4 rounded-[10px]"></textarea>

            <input type="file" multiple @change="handleFiles" class="inputFile border-[#00FF85] border-2 p-4 rounded-[10px] text-black hover:bg-[#00FF85] hover:cursor-pointer" />

            <button @click="addProject" class="addButton">
                Voeg project toe
            </button>
        </section>
        <section class="flex flex-row flex-wrap justify-center items-center gap-10">
            <div v-for="(project, index) in projects" :key="project.id" class="--projectCard"
                :class="{ 'visible': project.visible }" :style="{ '--index': index }">
                <div class="w-full h-full rounded-[100px] flex justify-center mt-[50px] overflow-hidden">
                    <img :src="project.images[project.currentImage]" class="--projectCardImg"
                        alt="Project afbeelding" />
                </div>
                <div class="--projectCardInfo">
                    <div class="--projectCardInfoContainer">
                        <h3 class="--projectTitle">{{ project.title }}</h3>
                        <div class="w-full flex justify-center">
                            <button @click="deleteProject(project.id, project.images)"
                                class="deleteButton mb-6 w-full --projectCardBtn">
                                Verwijder project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import { supabase } from '../supabase/supabase.js'
import { ref, onMounted } from 'vue'

const supabaseUrl = 'https://lxspfsdaxqyicwpdxsbb.supabase.co'

// Reactieve data
const title = ref('')
const description = ref('')
const files = ref([])
const projects = ref([])

// Bestand selectie
const handleFiles = (e) => {
    files.value = Array.from(e.target.files)
    console.log('Geselecteerde bestanden:', files.value)
}

// Projecten ophalen
const fetchProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

    if (error) {
        console.error('❌ Fout bij ophalen projecten:', error.message)
        return
    }

    projects.value = data.map((p) => ({
        ...p,
        images: p.images || [],
        currentImage: 0,
    }))
}

// Volgende afbeelding
const nextImage = (project) => {
    if (!project.images.length) return
    project.currentImage = (project.currentImage + 1) % project.images.length
}

// Vorige afbeelding
const prevImage = (project) => {
    if (!project.images.length) return
    project.currentImage =
        (project.currentImage - 1 + project.images.length) % project.images.length
}

// Project toevoegen
const addProject = async () => {
    console.log('▶️ addProject functie gestart')

    if (!title.value) return alert('Titel is verplicht')

    const uploadedUrls = []

    // Afbeeldingen uploaden
    if (files.value.length) {
        for (const file of files.value) {
            if (!(file instanceof File)) continue

            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(fileName, file)

            if (uploadError) {
                console.error('❌ Upload fout:', uploadError.message)
                continue
            }

            const publicUrl = `${supabaseUrl}/storage/v1/object/public/project-images/${fileName}`
            uploadedUrls.push(publicUrl)
        }
    }

    const { data, error: insertError } = await supabase
        .from('projects')
        .insert([
            {
                title: title.value,
                description: description.value,
                images: uploadedUrls,
            },
        ])
        .select()

    if (insertError) {
        console.error('❌ Fout bij toevoegen project:', insertError.message)
        alert('Fout bij toevoegen project: ' + insertError.message)
        return
    }

    console.log('✅ Project toegevoegd:', data)
    alert('Project toegevoegd!')

    title.value = ''
    description.value = ''
    files.value = []

    fetchProjects()
}

// Project verwijderen
const deleteProject = async (projectId, imagesArray) => {
    for (const url of imagesArray) {
        try {
            const path = url.split('/project-images/')[1]
            if (!path) continue
            const { error } = await supabase.storage.from('project-images').remove([path])
            if (error) console.error('Storage delete error:', error.message)
        } catch (err) {
            console.error('Storage delete exception:', err)
        }
    }

    const { error: delError } = await supabase.from('projects').delete().eq('id', projectId)
    if (delError) console.error('Delete project error:', delError.message)

    fetchProjects()
}

onMounted(() => {
    fetchProjects()
})
</script>

<style scoped>
.imageCarousel {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 10px;
}

.carouselImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
