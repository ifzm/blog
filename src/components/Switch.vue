<template>
    <label class="switch">
        <div class="switch-container" :class="classes">
            <div class="switch-thumb" :style="styles">
                <span class="switch-holder"></span>
                <input
                    type="checkbox"
                    :id="id"
                    :name="name"
                    :value="value"
                    :disabled="disabled"
                    :checked="isCheck ? 'checked' : ''"
                    @change="toggle"
                >
            </div>
        </div>
        <span class="switch-text" v-if="$slots.default">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    export default {
        props: {
            id: String,
            name: String,
            value: null,
            class: String,
            checked: Boolean,
            disabled: Boolean
        },
        data() {
            return {
                isCheck: this.checked,
                leftPos: this.checked || this.disabled ? '75%' : '-1px'
            }
        },
        computed: {
            classes() {
                return {
                    checked: this.isCheck,
                    disabled: this.disabled
                }
            },
            styles() {
                return {
                    transform: `translate3D(${this.leftPos}, -50%, 0)`
                }
            }
        },
        methods: {
            toggle(e) {
                this.isCheck = e.target.checked
                this.leftPos = this.isCheck ? '75%' : '-1px'
            }
        }
    }
</script>

<style lang="css">
    .switch {
        width: auto;
        margin: 8px 8px 8px 0;
        display: inline-flex;
        position: relative;
    }
    
    .switch .switch-container {
        width: 34px;
        height: 14px;
        position: relative;
        border-radius: 14px;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        background-color: rgba(0, 0, 0, 0.38);
    }
    
    .switch .switch-container .switch-thumb {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 0;
        background-color: #fafafa;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
        transition: all 0.15s linear;
    }
    
    .switch .switch-container input {
        display: none;
    }
    
    .switch .switch-container .switch-holder {
        width: 40px;
        height: 40px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        background: none;
        border: none;
        transform: translate(-50%, -50%);
    }
    
    .switch .switch-label {
        height: 16px;
        line-height: 16px;
        padding-left: 8px;
        font-size: .9em;
    }
    
    .switch .switch-text {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        font-size: .9em;
        padding-left: 8px;
    }
    
    .switch .switch-container.disabled+.switch-text {
        color: rgba(0, 0, 0, 0.26);
    }
    
    .switch .switch-container.disabled {
        background-color: rgba(0, 0, 0, 0.12);
    }
    
    .switch .switch-container.disabled .switch-thumb {
        background-color: #bdbdbd;
    }
    
    .switch .switch-container.checked {
        background-color: rgba(33, 150, 243, 0.5);
    }
    
    .switch .switch-container.checked .switch-thumb {
        background-color: #2196f3;
    }
    
    .switch.success .switch-container.checked {
        background-color: rgba(91, 183, 91, 0.5);
    }
    
    .switch.success .switch-container.checked .switch-thumb {
        background-color: #5bb75b;
    }
</style>