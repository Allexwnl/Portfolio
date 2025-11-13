<template>
    <NavBar />
    <MobileNavbar />
    <div class="pt-[150px]">
        <button class="--backBtn" @click="$router.back()">← Terug</button>
        <h2 class="text-center mb-4">Blogs</h2>
        <div class="--blogContainer">
            <router-link v-for="post in posts" :key="post.id" :to="`/blogs/${post.id}`" class="--blog hover:text-white">
                <div class="--blogImgContainer">
                    <img v-if="post.front_image" :src="post.front_image" alt="Front Image"
                        class="--blogImg" />
                </div>

                <h3>{{ post.title }}</h3>
                <p class="--blogDate">
                    {{ formatDate(post.date_from) }} → {{ formatDate(post.date_to) }}
                </p>
                <router-link :to="`/blogs/${post.id}`"
                class="mt-2 mb-2">
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
    <FooTer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/supabase.js'
import NavBar from '../components/NavBar.vue'
import MobileNavbar from '../components/MobileNavbar.vue'
import FooTer from '../components/FooTer.vue'

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
