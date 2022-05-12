<template>
    <flip-countdown v-bind:deadline="countdown" v-if="shouldRenderPool"></flip-countdown>
</template>

<script>
    import {mapState} from 'vuex';
    import FlipCountdown from 'vue2-flip-countdown';

    export default {
        components: { FlipCountdown },
        props: {
            pool: {}
        },

        data() {
            return {
            }
        },

        created() {
        },

        updated () {
        },

        computed: {
            ...mapState([]),
            shouldRenderPool: function() {
                if ([0, 3, 4].includes(this.pool.poolState)) {return true};
                return false;
            },

            countdown: function() {
                if ([3].includes(this.pool.poolState)) {return this.pool.startTimeUTC};
                return this.pool.endTimeUTC;
            }
        },

        watch: {
        },

        methods: {
        },

        mounted() {
        }
    }
</script>