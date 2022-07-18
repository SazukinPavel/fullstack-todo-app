<template>
    <span class="flat-button">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'my-flat-button'
}
</script>
<style>
.flat-button {
    font-size: 35px;
    color: teal;
    color: aliceblue;
    transition: all 0.3s;
    border: 2px solid rgb(189, 196, 196);
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.flat-button:hover {
    color: rgb(189, 196, 196);
}

.flat-button:focus {
    color: rgb(189, 196, 196);
}
</style>