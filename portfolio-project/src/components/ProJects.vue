<template>
        <div v-for="(project, index) in projects" :key="project.id" class="--projectCard"
            :class="{ 'visible': project.visible }" :style="{ '--index': index }">
            <div class="w-full h-full rounded-[100px] flex justify-center mt-[50px] overflow-hidden">
                <img :src="project.images[project.currentImage]" class="--projectCardImg" alt="Project afbeelding" />
            </div>
            <div
                class="--projectCardInfo">
                <div class="--projectCardInfoContainer">
                    <h3 class="mb-6 text-center">{{ project.title }}</h3>
                    <div class="w-full flex justify-center">
                        <button class="mb-6 --projectCardBtn" @click="goToProject(project.id)">Bekijk
                            project</button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>
import { supabase } from '../supabase/supabase.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProject = (id) => {
    router.push(`/project/${id}`)
}

const projects = ref([])
const projectsSection = ref(null)

const fetchProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

    if (error) return

    projects.value = data.map(p => ({
        ...p,
        images: p.images || [],
        currentImage: 0,
        visible: false,
    }))
}

onMounted(() => {
    fetchProjects().then(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        projects.value.forEach((p, i) => {
                            setTimeout(() => {
                                p.visible = true
                            }, i * 100)
                        })
                        observer.disconnect()
                    }
                })
            },
            {
                threshold: 0.1,
            }
        )

        if (projectsSection.value) {
            observer.observe(projectsSection.value)
        }
    })
})

onMounted(() => {
    fetchProjects()
})
</script>