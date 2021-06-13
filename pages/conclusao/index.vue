<template>
  <div>
    <b-jumbotron>
      <template #header>
        <div class="text-center">Obrigado!</div>
      </template>

      <template #lead>
        <div class="text-center">
          Sua avaliação é muito importante para melhor atende-los. Obrigado!
        </div>
        <br />
        <div class="text-center">
          <b-img
            src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif"
            fluid
            rounded
            alt="Fluid image"
          ></b-img>
        </div>
      </template>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  layout: "default",
};
</script>