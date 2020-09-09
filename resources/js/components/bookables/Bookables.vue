<template>
    <div class="container">
        <div>Rows is: {{ rows }}</div>
        <div v-if="loading">The data is loading ...</div>
        <div v-else>
            <div class="row mb-3" v-for="row in rows" :key="`${row}-row`">
                <div class="col d-flex align-items-stretch" v-for="(bookable, index) in getBookableInRow(row)" :key="`${index}-col`">
                    <BookableListItem v-bind="bookable" />
                </div>
                <div class="col" v-for="col in getPlaceholdersInRow(row)" :key="`${col}-p`"></div>
            </div>
        </div>
    </div>
</template>
<script>
import BookableListItem from './BookableListItem';
export default {
    components: { BookableListItem },
    data() {
        return {
            bookables: null,
            loading: false,
            columns: 3,
        }
    },
    computed: {
        rows(){
            return this.bookables === null ? 0 : Math.ceil(this.bookables.length/this.columns);
        }
    },
    methods: {
        getBookableInRow(row){
            return this.bookables.slice((row - 1) * this.columns, row * this.columns);
        },
        getPlaceholdersInRow(row){
            return this.columns - this.getBookableInRow(row).length;
        }
    },
    created(){
        this.loading = true;
        const req = axios.get('api/bookables')
            .then(res => {
                this.bookables = res.data.data;
                this.loading = false;
            });
    },

}
</script>
