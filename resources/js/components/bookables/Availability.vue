<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check availability
            <span class="text-danger" v-if="noAvailability">(NOT AVAILABILITY)</span>
            <span class="text-success" v-if="isAvailability">(AVAILABILITY)</span>
        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    type="text"
                    class="form-control"
                    id="from"
                    v-model="from"
                    placeholder="Start date"
                    @keyup.enter="check"
                    :class="[{'is-invalid': errorsFor('from')}]"
                >
                <div class="invalid-feedback" v-for="(error,index) in errorsFor('from')" :key="'from'+index">
                    {{ error }}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="text"
                    class="form-control"
                    id="to"
                    v-model="to"
                    placeholder="End date"
                    @keyup.enter="check"
                    :class="[{'is-invalid': errorsFor('to')}]"
                >
                <div class="invalid-feedback" v-for="(error,index) in errorsFor('to')" :key="'to'+index">
                    {{ error }}
                </div>
            </div>
        </div>
        <button type="submit" @click="check" :disabled="loading" class="btn btn-secondary btn-block">Check!</button>
    </div>
</template>
<script>
export default {
    name: 'Availability',
    props: {
        bookableId: String
    },
    data(){
        return {
            from: null,
            to: null,
            status: null,
            errors: null,
            loading: false,
        }
    },
    methods: {
        check(){
            this.loading = true;
            this.errors = null;
            axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
                .then(res => {
                    this.status = res.status;
                })
                .catch(err => {
                    this.status = err.response.status;
                    if(422 == this.status){
                        this.errors = err.response.data.errors;
                    }
                })
                .finally(res => {
                    this.loading = false;
                });
        },
        errorsFor(field){
            return this.hasErrors && this.errors[field] ? this.errors[field] : null;
        }
    },
    computed: {
        hasErrors(){
            return 422 === this.status && this.errors !== null;
        },
        isAvailability(){
            return 200 === this.status;
        },
        noAvailability(){
            return 404 === this.status;
        }
    }
}
</script>
<style scoped>
    label{
        font-size: 0.75rem;
        text-transform: uppercase;
        color: gray;
        font-weight: bolder;
    }
    .is-invalid{
        background-image: none;
        border-color: #b22222;
    }
    .invalid-feedback{
        color: #b22222;
    }
</style>
