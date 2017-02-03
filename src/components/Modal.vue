<template>
    <div class="dialog-container" :class="classes" ref="dialog" @keyup.esc.stop="close" tabindex="0">
        <div class="dialog">
            <div class="dialog-title" v-if="options.title">{{ options.title }}</div>

            <div class="dialog-content" v-if="options.content" v-html="options.content"></div>
            <div class="dialog-content" v-else>
                <slot></slot>
            </div>

            <div class="dialog-actions">
                <button class="button" v-if="options.cancel" @click="close('cancel')">{{ options.cancel }}</button>
                <button class="button" @click="close('confirm')">{{ options.confirm }}</button>
            </div>
        </div>

        <layer class="dialog-layer" :class="classes" @close="close"></layer>
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
                active: false,
                options: {
                    title: String,
                    content: String,
                    cancel: String,
                    confirm: 'Ok'
                }
            }
        },
        computed: {
            classes() {
                return this.active && 'active'
            }
        },
        methods: {
            open(options) {
                Object.assign(this.options, options)

                this.$root.$el.appendChild(this.$el)

                setTimeout(() => {
                    this.active = true
                    this.$el.focus()
                })

                this.$emit('open')
            },
            close(type) {
                if (this.$root.$el.contains(this.$el)) {
                    this.active = false

                    setTimeout(() => {
                        this.$root.$el.removeChild(this.$el)
                    }, 400);

                    this.$emit('close', type)
                }
            }
        }
    }
</script>

<style lang="css">
    .dialog-container {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: column;
        flex-flow: column;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        pointer-events: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 108;
    }
    
    .dialog-container.active {
        pointer-events: auto;
    }
    
    .dialog-container.active .dialog {
        opacity: 1 !important;
        transform: scale(1) !important;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-property: opacity, transform;
    }
    
    .dialog-layer {
        position: fixed;
        z-index: 109;
    }
    
    .dialog {
        min-width: 280px;
        max-width: 80%;
        max-height: 80%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: column;
        flex-flow: column;
        overflow: hidden;
        position: relative;
        z-index: 110;
        outline: none;
        border-radius: 2px;
        opacity: 0;
        box-shadow: 0 7px 9px -4px rgba(0, 0, 0, 0.2), 0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12);
        transform: scale(0.9, 0.85);
        transform-origin: center center;
        transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s 0.05s cubic-bezier(0.25, 0.8, 0.25, 1);
        will-change: opacity, transform;
        background-color: #fff;
        color: #000;
    }
    
    .dialog-title {
        margin-bottom: 20px;
        padding: 24px 24px 0;
        font-size: 1.3em;
    }
    
    .dialog-content {
        padding: 0 24px 24px;
        -ms-flex: 1;
        flex: 1;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
        overflow: auto;
        position: relative;
        background: linear-gradient(to bottom, #fff 0, #fff 1px, transparent 1px), linear-gradient(to top, #fff 0, #fff 3px, transparent 3px), linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 0, rgba(0, 0, 0, 0.12) 1px, transparent 1px), linear-gradient(to top, rgba(0, 0, 0, 0.2) 1px, rgba(0, 0, 0, 0.2) 2px, transparent 2px);
        background-attachment: local, local, scroll, scroll;
    }
    
    .dialog-content:first-child {
        padding-top: 24px;
    }
    
    .dialog-actions {
        min-height: 52px;
        padding: 8px 8px 8px 24px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: end;
        justify-content: flex-end;
        position: relative;
    }
    
    .dialog-actions:before {
        height: 1px;
        position: absolute;
        top: -1px;
        right: 0;
        left: 0;
        background-color: #fff;
        content: " ";
    }
    
    .dialog-actions .button {
        min-width: 64px;
        margin: 0;
        padding: 0 8px;
        color: #2196f3;
        text-transform: uppercase;
    }
    
    .dialog-actions .button+.button {
        margin-left: 8px;
    }
</style>