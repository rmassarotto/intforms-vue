<template>
  <div>
    <b-container>
      <h2 class="mb-4">Novo Formulário</h2>
      <b-form @submit="save" @reset="reset" v-if="show">
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

        <ListaQuestoes v-model="form.questoes"></ListaQuestoes>

        <br />
        <div class="text-right" v-if="form.questoes.length !== 0">
          <b-button type="submit" variant="primary">Salvar</b-button>
          <b-button type="reset" variant="danger">Limpar</b-button>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import NovaAlternativa from "../../components/alternativa/FormNovaAlternativa";
import ListaQuestoes from "../../components/questao/ListNovaQuestao";

export default {
  layout: "navbar",
  middleware: "auth",
  components: {
    NovaAlternativa,
    ListaQuestoes,
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
        .then(function () {
          self.$swal
            .fire({
              icon: "success",
              title: "Signed in successfully",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            })
            .then((result) => {
              if (result.dismiss === self.$swal.DismissReason.timer) {
                self.$router.push("/formulario/list");
              }
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    reset(event) {
      event.preventDefault();
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