<template>
    <div>
        <nav class="navbar navbar-light bg-light border-bottom">
            <div class="container">
                <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">LaravelBNB</router-link>
                <router-link class="btn nav-button" :to="{name: 'home'}">Second</router-link>
            </div>
        </nav>
        <div class="container mt-4 mb-4 px-6">
            <router-view></router-view>
        </div>
    </div>
</template>
