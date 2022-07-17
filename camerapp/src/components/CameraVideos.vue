<template>
    <div>
        <h3>Videos from {{ camera_name }}:</h3>
        <ul v-if="videos">
            <li v-for="video in videos" :key="video">
                <a :href="download_url(video.day)">{{ video.day }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '@/constants.js'

export default {
    name: 'CameraVideos',
    props: {
        camera_name: { type: String, required: true },
        camera_id: { type: Number, required: true }
    },
    data() {
        return { videos: null }
    },
    created() {
        axios.get(`${BASE_URL}/cameras/${this.camera_id}/videos/`)
            .then((response) => this.videos = response.data)
            .catch((error) => console.log(error))
    },
    methods: {
        download_url(date) {
            return `${BASE_URL}/cameras/${this.camera_id}/videos/download/${date}` }
        }
    }
</script>