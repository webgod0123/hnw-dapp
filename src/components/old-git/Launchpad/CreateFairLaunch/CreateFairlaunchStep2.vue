<template>
    <div class="card bg-gray-900 bg-opacity-70 text-white">
        <div class="card-body">
            <validation-observer ref="step2">
                <form @submit.prevent="catchSubmitEvent()">
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="logo url"
                                                    ref="fairlaunchForm_logoUrl"
                                                    v-bind:rules="{required: true, regex: expression.image}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Logo URL</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.logoUrl" @input="updateFormField('fairlaunch', null, 'logoUrl', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="website"
                                                    ref="fairlaunchForm_website"
                                                    v-bind:rules="{required: true, regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Website</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.website" @input="updateFormField('fairlaunch', null, 'website', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="facebook"
                                                    ref="fairlaunchForm_facebook"
                                                    v-bind:rules="{regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Facebook</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.facebook" @input="updateFormField('fairlaunch', null, 'facebook', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="twitter"
                                                    ref="fairlaunchForm_twitter"
                                                    v-bind:rules="{regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Twitter</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.twitter" @input="updateFormField('fairlaunch', null, 'twitter', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="github"
                                                    ref="fairlaunchForm_github"
                                                    v-bind:rules="{regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Github</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.github" @input="updateFormField('fairlaunch', null, 'github', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="telegram"
                                                    ref="fairlaunchForm_telegram"
                                                    v-bind:rules="{regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Telegram</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.telegram" @input="updateFormField('fairlaunch', null, 'telegram', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="instagram"
                                                    ref="fairlaunchForm_instagram"
                                                    v-bind:rules="{regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Instagram</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.instagram" @input="updateFormField('fairlaunch', null, 'instagram', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="discord"
                                                    ref="fairlaunchForm_discord"
                                                    v-bind:rules="{regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Discord</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.discord" @input="updateFormField('fairlaunch', null, 'discord', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <validation-provider    name="reddit"
                                                    ref="fairlaunchForm_reddit"
                                                    v-bind:rules="{regex: expression.url}"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Reddit</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="https://domain.ext" v-bind:value="forms.fairlaunch.reddit" @input="updateFormField('fairlaunch', null, 'reddit', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <validation-provider    name="description"
                                                    ref="fairlaunchForm_description"
                                                    rules="required"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <textarea rows="3" type="text" class="form-control form-control-lg" placeholder="Lorem ipsum..." v-bind:value="forms.fairlaunch.description" @input="updateFormField('fairlaunch', null, 'description', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-4">
                            <button class="btn btn-secondary text-dark w-100" v-on:click="$emit('previous');">PREVIOUS</button>
                        </div>
                        <div class="col-4"></div>
                        <div class="col-4">
                            <button class="btn btn-primary text-dark w-100" v-on:click="validateAndAdvance()">NEXT</button>
                        </div>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                forceRender: 0,
                expression: {
                    url: new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/),
                    image: new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i)
                },
            }
        },

        created() {
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'forms', 'wallet', 'web3']),
        },

        watch: {
        },

        methods: {
            catchSubmitEvent: function() {
                //Button are sending submit when click and I don't have time to fix that... So there is a catch on the form submit.
            },

            validateAndAdvance: async function() {
                if(await this.validate()) {
                    this.$emit('advance');
                }
            },

            validate: async function() {
                return await this.$refs.step2.validate();
            },

            updateFormField: async function(form, parent = null, field, value) {
                await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: field, value: value});
                if (field === 'whitelistEnable') {await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: 'whitelistDisable', value: !value});}
                if (field === 'whitelistDisable') {await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: 'whitelistEnable', value: !value});}
            },
        },

        mounted() {
        }
    }
</script>