<template>
    <div class="sidenav sidenav-left fixed" :class="classes" @keyup.esc="close" tabindex="0">
        <div class="sidenav-content">
            <slot></slot>
        </div>

        <layer class="sidenav-layer" @close="close"></layer>
  </div>
</template>

<script>
    import Layer from './Layer'

    export default {
        components: {
            Layer
        },
        data() {
            return {
                show: false
            }
        },
        computed: {
            classes() {
                return this.show && 'active'
            }
        },
        methods: {
            open() {
                this.show = true
                this.$el.focus()
                this.$emit('open')
            },
            close() {
                this.show = false
                this.$el.blur()
                this.$emit('close')
            },
            toggle() {
                this.show ? this.close() : this.open()
            }
        }
    }
</script>

<style lang="css">
    .sidenav.sidenav-left .sidenav-content {
        left: 0;
        transform: translate3D(-100%, 0, 0);
    }

    .sidenav.fixed .sidenav-content,
    .sidenav.fixed .sidenav-layer {
        position: fixed;
    }

    .sidenav .sidenav-content {
        width: 304px;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 999;
        pointer-events: none;
        overflow: auto;
        background-color: #fff;
        color: rgba(0, 0, 0, .87);
        -webkit-overflow-scrolling: touch;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-property: transform;
        will-change: transform;
    }

    .sidenav.active .sidenav-content {
        box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
        pointer-events: auto;
        transform: translate3D(0, 0, 0);
    }

    .sidenav .sidenav-layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.54);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
        transition-property: opacity;
        will-change: opacity;
    }

    .sidenav.active .sidenav-layer {
        opacity: 1;
        pointer-events: auto;
    }
</style>
