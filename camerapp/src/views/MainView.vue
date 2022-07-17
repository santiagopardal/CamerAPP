<template>
    <div>
        <BaseCamera :v-if="cameras" v-for="camera in cameras"
                :key="camera.ip" brand="Foscam" :http_port="parseInt(camera.http_port)" :ip="camera.ip"
                :name="camera.name" :model="camera.model" :id="camera.id"/>
    </div>
</template>

<script>
import BaseCamera from '@/components/BaseCamera.vue'
import axios from 'axios'
import { BASE_URL } from '@/constants.js'

export default {
    name: 'MainView',
    components: {
        BaseCamera
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