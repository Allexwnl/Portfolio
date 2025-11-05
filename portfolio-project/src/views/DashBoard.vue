<template>
    <NavBar />
    <div class="dashboard flex flex-col items-center justify-center pt-[150px]">
      <h2 class="dashboardTitle">Project Dashboard</h2>
  
      <section class="--newProjectContainer">
        <h3 class="sectionTitle text-black">Nieuw Project</h3>
  
        <input v-model="title" placeholder="Titel" class="inputFiel" />
        <textarea v-model="description" placeholder="Beschrijving"
          class="inputField w-[350px] h-[300px] border-[#00FF85] border-2 p-4 rounded-[10px]"></textarea>
  
        <!-- Front image -->
        <label>Front Image</label>
        <input type="file" @change="handleFrontImage" class="inputFile border p-2 rounded" />
  
        <!-- Drag & Drop lijst van overige afbeeldingen -->
        <label class="mt-2">Overige Afbeeldingen</label>
        <input type="file" multiple @change="handleFiles" class="inputFile border p-2 rounded mt-1" />
  
        <draggable v-model="files" class="flex flex-col gap-2 mt-2">
          <template #item="{ element }">
            <div v-if="element instanceof File" class="flex items-center gap-2 border p-2 rounded">
              <span>{{ element.name }}</span>
              <img :src="URL.createObjectURL(element)" alt="preview" class="w-16 h-16 object-cover rounded" />
            </div>
          </template>
        </draggable>
  
        <!-- Links input -->
        <input v-model="linkName" placeholder="Link naam" class="inputField mt-2" />
        <input v-model="linkUrl" placeholder="Link URL" class="inputField mt-2" />
  
        <button @click="addProject" class="addButton mt-4">
          Voeg project toe
        </button>
      </section>
  
      <!-- Project weergave -->
      <section class="flex flex-row flex-wrap justify-center items-center gap-10 mt-10">
        <div v-for="(project, index) in projects" :key="project.id" class="--projectCard"
          :class="{ 'visible': project.visible }" :style="{ '--index': index }">
          <div class="w-full h-full rounded-[100px] flex justify-center mt-[50px] overflow-hidden">
            <img :src="project.images[0]" class="--projectCardImg" alt="Project afbeelding" />
          </div>
          <div class="--projectCardInfo">
            <div class="--projectCardInfoContainer">
              <h3 class="--projectTitle">{{ project.title }}</h3>
              <ul>
                <li v-for="(link, i) in project.links" :key="i">
                  <a :href="link.url" target="_blank" class="text-blue-500 hover:underline">{{ link.name }}</a>
                </li>
              </ul>
              <div class="w-full flex justify-center">
                <button @click="deleteProject(project.id)"
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
  import draggable from 'vuedraggable'
  
  // Cloudinary config
const CLOUD_NAME = 'dlixm83gq'
const UPLOAD_PRESET = 'projectImages'
  
  // Reactieve data
  const title = ref('')
  const description = ref('')
  const frontImage = ref(null) // aparte front image
  const files = ref([]) // overige afbeeldingen
  const projects = ref([])
  const linkName = ref('')
  const linkUrl = ref('')
  
  // Front image selectie
  const handleFrontImage = (e) => {
    const file = e.target.files[0]
    if (file) frontImage.value = file
  }
  
  // Overige afbeeldingen selectie
  const handleFiles = (e) => {
    files.value = Array.from(e.target.files)
  }
  
  // Projecten ophalen
  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false })
    if (error) return console.error(error)
    projects.value = data.map(p => ({ ...p, images: p.images || [], links: p.links || [] }))
  }
  
  // Upload naar Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData
    })
  
    const data = await res.json()
    return data.secure_url
  }
  
  // Project toevoegen
  const addProject = async () => {
    if (!title.value) return alert('Titel is verplicht')
  
    let frontUrl = ''
    if (frontImage.value instanceof File) {
      frontUrl = await uploadToCloudinary(frontImage.value)
    }
  
    const uploadedUrls = []
    for (const file of files.value) {
      if (file instanceof File) {
        const url = await uploadToCloudinary(file)
        uploadedUrls.push(url)
      }
    }
  
    // Zet front image altijd eerst
    const allImages = frontUrl ? [frontUrl, ...uploadedUrls] : uploadedUrls
  
    // Links array
    const projectLinks = []
    if (linkName.value && linkUrl.value) projectLinks.push({ name: linkName.value, url: linkUrl.value })
  
    // Opslaan in Supabase
    const { data, error: insertError } = await supabase.from('projects').insert([{
      title: title.value,
      description: description.value,
      images: allImages,
      links: projectLinks
    }]).select()
  
    if (insertError) return console.error(insertError)
  
    alert('Project toegevoegd!')
  
    // Reset formulier
    title.value = ''
    description.value = ''
    frontImage.value = null
    files.value = []
    linkName.value = ''
    linkUrl.value = ''
  
    fetchProjects()
  }
  
  // Project verwijderen
  const deleteProject = async (projectId) => {
    const { error } = await supabase.from('projects').delete().eq('id', projectId)
    if (error) console.error(error)
    fetchProjects()
  }
  
  onMounted(() => fetchProjects())
  </script>
  