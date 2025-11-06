<template>
  <div class="max-w-3xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Laatste Blogs</h2>
    <div class="grid gap-6">
      <div v-for="post in posts.slice(0,3)" :key="post.id" class="border rounded-xl p-4 hover:shadow-md transition">
        <img v-if="post.front_image" :src="post.front_image" alt="Front Image" class="w-full h-64 object-cover rounded mb-4" />
        <h3 class="text-xl font-bold mb-1">{{ post.title }}</h3>
        <p class="text-gray-600 mb-2">{{ post.description }}</p>
        <p class="text-sm text-gray-500 mb-2">
          {{ formatDate(post.date_from) }} → {{ formatDate(post.date_to) }}
        </p>
        <div class="flex flex-wrap gap-2">
          <span v-for="(tag, i) in post.tags" :key="i" class="bg-sky-200 text-sky-700 text-sm px-2 py-1 rounded-full">
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center mt-6">
        <router-link
          to="/blogs"
          class="text-sky-600 hover:text-sky-800 font-semibold"
        >
          Bekijk alle blogs →
        </router-link>
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/supabase.js'

const posts = ref([])

onMounted(async () => {
  const { data, error } = await supabase.from('Blog').select('*').order('date_from', { ascending: false })
  if (!error) posts.value = data
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nl-NL', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>
