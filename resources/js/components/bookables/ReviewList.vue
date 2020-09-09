<template>
    <div style="padding: 1.25rem;" class="d-none d-md-block">
        <h6 class="text-uppercase text-secondary font-weight-bolder">Review List</h6>
        <div v-if="loading">Loading ...</div>
        <div v-else>
            <div class="border-bottom pb-4 mb-4" v-for="(review, index) in reviews" :key="'review'+index">
                <div class="row">
                    <div class="col-md-6">Alexander Neudahin</div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <rating-stars :rating="review.rating" class="fa-lg"></rating-stars>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">{{ review.created_at | fromNow }}</div>
                </div>
                <div class="row pt-2">
                    <div class="col-md-12">{{ review.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bookableId: String
    },
    data(){
        return {
            loading: false,
            reviews: null,
        }
    },
    created(){
        this.fetchReviews();
    },
    methods: {
        fetchReviews(){
            this.loading = true;
            axios.get(`/api/bookables/${this.bookableId}/reviews`)
                .then(res => {
                    this.reviews = res.data.data;
                })
                .finally(res => {
                    this.loading = false;
                });
        }
    }
}
</script>
