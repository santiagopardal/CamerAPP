<template>
    <div>
        <video controls>
            <source :src="url" type="video/mp4">
        </video>
    </div>
</template>

<script>
import { BASE_URL } from '@/constants.js'
export default {
    name: "TheVideo",
    props: {
        camera: { type: Number, required: true },
        date: { type: String, required: true }
    },
    computed: {
        url() { return `${BASE_URL}/cameras/${this.camera}/videos/download/${this.date}` }
    }
}
</script>

<style scoped>

</style>