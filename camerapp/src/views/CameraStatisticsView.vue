<template>
    <h1>{{ camera.name }}</h1>
    <div>
        <p>Select a date</p>
        <input type="date" ref="date" @input="this.updateDate">
    </div>
    <p v-if="date">{{ video ? `Video from ${date}` : `No videos from ${date}` }}</p>
    <TheVideo v-if="date" :camera="camera.id" v-bind:date="date" />
</template>

<script>
import TheVideo from "@/components/TheVideo";
import axios from "axios";
import { BASE_URL } from "@/constants"

export default {
    name: "CameraStatisticsView",
    components: {TheVideo},
    data() {
        return {
            camera: {},
            date: null,
            video: true
        }
    },
    async created() {
        let data = await axios.get(`${BASE_URL}/cameras/${this.$route.params.camera}`)
        this.camera = data.data
    },
    methods: {
        updateDate() {
            this.date = this.$refs.date.value.split('-').reverse().join('-')
        }
    }
}
</script>

<style scoped>

</style>