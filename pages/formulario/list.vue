<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="9">
          <h2>Meus Formulários</h2>
        </b-col>
        <b-col class="text-right">
          <b-button pill href="/formulario/new" variant="primary"
            ><b-icon icon="clipboard-plus"></b-icon> Criar formulário</b-button
          >
        </b-col>
      </b-row>

      <br />
      <b-list-group>
        <div v-for="(questionario, index) in questionarios" :key="index">
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            {{ questionario.nome }}
            <b-dropdown text="Ações" dropleft size="sm">
              <b-dropdown-item @click="gerarQR(questionario.id)">
                <b-row>
                  <b-col sm="8"> Gerar QR </b-col>
                  <b-col sm="4"><b-icon icon="columns-gap"></b-icon></b-col>
                </b-row>
              </b-dropdown-item>
              <b-dropdown-item @click="resultados(questionario.id)">
                <b-row>
                  <b-col sm="8">Resultados </b-col>
                  <b-col sm="4"><b-icon icon="graph-up"></b-icon></b-col>
                </b-row>
              </b-dropdown-item>
              <b-dropdown-item @click="remover(questionario.id)">
                <b-row>
                  <b-col sm="8" class="text-danger">Remover </b-col>
                  <b-col sm="4"
                    ><b-icon icon="trash-fill" variant="danger"></b-icon
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
    const { data } = await this.$axios.get("questionario");
    this.questionarios = data;
  },
  methods: {
    gerarQR(id) {
      this.$router.push({ name: "qrcode", params: { id } });
      // this.$router.push({ name: "avaliacao", params: { id } });
    },
    resultados(id) {
      this.$router.push({ name: "resultado", params: { id } });
    },
    remover(id) {
      console.log("remover");
      this.$swal
        .fire({
          title: "Deletar formuário?",
          text: "Você não poderá reverter essa ação!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "Sim, deletar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.remove(id);
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