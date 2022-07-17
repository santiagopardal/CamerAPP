<template>
    <div class="app">
        <SideBar />
        <router-view/>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar";
export default {
  name: 'App',
    components: {SideBar}
}
</script>

<style lang="scss">
</style>