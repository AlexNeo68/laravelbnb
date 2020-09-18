<template>
    <div class="row">
        <div class="col-md-8 mb-4">
            <div v-if="!loading">
                <div class="card">
                    <div class="card-body">
                        <h2>{{bookable.title}}</h2>
                        <article>{{bookable.description}}</article>
                    </div>
                </div>
                <ReviewList :bookable-id="$route.params.id" />
            </div>
            <div v-else>Loading...</div>
        </div>
        <div class="col-md-4">
            <Availability :bookable-id="$route.params.id" @availability="getPrice($event)" />
            <transition name="fade">
                <PriceBreakdown v-if="price" :price="price" />
            </transition>
            <transition name="fade">
                <button
                v-if="price"
                class="btn btn-outline-secondary btn-block mt-2"
                @click="addToBasket"
                :disabled="isAlreadyInBasket"
                >Book now</button>
            </transition>
            <transition name="fade">
                <button
                    v-if="isAlreadyInBasket"
                    class="btn btn-outline-secondary btn-block mt-2"
                    @click="removeFromBasket"
                    >Remove from the basket</button>
            </transition>
            <div class="text-muted mt-2" v-if="isAlreadyInBasket">Seems like you`ve added this object in the basket. If you want to change dates, please before remove this object from the basket </div>
        </div>

    </div>
</template>
<script>
import Availability from './Availability';
import ReviewList from './ReviewList';
import PriceBreakdown from './PriceBreakdown';
import {mapState} from 'vuex';

export default {
    components: { Availability, ReviewList, PriceBreakdown },
    data(){
        return {
            bookable: null,
            loading: false,
            price: null,
        }
    },
    created(){
        this.loading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`).then(res => {
            this.bookable = res.data.data;
            this.loading = false;
        });
    },
    methods: {
        async getPrice(availability){
            this.price = null;
            if(!availability){
                return;
            }
            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data.data;
            } catch (error) {
                this.price = null;
            }
        },
        addToBasket(){
            this.$store.dispatch('addBasketItems', {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch,
            })
        },
        removeFromBasket(){
            this.$store.dispatch('removeBasketItems', this.bookable.id);
        }
    },
    computed: {
        ...mapState({
            lastSearch: 'lastSearch',
        }),
        isAlreadyInBasket(state){
            if(null === this.bookable) return false;
            return this.$store.getters.isAlreadyInBasket(this.bookable.id);
        }
    }
}
</script>
