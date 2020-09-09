<template >
    <div class="card w-100">
        <div class="card-body">
            <div class="card-title">
                <router-link :to="{ name: 'bookable', params: { id }}">{{ title }}</router-link>
            </div>
            <div class="card-text">{{ description}}</div>
        </div>
        <div class="card-footer"><i>{{ id }}</i></div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        id: Number
    },
}
</script>
