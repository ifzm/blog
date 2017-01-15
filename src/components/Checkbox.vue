<template>
    <label class="checkbox">
        <div class="checkbox-container" :class="classes">
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
        <span class="checkbox-text" v-if="$slots.default">
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
                isCheck: this.checked
            }
        },
        computed: {
            classes() {
                return {
                    checked: this.isCheck,
                    disabled: this.disabled
                }
            }
        },
        methods: {
            toggle(e) {
                this.isCheck = e.target.checked
            }
        }
    }
</script>

<style lang="css">
    .checkbox {
        width: auto;
        margin: 8px 8px 8px 0;
        display: inline-flex;
        position: relative;
    }
    
    .checkbox-container {
        width: 16px;
        height: 16px;
        position: relative;
        display: inline-block;
        border-radius: 2px;
        border: 2px solid rgba(0, 0, 0, .54);
        transition: all .4s cubic-bezier(.25, .8, .25, 1);
    }
    
    .checkbox-container:before {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        transition: all .3s cubic-bezier(.55, 0, .55, .2);
        content: " ";
    }
    
    .checkbox-container:after {
        width: 4px;
        height: 9px;
        position: absolute;
        top: -1px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        opacity: 0;
        transform: rotate(45deg) scale3D(.15, .15, 1);
        transition: all .2s cubic-bezier(.55, 0, .55, .2);
        content: " ";
    }
    
    .checkbox-container.checked {
        background-color: #2196f3;
        border-color: #2196f3;
    }
    
    .checkbox.success .checkbox-container.checked {
        background-color: #5bb75b;
        border-color: #5bb75b;
    }
    
    .checkbox-container.disabled {
        border-color: rgba(0, 0, 0, 0.26);
    }
    
    .checkbox-container.checked.disabled {
        background-color: rgba(0, 0, 0, 0.26);
        border-color: transparent;
    }
    
    .checkbox-container.checked:after {
        opacity: 1;
        transform: rotate(45deg) scale3D(1, 1, 1);
    }
    
    .checkbox-container input {
        display: none;
    }
    
    .checkbox-label {
        height: 16px;
        line-height: 16px;
        padding-left: 8px;
        font-size: .9em;
    }
    
    .checkbox-text {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        font-size: .9em;
        padding-left: 8px;
    }
    
    .checkbox-container.disabled+.checkbox-text {
        color: rgba(0, 0, 0, 0.26);
    }
</style>