<template>
    <div class="home">
        <div class="home__content">
            <my-title>Welkom to fullstack todo app. Please login to continue</my-title>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style>
.home {
    display: flex;
    justify-content: center;
}

.home__content {
    padding: 30px;
    margin: auto;
    max-width: 600px;
    max-height: 600px;
    background-color: teal;
}

.home__content h1 {
    color: aliceblue;
}
</style>