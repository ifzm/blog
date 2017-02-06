<template>
    <label class="radio">
        <div class="radio-container" :class="classes">
            <input
                type="radio"
                :id="id"
                :name="name"
                :value="value"
                :disabled="disabled"
                @change="toggle"
            >
        </div>
        <span class="radio-text" v-if="$slots.default">
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
            values: null,
            class: String,
            disabled: Boolean
        },
        computed: {
            classes() {
                return {
                    checked: this.value && this.value.toString() === this.values.toString(),
                    disabled: this.disabled
                }
            }
        },
        methods: {
            toggle(e) {
                this.$emit('input', this.values, e)
            }
        }
    }
</script>

<style lang="css">
    .radio {
        width: auto;
        margin: 8px 8px 8px 0;
        display: inline-flex;
        position: relative;
    }
    
    .radio-container {
        width: 16px;
        height: 16px;
        position: relative;
        display: inline-block;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, .54);
        transition: all .3s cubic-bezier(.25, .8, .25, 1);
    }
    
    .radio-container:after {
        position: absolute;
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
        border-radius: 50%;
        opacity: 0;
        transform: scale3D(0.38, 0.38, 1);
        transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
        content: " ";
    }
    
    .radio-container.checked {
        border-color: #2196f3;
    }
    
    .radio-container.checked:after {
        background-color: #2196f3;
    }
    
    .radio.success .radio-container.checked {
        border-color: #5bb75b;
    }
    
    .radio-container.disabled {
        border-color: rgba(0, 0, 0, 0.26);
    }
    
    .radio-container.checked.disabled {
        background-color: rgba(0, 0, 0, 0.26);
        border-color: transparent;
    }
    
    .radio-container.checked:after {
        opacity: 1;
        transform: rotate(45deg) scale3D(1, 1, 1);
    }
    
    .radio-container input {
        display: none;
    }
    
    .radio-label {
        height: 16px;
        line-height: 16px;
        padding-left: 8px;
        font-size: .9em;
    }
    
    .radio-text {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        font-size: .9em;
        padding-left: 8px;
    }
    
    .radio-container.disabled+.radio-text {
        color: rgba(0, 0, 0, 0.26);
    }
</style>