<template>
  <div>
    <b-container>
      <h2 class="mb-4">Novo Formulário</h2>
      <b-form @submit="save" @reset="onReset" v-if="show">
        <b-row>
          <b-col sm="8">
            <b-form-group label="Nome do formulário">
              <b-form-input
                id="input-1"
                v-model="form.nome"
                placeholder="Nome do formulário"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Categoria">
              <b-form-select
                id="input-3"
                v-model="form.categoriaId"
                :options="categorias"
                value-field="id"
                text-field="nome"
                required
              >
                <b-form-select-option value="null"
                  >Selecione</b-form-select-option
                >
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />

        <NovaAlternativa @addQuestao="addQuestao"></NovaAlternativa>

        <br />

        <div v-for="(questao, index) in form.questoes" :key="index">
          <b-card :title="questao.titulo" class="text-left">
            <br />
            <div
              v-for="(alternativa, index) in questao.alternativas"
              :key="index"
            >
              <b-card-text>
                <b-icon
                  icon="square"
                  v-if="questao.tipoAlternativa === 2"
                ></b-icon>
                <b-icon
                  icon="circle"
                  v-if="questao.tipoAlternativa === 1"
                ></b-icon>
                {{ alternativa }}
              </b-card-text>
            </div>
          </b-card>
        </div>

        <br />
        <div class="text-right">
          <b-button type="submit" variant="primary">Salvar</b-button>
          <b-button type="reset" variant="danger">Limpar</b-button>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import NovaAlternativa from "../../components/alternativa/new";
export default {
  layout: "navbar",
  components: {
    NovaAlternativa,
  },
  data() {
    return {
      form: {
        nome: "",
        categoriaId: null,
        questoes: [],
      },
      categorias: [],
      show: true,
    };
  },
  async fetch() {
    const { data } = await this.$axios.get("categoria");
    this.categorias = data;
    console.log(this.categorias);
  },
  methods: {
    addQuestao(questao) {
      this.form.questoes.push(questao);
    },
    async save(e) {
      e.preventDefault();
      let self = this;
      await this.$axios
        .post("questionario", this.form)
        .then(function (response) {
          console.log(response);
          // self.$router.push("/formulario/list");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.nome = "";
      this.form.categoria = null;
      this.form.questoes = [];
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
</style>