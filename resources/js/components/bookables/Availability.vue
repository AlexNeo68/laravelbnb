<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check availability
            <transition name="fade">
                <span class="text-danger" v-if="noAvailability">(NOT AVAILABILITY)</span>
                <span class="text-success" v-if="isAvailability">(AVAILABILITY)</span>
            </transition>
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
                <v-errors :errors="errorsFor('from')"></v-errors>
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
                <v-errors :errors="errorsFor('to')"></v-errors>
            </div>
        </div>
        <button type="submit" @click="check" :disabled="loading" class="btn btn-secondary btn-block">
            <span v-if="loading"> <i class="fas fa-circle-notch fa-spin"></i> Checking ...</span>
            <span v-if="!loading">Check!</span>
        </button>
    </div>
</template>
<script>
import validationErrors from '../../shared/mixins/validationErrors';
export default {
    name: 'Availability',
    mixins: [validationErrors],
    props: {
        bookableId: [String, Number]
    },
    data(){
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            status: null,
            loading: false,
        }
    },
    methods: {
        async check(){
            this.loading = true;
            this.errors = null;

            this.$store.dispatch('setLastSearch', {
                from: this.from,
                to: this.to,
            });

            try {
               this.status = (await axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)).status;
               this.$emit('availability', this.isAvailability);
            } catch (err) {
                if(422 == this.status){
                    this.errors = err.response.data.errors;
                }
                this.status = err.response.status;
            }
            this.loading = false;
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
