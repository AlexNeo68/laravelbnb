<template>
    <div>
        <nav class="navbar navbar-light bg-light border-bottom">
            <div class="container">
                <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">LaravelBNB</router-link>
                <router-link :to="{name: 'basket'}" class="btn navbutton">
                    Basket
                    <span v-if="itemsInBasket" class="badge badge-secondary">{{itemsInBasket}}</span>
                </router-link>
            </div>
        </nav>
        <div class="container mt-4 mb-4 px-6">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex';
export default {
    data(){
        return {
            lastSearch: this.$store.state.lastSearch
        }
    },
    computed: {
        ...mapState({
            computedLastSearch: 'lastSearch'
        }),
        ...mapGetters({
            itemsInBasket: 'itemsInBasket'
        }),
    }
}
</script>
