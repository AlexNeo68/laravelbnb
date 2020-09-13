export default {
    data(){
        return {
            errors: null
        }
    },
    methods: {
        errorsFor(field){
            return this.hasErrors && this.errors[field] ? this.errors[field] : null;
        }
    },
}
