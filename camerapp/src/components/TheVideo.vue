<template>
    <div>
        <video :src="url" autoplay="true" controls/>
    </div>
</template>

<script>
import { BASE_URL } from '@/constants.js'
export default {
    name: "TheVideo",
    props: {
        camera: { type: Number, required: true },
        date: { type: String, required: true },
    },
    data(){
        return {
            url: ''
        }
    },
    watch: {
        date: function (newDate) { this.url = `${BASE_URL}/cameras/${this.camera}/videos/stream/${newDate}` }
    }
}
</script>

<style scoped>

</style>