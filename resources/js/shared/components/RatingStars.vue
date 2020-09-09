<template>
    <div class="d-flex">
        <div class="fas fa-star" v-for="star in fullStars" :key="'fullStar'+star"></div>
        <div class="fas fa-star-half-alt" v-if="halfStar"></div>
        <div class="far fa-star" v-for="star in emptyStars" :key="'emptyStar'+star"></div>
    </div>
</template>

<script>
export default {
    props: {
        rating: Number
    },
    computed: {
        fullStars(){
            return Math.round(this.rating);
        },
        halfStar(){
            const fraction = Math.round((this.rating - Math.floor(this.rating))*100);
            return fraction > 0 && fraction < 50;
        },
        emptyStars(){
            return 5 - Math.ceil(this.rating);
        }
    }
}
</script>
