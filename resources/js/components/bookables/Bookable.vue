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
            <Availability :bookable-id="$route.params.id" />
        </div>
    </div>
</template>
<script>
import Availability from './Availability';
import ReviewList from './ReviewList';

export default {
    components: { Availability, ReviewList },
    data(){
        return {
            bookable: null,
            loading: false,
        }
    },
    created(){
        this.loading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`).then(res => {
            this.bookable = res.data.data;
            this.loading = false;
        });
    }
}
</script>
