<template>
    <div class="sidenav" :class="classes" @keyup.esc="close" tabindex="0">
        <div class="sidenav-content">
            <slot></slot>
        </div>

        <layer class="sidenav-layer" @close="close" />
  </div>
</template>

<script>
    import Layer from './Layer'

    export default {
        methods: {
            open() {

            },
            close() {

            }
        }
    }
</script>

<style lang="css">

</style>