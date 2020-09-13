<template>
    <div class="text-center error">
        <div class="fas fa-thumbs-up"></div>
        <h1>Success!</h1>
        <h2><slot></slot></h2>
    </div>
</template>
<style scroped>
    .error{
        color: #cecece;
        font-size: 10rem;
    }
</style>
