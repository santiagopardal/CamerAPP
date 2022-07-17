<template>
  <div>
    <h1><a :href="url">{{ name }}</a></h1>
    <p>Running on IP {{ ip }}</p>
    <CameraVideos :camera_id="id" :camera_name="name"/>
  </div>
</template>

<script>
import CameraVideos from "@/components/CameraVideos";

export default {
  name: 'BaseCamera',
  components: {
    CameraVideos,
  },
  props: {
    name: { type: String, required: true },
    ip: { type: String, required: true },
    http_port: { type: Number, required: true },
    brand: { type: String, required: false },
    model: { type: String, required: false },
    id: { type: Number, required: true }
  },
  computed: {
    url() { return `http://${this.ip}:${this.http_port}` }
  }
}
</script>