<template>
  <nav class="--navbar">
    <ul>
      <li><h3 class="font-bold"><a href="/">Alexander Zoet</a></h3></li>
    </ul>
    <ul class="flex flex-row gap-8">
      <li>Projects</li>
      <li>contact</li>
    </ul>
    <ul>
        <li>Dark Mode</li>
        <button v-if="user" @click="logout">Logout</button>
      </ul>
  </nav>
</template>

<script setup>
import { supabase } from '../supabase/supabase.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}
</script>