<template>
    <div>
        <router-view />
    </div>
</template>

<script>
import BaseCamera from '@/components/BaseCamera.vue'
import TheVideo from '@/components/TheVideo.vue'
import axios from 'axios'
import { BASE_URL } from '@/constants.js'

export default {
    name: 'LoggedInView',
    components: {
        BaseCamera,
        TheVideo
    },
    data() {
        return {
            cameras: null
        }
    },
    created() {
        axios.get(`${BASE_URL}/cameras`)
            .then((response) => this.cameras = response.data)
            .catch((error) => console.log(error))
    }
}
</script>