<template>
  <NavBar />
  <MobileNavbar />
  <div class="pt-[150px]">
  <button class="--backBtn" @click="$router.back()">← Terug</button>
    <div v-if="blog">
      <img v-if="blog.front_image" :src="blog.front_image" class="w-full rounded-lg mb-4" />
      <h1 class="text-3xl font-bold mb-2">{{ blog.title }}</h1>
      <p class="text-gray-500 text-sm mb-4">{{ blog.date_from }} → {{ blog.date_to }}</p>
      <div v-html="renderMarkdown(blog.description)" class="prose"></div>
      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="tag in blog.tags" :key="tag" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
          #{{ tag }}
        </span>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { supabase } from '../supabase/supabase.js'
import { useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import MobileNavbar from '../components/MobileNavbar.vue'

const route = useRoute()
const blog = ref(null)
const renderMarkdown = (text) => marked.parse(text || '')

onMounted(async () => {
  const { data, error } = await supabase
    .from('Blog')
    .select('*')
    .eq('id', route.params.id)
    .single()
  if (error) console.error(error)
  blog.value = data
})
</script>