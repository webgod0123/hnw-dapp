<template>
    <div class="d-flex">
        <div class="w-30px me-3">
            <img v-bind:src="twitter.user.data.profile_image_url" alt="" class="mw-100 rounded-pill" />
        </div>
        <div class="flex-1">
            <h5 class="mb-1">{{twitter.user.data.name}} <span class="text-muted fs-6">@{{twitter.user.data.username}}</span></h5>
            <p class="mb-1" v-html="$helpers.beautifyTweet(tweet.text)"></p>
            <div class="d-flex flex-row" v-if="tweet.attachments !== undefined">
                <div v-for="media_key of tweet.attachments.media_keys">
                    <img v-if="twitter.tweets.includes.media[getMediaKeyIndex(media_key)].type === 'photo'" v-bind:src="twitter.tweets.includes.media[getMediaKeyIndex(media_key)].url" class="img-fluid"/>
                    <img v-if="twitter.tweets.includes.media[getMediaKeyIndex(media_key)].type === 'video'" v-bind:src="twitter.tweets.includes.media[getMediaKeyIndex(media_key)].preview_image_url" class="img-fluid"/>
                </div>
            </div>
        </div>
        <div class="w-30px ms-3 text-center">
            <i class="fa fa-thumbtack" v-if="pinned"></i>
        </div>
    </div>
</template>

<script>

    export default {

        props: {
            pinned: {},
            tweet: {},
            twitter: {},
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
        },

        watch: {
        },

        methods: {
            getMediaKeyIndex: function(media_key) {
                return this.twitter.tweets.includes.media.findIndex(item => item.media_key === media_key);
            }
        },

        mounted() {
        }
    }
</script>