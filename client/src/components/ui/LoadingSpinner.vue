<template>
    <div class="root">
        <div class="spinner"></div>
    </div>
</template>
<script>
export default {
    name: 'my-loading'
}
</script>
<style>
.root {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
}

.root .spinner {
    width: 300px;
    height: 300px;
    margin: auto;
    border: 15px dashed teal;
    border-radius: 50%;
    animation: spinner 2s linear infinite;
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}
</style>