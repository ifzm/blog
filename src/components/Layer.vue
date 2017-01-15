<template>
    <div class="layer" @click="close" @keyup.esc="close"></div>
</template>

<script>
    export default {
        methods: {
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="css">
    .layer {
        z-index: 99;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.54);
        transform: translate3d(0, 0, 0);
        transition: all .5s cubic-bezier(.35, 0, .25, 1);
    }
    
    .layer.active {
        opacity: 1;
        pointer-events: auto;
    }
    
    .layer.transparent {
        background: rgba(0, 0, 0, 0.54);
    }
</style>