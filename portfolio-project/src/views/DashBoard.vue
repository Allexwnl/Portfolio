<template>
    <NavBar />
  
    <div class="dashboard flex flex-col items-center justify-center pt-[150px]">
      <h2 class="dashboardTitle mb-10">Project Dashboard</h2>
  
      <!-- 🎨 Nieuw Project -->
      <section class="--newProjectContainer w-full max-w-2xl mb-20">
        <h3 class="sectionTitle text-black mb-4">Nieuw Project</h3>
  
        <div class="w-full">
          <label class="mt-2">Titel</label>
          <input v-model="projectTitle" placeholder="Titel" class="inputField w-full" />
        </div>
  
        <div class="w-full mt-4">
          <label>Beschrijving (Markdown ondersteund)</label>
          <textarea
            v-model="projectDescription"
            placeholder="Gebruik **Markdown** voor opmaak..."
            class="inputField w-full h-[200px] border-[#00FF85] border-2 p-4 rounded-[10px] font-mono"
          ></textarea>
        </div>
  
        <!-- Preview -->
        <div v-if="projectDescription" class="mt-4 p-4 border rounded bg-gray-50">
          <h4 class="font-semibold mb-2">Voorbeeld:</h4>
          <div v-html="renderMarkdown(projectDescription)" class="prose"></div>
        </div>
  
        <div class="w-full mt-4">
          <label>Front Image</label>
          <input type="file" @change="handleProjectFrontImage" class="inputFile border p-2 rounded w-full" />
        </div>
  
        <div class="w-full mt-4">
          <label>Overige Afbeeldingen</label>
          <input type="file" multiple @change="handleProjectFiles" class="inputFile border p-2 rounded w-full" />
        </div>
  
        <draggable v-model="projectFiles" class="flex flex-col gap-2 mt-2">
          <template #item="{ element }">
            <div v-if="element instanceof File" class="flex items-center gap-2 border p-2 rounded">
              <span>{{ element.name }}</span>
              <img :src="URL.createObjectURL(element)" alt="preview" class="w-16 h-16 object-cover rounded" />
            </div>
          </template>
        </draggable>
  
        <div class="w-full mt-4">
          <label>Link naam</label>
          <input v-model="projectLinkName" placeholder="Link naam" class="inputField w-full mt-2" />
        </div>
  
        <div class="w-full mt-4">
          <label>Link URL</label>
          <input v-model="projectLinkUrl" placeholder="Link URL" class="inputField w-full mt-2" />
        </div>
  
        <button @click="addProject" class="addButton mt-6 bg-green-600 text-white px-6 py-2 rounded shadow">
          Voeg Project Toe
        </button>
      </section>
  
      <!-- 🧩 Projecten overzicht -->
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
                <button @click="deleteProject(project.id)" class="deleteButton mb-6 w-full --projectCardBtn">
                  Verwijder project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="--newBlogContainer mt-20 w-full max-w-2xl">
        <h3 class="sectionTitle text-black mb-4">Nieuwe Blogpost</h3>
  
        <form @submit.prevent="addBlog" class="flex flex-col gap-4">
          <div>
            <label class="block font-semibold mb-1">Titel</label>
            <input v-model="blogTitle" class="w-full border rounded p-2" placeholder="Titel van je blog" />
          </div>
  
          <div>
            <label class="block font-semibold mb-1">Beschrijving (Markdown ondersteund)</label>
            <textarea
              v-model="blogDescription"
              class="w-full border rounded p-2 font-mono"
              rows="10"
              placeholder="Gebruik Markdown voor kopjes, lijsten, vetgedrukt, etc."
            ></textarea>
          </div>
  
          <!-- Preview -->
          <div v-if="blogDescription" class="mt-4 p-4 border rounded bg-gray-50">
            <h4 class="font-semibold mb-2">Voorbeeld:</h4>
            <div v-html="renderMarkdown(blogDescription)" class="prose"></div>
          </div>
  
          <div class="flex gap-4">
            <div class="flex flex-col flex-1">
              <label class="font-semibold mb-1">Datum van</label>
              <input type="date" v-model="blogDateFrom" class="border rounded p-2" />
            </div>
            <div class="flex flex-col flex-1">
              <label class="font-semibold mb-1">Datum tot</label>
              <input type="date" v-model="blogDateTo" class="border rounded p-2" />
            </div>
          </div>
  
          <div>
            <label class="block font-semibold mb-1">Tags</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="(tag, i) in blogTags"
                :key="i"
                class="bg-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {{ tag }}
                <button type="button" @click="removeBlogTag(i)" class="text-red-500 font-bold">×</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="newBlogTag"
                @keyup.enter.prevent="addBlogTag"
                class="border rounded p-2 flex-1"
                placeholder="Typ een tag en druk op Enter"
              />
              <button type="button" @click="addBlogTag" class="bg-sky-500 text-white rounded px-4 py-2">+</button>
            </div>
          </div>
  
          <div>
            <label class="block font-semibold mb-1">Front Image</label>
            <input type="file" @change="handleBlogFrontImage" class="border p-2 rounded w-full" />
          </div>
  
          <button type="submit" class="bg-green-500 text-white px-6 py-2 rounded shadow">
            Opslaan
          </button>
        </form>
      </section>
    </div>
    <FooTer />
  </template>
  
  <script setup>
  import NavBar from '../components/NavBar.vue'
  import { supabase } from '../supabase/supabase.js'
  import { ref, onMounted } from 'vue'
  import draggable from 'vuedraggable'
  import { marked } from 'marked'
import FooTer from '../components/FooTer.vue'
  
  // Cloudinary config
  const CLOUD_NAME = 'dlixm83gq'
  const UPLOAD_PRESET = 'projectImages'
  
  // Markdown renderer
  const renderMarkdown = (text) => marked.parse(text || '')
  
  // Project data
  const projectTitle = ref('')
  const projectDescription = ref('')
  const projectFrontImage = ref(null)
  const projectFiles = ref([])
  const projectLinkName = ref('')
  const projectLinkUrl = ref('')
  const projects = ref([])
  
  // Blog data
  const blogTitle = ref('')
  const blogDescription = ref('')
  const blogDateFrom = ref('')
  const blogDateTo = ref('')
  const blogTags = ref([])
  const newBlogTag = ref('')
  const blogFrontImage = ref(null)
  
  // Handlers
  const handleProjectFrontImage = (e) => { const file = e.target.files[0]; if (file) projectFrontImage.value = file }
  const handleProjectFiles = (e) => { projectFiles.value = Array.from(e.target.files) }
  const handleBlogFrontImage = (e) => { const file = e.target.files[0]; if (file) blogFrontImage.value = file }
  
  // Tags
  const addBlogTag = () => { if (newBlogTag.value.trim() && !blogTags.value.includes(newBlogTag.value.trim())) { blogTags.value.push(newBlogTag.value.trim()); newBlogTag.value = '' } }
  const removeBlogTag = (i) => { blogTags.value.splice(i, 1) }
  
  // Cloudinary upload
  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, { method: 'POST', body: formData })
    const data = await res.json()
    return data.secure_url
  }
  
  // Fetch projecten
  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false })
    if (error) return console.error(error)
    projects.value = data.map(p => ({ ...p, images: p.images || [], links: p.links || [] }))
  }
  
  // Add Project
  const addProject = async () => {
    if (!projectTitle.value) return alert('Titel is verplicht')
    let frontUrl = ''
    if (projectFrontImage.value instanceof File) frontUrl = await uploadToCloudinary(projectFrontImage.value)
    const uploadedUrls = []
    for (const file of projectFiles.value) if (file instanceof File) uploadedUrls.push(await uploadToCloudinary(file))
    const allImages = frontUrl ? [frontUrl, ...uploadedUrls] : uploadedUrls
    const projectLinks = []
    if (projectLinkName.value && projectLinkUrl.value) projectLinks.push({ name: projectLinkName.value, url: projectLinkUrl.value })
  
    const { error } = await supabase.from('projects').insert([{
      title: projectTitle.value,
      description: projectDescription.value,
      images: allImages,
      links: projectLinks
    }])
  
    if (error) return console.error(error)
    alert('Project toegevoegd!')
    projectTitle.value = projectDescription.value = ''; projectFrontImage.value = null; projectFiles.value = []; projectLinkName.value = ''; projectLinkUrl.value = ''
    fetchProjects()
  }
  
  // Add Blog
  const addBlog = async () => {
    if (!blogTitle.value) return alert('Titel is verplicht')
    let frontUrl = ''
    if (blogFrontImage.value instanceof File) frontUrl = await uploadToCloudinary(blogFrontImage.value)
  
    const { error } = await supabase.from('Blog').insert([{
      title: blogTitle.value,
      description: blogDescription.value,
      date_from: blogDateFrom.value,
      date_to: blogDateTo.value,
      tags: blogTags.value,
      front_image: frontUrl
    }])
  
    if (error) return console.error(error)
    alert('Blog toegevoegd!')
    blogTitle.value = blogDescription.value = ''; blogDateFrom.value = ''; blogDateTo.value = ''; blogTags.value = []; blogFrontImage.value = null
  }
  
  // Delete project
  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) console.error(error)
    fetchProjects()
  }
  
  onMounted(() => fetchProjects())
  </script>
  