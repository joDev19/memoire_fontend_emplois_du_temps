<template>
    <div class="loader"></div>
</template>

<script setup>

</script>

<style lang="css" scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 5px;
  padding: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
  border-color: #0284c7;
  background: #ffffff;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}

</style>