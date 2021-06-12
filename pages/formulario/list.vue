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
              <b-dropdown-item @click="gerarQR(questionario.id)"
                >Gerar QR</b-dropdown-item
              >
              <b-dropdown-item @click="resultados(questionario.id)"
                >Resultados</b-dropdown-item
              >
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
    console.log(this.questionarios);
  },
  methods: {
    gerarQR(id) {
      this.$router.push({ name: "qrcode", params: { id } });
      // this.$router.push({ name: "avaliacao", params: { id } });
    },
    resultados(id) {
      this.$router.push({ name: "resultado", params: { id } });
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