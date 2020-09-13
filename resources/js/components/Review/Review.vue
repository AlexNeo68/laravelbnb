<template>
    <div>
        <success v-if="success">You`ve left a review, thank you very much!</success>
        <fatal-error v-if="error"></fatal-error>
        <div v-if="!success && !success">
            <h3>Review Page</h3>
            <div class="row">
                <div :class="[{'col-md-4': loading || !alreadyReviewed}, {'d-none':!loading && alreadyReviewed}]">
                    <div v-if="loading">
                        Loading ...
                    </div>
                    <div v-else>
                        <div class="card" v-if="booking">
                            <div class="card-body">
                                <p>
                                    Stayed at
                                    <router-link :to="{name: 'bookable', params: {id: booking.bookable.bookable_id}}">
                                        {{booking.bookable.title}}
                                    </router-link>
                                </p>
                                From {{ booking.from }} to {{ booking.to }}
                            </div>
                        </div>
                    </div>
                </div>

                <div :class="[{'col-md-8': loading || !alreadyReviewed}, {'col-md-12': !loading && alreadyReviewed}]">
                    <div v-if="loading">
                        Loading ...
                    </div>
                    <div v-else>
                        <div v-if="alreadyReviewed">You`ve review already for this booking!</div>
                        <div v-else>
                            <div class="form-group">
                                <label for="" class="text-muted">Select rating (1 - bad, 5 - best)</label>
                                <rating-stars class="fa-3x" v-model="review.rating"></rating-stars>
                            </div>
                            <div class="form-group">
                                <label for="content" class="text-muted">Content of your review</label>
                                <textarea
                                    id="content"
                                    v-model="review.content"
                                    cols="30"
                                    rows="10"
                                    class="form-control"
                                    :class="[{'is-invalid': errorsFor('content')}]"
                                ></textarea>
                                <v-errors :errors="errorsFor('content')"></v-errors>

                            </div>
                            <button :disabled="sending" @click.prevent="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import {is404, is422} from '../../utils/response';
import validationErrors from '../../shared/mixins/validationErrors';

export default {
    mixins: [validationErrors],
    data(){
        return {
            review: {
                id: null,
                rating: 5,
                content: null,
            },
            existingReview: null,
            loading: false,
            sending: false,
            booking: null,
            success: false,
            error: false,
        }
    },
    async created(){
        this.loading = true;
        this.review.id = this.$route.params.id;

        try {
            this.existingReview = (await axios.get(`/api/reviews/${this.review.id}`)).data.data;
        } catch(err) {
            if(is404(err)){
                try {
                    this.booking = (await axios.get(`/api/booking-by-review/${this.review.id}`)).data.data;
                } catch (err) {
                    this.error = !is404(err);
                }
            } else {
                this.error = true;
            }
        }
        this.loading = false;
    },
    computed: {
        alreadyReviewed(){
            return this.hasReview || !this.hasBooking;
        },
        hasReview(){
            return null !== this.existingReview;
        },
        hasBooking(){
            return null !== this.booking;
        }
    },
    methods: {
        submit(){
            this.errors = null;
            this.sending = true;
            axios.post('/api/reviews', this.review)
                .then(res => {
                    this.success = 201 === res.status;
                })
                .catch(err => {
                    if(is422(err)){
                        const errors = err.response.data.errors;
                        if(errors["content"] && 1 === _.size(errors)){
                            this.errors = errors;
                            return;
                        }
                    }
                    this.error = true;
                })
                .finally(() => this.sending = false);
        },
    }
}
</script>
