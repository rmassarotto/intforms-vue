<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="9">
          <h2>Meus Formulários</h2>
        </b-col>
        <b-col class="text-right">
          <b-button pill href="/formulario/new" variant="primary">
            <b-row no-gutters>
              <div>
                <b-icon icon="clipboard-plus"></b-icon>
              </div>
              <div class="d-none d-lg-block">&nbsp; Criar formulário</div>
            </b-row>
          </b-button>
        </b-col>
      </b-row>

      <br />

      <b-list-group>
        <div v-for="(questionario, index) in questionarios" :key="index">
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            {{ questionario.id }} - &nbsp;{{ questionario.nome }}
            <b-dropdown text="Ações" dropleft size="sm">
              <b-dropdown-item @click="gerarQR(questionario.id)">
                <b-row>
                  <b-col sm="8"> Gerar QR </b-col>
                  <b-col sm="4" class="d-none d-sm-block"
                    ><b-icon icon="columns-gap"></b-icon
                  ></b-col>
                </b-row>
              </b-dropdown-item>
              <b-dropdown-item @click="resultados(questionario.id)">
                <b-row>
                  <b-col sm="8">Resultados </b-col>
                  <b-col sm="4" class="d-none d-sm-block"
                    ><b-icon icon="graph-up"></b-icon
                  ></b-col>
                </b-row>
              </b-dropdown-item>
              <b-dropdown-item @click="remover(questionario.id)">
                <b-row>
                  <b-col sm="8" class="text-danger">Remover </b-col>
                  <b-col sm="4" class="d-none d-sm-block">
                    <b-icon icon="trash-fill" variant="danger"></b-icon
                  ></b-col>
                </b-row>
              </b-dropdown-item>
            </b-dropdown>
          </b-list-group-item>
        </div>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: "navbar",
  middleware: "auth",
  data() {
    return {
      questionarios: [],
    };
  },
  async fetch() {
    await this.loadFormularios();
  },
  methods: {
    async loadFormularios() {
      const { data } = await this.$axios.get(
        `questionario/usuario/${this.$store.state.auth.user.id}`
      );
      this.questionarios = data;
    },
    gerarQR(id) {
      this.$router.push({ name: "qrcode", params: { id } });
    },
    resultados(id) {
      this.$router.push({ name: "resultado", params: { id } });
    },
    async remover(id) {
      this.$swal
        .fire({
          title: "Deletar formuário?",
          text: "Você não poderá reverter essa ação!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "Sim, deletar!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.remove(id);
            await this.loadFormularios();
          }
        });
    },
    async remove(id) {
      await this.$axios.delete(`questionario/${id}`);
      const { data } = await this.$axios.get("questionario");
      this.questionarios = data;
    },
  },
};
</script>

<style scoped>
#divisor {
  margin-top: 80px;
  margin-bottom: 50px;
}
</style>