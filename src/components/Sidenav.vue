<template>
    <div class="md-sidenav" :class="classes" @keyup.esc="close" tabindex="0">
        <div class="md-sidenav-content">
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