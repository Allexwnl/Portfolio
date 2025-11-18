<template>
    <div class="pt-[300px]">
        <h2 class="text-center mb-4">Laatste Blogs</h2>
        <div class="--blogContainer">
            <router-link v-for="post in posts.slice(0, 3)" :key="post.id" :to="`/blogs/${post.id}`" class="--blog">
                <div class="--blogImgContainer">
                    <img v-if="post.front_image" :src="post.front_image" alt="Front Image"
                        class="--blogImg" />
                </div>

                <h3>{{ post.title }}</h3>
                <p class="--blogDate">
                    {{ formatDate(post.date_from) }} → {{ formatDate(post.date_to) }}
                </p>
                <router-link :to="`/blogs/${post.id}`" class="">
                    Lees meer →
                </router-link>
                <div class="--blogTagContainer">
                    <span v-for="(tag, i) in post.tags" :key="i" class="--blogTag">
                        #{{ tag }}
                    </span>
                </div>
            </router-link>
        </div>
    </div>
    <div class="text-center mt-6">
        <router-link to="/blogs" class="text-sky-600 hover:text-sky-800 font-semibold">
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
