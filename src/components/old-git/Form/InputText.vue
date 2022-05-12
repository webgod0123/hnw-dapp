<template>
    <div>
        <validation-provider    v-bind:name="name"
                                v-bind:ref="setRef"
                                v-bind:rules="rules"
                                v-slot="{ errors }">
            <div class="mb-3">
                <label class="form-label">{{label}}</label>
                <input type="text" class="form-control form-control-lg" placeholder="" value="{value}" v-on:change="validateAndEmit"/>
                <span>{{ errors[0] }}</span>
            </div>
        </validation-provider>
    </div>
</template>

<script>
    export default {
        props: {
            form: {},
            field: {},
            name: {},
            setRef: {},
            rules: {},
            label: {},
            placeholder: {},
            value: {},
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
            validateAndEmit: async function() {
                // if (!(await this.refs[name].validate())) {return;}
                $emit('formFieldChange', form, field, value);
            }
        },

        mounted() {
        }
    }
</script>