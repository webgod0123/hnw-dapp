<template>
    <div class="text-primary text-center fs-1">
        <i class="fas fa-lg fa-circle-notch fa-spin"></i>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        props: {},

        data() {
            return {
                forceRender: 0,
            }
        },

        created() {
        },

        updated () {
        },

        computed: {
            ...mapState([])
        },

        watch: {
        },

        methods: {
        },

        mounted() {
            
        }
    }
</script>