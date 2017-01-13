<template>
    <div class="dialog-container" :class="classes" ref="dialog" @keyup.esc.stop="close" tabindex="0">
        <div class="dialog">
            <div class="dialog-title" v-if="title">{{ title }}</div>

            <div class="dialog-content" v-if="content">{{ content }}</div>
            <div class="dialog-content" v-else>
                <slot></slot>
            </div>
            
            <div class="dialog-actions">
                <button class="btn" v-if="cancel" @click="close('cancel')">{{ cancel }}</button>
                <button class="btn" @click="close('confirm')">{{ confirm }}</button>
            </div>
        </div>
        
        <layer class="dialog-layer" :class="classes" @close="close()"></layer>
    </div>
</template>

<script>
    import Layer from './Layer'

    export default {
        components: {
            Layer
        },
        props: {
            title: String,
            content: String,
            confirm: {
                type: String,
                default: 'Confirm'
            },
            cancel: {
                type: String,
                default: 'Cancel'
            }
        },
        data() {
            return {
                active: false
            }
        },
        computed: {
            classes() {
                return {
                    active: this.active
                }
            }
        },
        methods: {
            open() {
                this.$root.$el.appendChild(this.$el)
                this.active = true

                this.$emit('open')
            },
            close(type) {
                if (this.$root.$el.contains(this.$el)) {
                    this.$nextTick(() => {
                        let cleanElement = () => {
                            let activeRipple = this.$el.querySelector('.dialog.active');
                            if (activeRipple) {
                                activeRipple.classList.remove('active');
                            }

                            this.$el.removeEventListener('transitionend', cleanElement)
                            this.$root.$el.removeChild(this.$el);
                        }

                        setTimeout(() => {
                            this.$el.addEventListener('transitionend', cleanElement)
                        })

                        this.$emit('close')
                    })
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
        will-change: opacity, transform;
        background-color: #fff;
        color: #000;
    }
    
    .dialog-title {
        margin-bottom: 20px;
        padding: 24px 24px 0;
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
    
    .dialog-actions .btn {
        min-width: 64px;
        margin: 0;
        padding: 0 8px;
    }
    
    .dialog-actions .btn+.btn {
        margin-left: 8px;
    }
</style>