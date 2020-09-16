<template>
    <div class="mt-4">
        <h6 class="text-uppercase text-secondary font-weight-bolder mb-2">
            Bookable now
        </h6>
        <div class="d-flex justify-content-between pt-2 pb-2 border-bottom border-top" v-for="(price,days) in price.breakdown" :key="price">
            <span>{{ days }} x ${{ price }}</span>
            <span>${{ price*days }}</span>
        </div>
        <div class="d-flex justify-content-between font-weight-bolder pt-2 pb-2">
            <span>Total</span>
            <span>${{price.total}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['price']
}
</script>
