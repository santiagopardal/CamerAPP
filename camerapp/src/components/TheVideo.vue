<template>
  <div>
    <video width="1000" controls>
      <source src="http://localhost:8080/api/cameras/2/videos/stream/17-07-2022" type="video/mp4">
    </video>
  </div>
</template>

<script>

export default {
  name: "TheVideo",
}
</script>

<style scoped>

</style>