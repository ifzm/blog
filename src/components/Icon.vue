<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#' + href"></use>
    </svg>
</template>

<script>
    export default {
        props: {
            href: {
                type: String,
                default: 'icon-default'
            }
        }
    }
</script>