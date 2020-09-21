<template>
    <div>
        <success v-if="success">Congratulation on your purchase!</success>
        <div class="row" v-else>
            <div class="col-md-8" v-if="itemsInBasket">
                <h6 class="text-uppercase text-secondary font-weight-bolder">Checkout form</h6>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="first_names">First Names</label>
                        <input class="form-control" name="first_names" v-model="customer.first_names" type="text" :class="[{'is-invalid': errorsFor('customer.first_names')}]" />
                        <v-errors :errors="errorsFor('customer.first_names')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last Name</label>
                        <input class="form-control" type="text" :class="[{'is-invalid': errorsFor('customer.last_name')}]" name="last_name" v-model="customer.last_name" />
                        <v-errors :errors="errorsFor('customer.last_name')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input class="form-control" type="text" :class="[{'is-invalid': errorsFor('customer.email')}]" name="email" v-model="customer.email"/>
                        <v-errors :errors="errorsFor('customer.email')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input class="form-control" type="text" :class="[{'is-invalid': errorsFor('customer.street')}]" name="street"  v-model="customer.street" />
                        <v-errors :errors="errorsFor('customer.street')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input class="form-control" type="text" :class="[{'is-invalid': errorsFor('customer.city')}]" name="city" v-model="customer.city"/>
                        <v-errors :errors="errorsFor('customer.city')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="country">Country</label>
                        <input class="form-control" name="country" v-model="customer.country" type="text" :class="[{'is-invalid': errorsFor('customer.country')}]" />
                        <v-errors :errors="errorsFor('customer.country')"></v-errors>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input class="form-control" type="text" :class="[{'is-invalid': errorsFor('customer.state')}]" name="state" v-model="customer.state"/>
                        <v-errors :errors="errorsFor('customer.state')"></v-errors>
                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip">Zip</label>
                        <input class="form-control" type="text" :class="[{'is-invalid': errorsFor('customer.zip')}]" name="zip" v-model="customer.zip" />
                        <v-errors :errors="errorsFor('customer.zip')"></v-errors>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12">
                        <button class="btn btn-primary btn-lg btn-block" @click.prevent="book">Book now!</button>
                    </div>
                </div>
            </div>
            <div class="col-md-8" v-else>
                <div class="jumbotron text-center">
                    <h1>Cart is empty</h1>
                </div>
            </div>

            <div class="col-md-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">Items {{itemsInBasket}}</span>
                        <span v-else>Empty</span>
                    </h6>
                </div>
                <transition-group name="fade">
                    <div v-for="(item, index) in basket.items" :key="`basket-items-${index}`">
                        <div class="pb-2 pt-2 border-top">
                            <div class="d-flex justify-content-between">
                                <router-link :to="{ name: 'bookable', params: {id: item.bookable.id} }">
                                    {{item.bookable.title}}
                                </router-link>
                                <div class="font-weight-bolder">
                                    ${{item.price.total}}
                                </div>
                            </div>
                            <div class="d-flex justify-content-between pb-2 pt-2">
                                <div>
                                    From {{ item.dates.from }}
                                </div>
                                <div>
                                    To {{ item.dates.to }}
                                </div>
                            </div>
                            <div class="pb-2 pt-2 text-right">
                                <button class="btn btn-sm btn-outline-secondary" @click="$store.dispatch('removeBasketItems', item.bookable.id)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>


                        </div>
                    </div>
                </transition-group>

            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex';
import validationErrors from '../../shared/mixins/validationErrors';
export default {
    name: 'Basket',
    mixins: [validationErrors],
    data(){
        return {
            loading: false,
            attemptingCheckout: false,
            status: null,
            customer: {
                first_names: null,
                last_names: null,
                email: null,
                street: null,
                country: null,
                city: null,
                state: null,
                zip: null,
            }
        }
    },
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState(["basket"]),
        success(){
            return !this.loading && 0 === this.itemsInBasket && this.attemptingCheckout;
        },
        hasErrors(){
            return 422 === this.status && this.errors !== null;
        },
    },
    methods: {
        async book(){
            this.loading = true;
            this.attemptingCheckout = false;
            this.errors = null;
            try {
                await axios.post('/api/checkout', {
                    customer: this.customer,
                    bookings: this.basket.items.map(item => ({
                        bookable_id: item.bookable.id,
                        from: item.dates.from,
                        to: item.dates.to,
                    }))
                });
                this.$store.dispatch('clearBasket');
                this.attemptingCheckout = true;
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
                this.status = error.response.status;
            }
            this.loading = false;
        }
    }
}
</script>
<style scoped>
h6.badge {
    font-size: 100%;
}
a {
    color: black
}
</style>
