<template>
    <div class="d-flex">
        <div class="fas fa-star" v-for="star in fullStars" @click="$emit('input', star)" :key="'fullStar'+star"></div>
        <div class="fas fa-star-half-alt" v-if="halfStar"></div>
        <div class="far fa-star" v-for="star in emptyStars" :key="'emptyStar'+star" @click="$emit('input', fullStars + star)"></div>
    </div>
</template>

<script>
export default {
    props: {
        value: Number
    },
    computed: {
        fullStars(){
            return Math.round(this.value);
        },
        halfStar(){
            const fraction = Math.round((this.value - Math.floor(this.value))*100);
            return fraction > 0 && fraction < 50;
        },
        emptyStars(){
            return 5 - Math.ceil(this.value);
        }
    }
}
</script>
