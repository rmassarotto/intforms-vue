<template>
  <div>
    <b-container>
      <div class="text-center">
        <b-button href="/formulario/new">Novo Formulário</b-button>
      </div>

      <hr id="divisor" />

      <h2>Meus Formulários</h2>

      <br />
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          Cras justo odio
          <b-dropdown text="Ações" dropleft size="sm">
            <b-dropdown-item href="#">Gerar QR</b-dropdown-item>
            <b-dropdown-item href="#">Resultados</b-dropdown-item>
          </b-dropdown>
        </b-list-group-item>

        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          Dapibus ac facilisis in
          <b-dropdown text="Ações" dropleft size="sm">
            <b-dropdown-item href="#">Gerar QR</b-dropdown-item>
            <b-dropdown-item href="#">Resultados</b-dropdown-item>
          </b-dropdown>
        </b-list-group-item>

        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          Morbi leo risus
          <b-dropdown text="Ações" dropleft size="sm">
            <b-dropdown-item href="#">Gerar QR</b-dropdown-item>
            <b-dropdown-item href="#">Resultados</b-dropdown-item>
          </b-dropdown>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: "navbar",
};
</script>

<style scoped>
#divisor {
  margin-top: 80px;
  margin-bottom: 50px;
}
</style>