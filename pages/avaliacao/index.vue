<template>
  <div>
    <div v-if="questionario">
      <b-jumbotron>
        <template #header>{{ questionario.nome }}</template>

        <template #lead>
          Assinale as alternativas de acordo com que se pede. Futuro campo de
          descricao.
        </template>

        <hr class="my-4" />

        <b-form @submit="save">
          <div v-for="(questao, index) of questoes" :key="index">
            <b-card :title="questao.titulo" class="mb-2">
              <b-card-text>
                <br />
                <b-form-group>
                  <div
                    v-for="(alternativa, indexAlt) of questao.alternativas"
                    :key="indexAlt"
                  >
                    <div v-if="alternativa.tipoId === 1">
                      <b-form-radio
                        :name="'questao_' + questao.id"
                        :value="1"
                        :id="'alt_' + alternativa.id"
                        @change="changeStatus(index, indexAlt)"
                        >{{
                          questoes[index].alternativas[indexAlt].texto
                        }}</b-form-radio
                      >
                    </div>
                    <div v-if="alternativa.tipoId === 2">
                      <b-form-checkbox
                        :id="'alt_' + alternativa.id"
                        v-model="
                          questoes[index].alternativas[indexAlt].selected
                        "
                        :value="1"
                        :unchecked-value="0"
                      >
                        {{ questoes[index].alternativas[indexAlt].texto }}
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-form-group>
              </b-card-text>
            </b-card>
          </div>
          <div class="text-center mt-4" v-if="!loading">
            <b-button type="submit" size="lg" variant="primary"
              >Enviar</b-button
            >
          </div>
          <div v-else class="text-center mt-4">
            <b-spinner label="Loading..."></b-spinner>
          </div>
        </b-form>
      </b-jumbotron>
    </div>
    <div v-else class="text-center">
      <b-spinner label="Loading..."></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  layout: "navbar",
  data() {
    return {
      questionarioId: this.$route.params.id,
      questionario: null,
      questoes: [],
      loading: false,
    };
  },
  async fetch() {
    const { data } = await this.$axios.get(
      `questionario/${this.questionarioId}`
    );
    this.setQuestoesQuestionario(data);
  },
  methods: {
    setQuestoesQuestionario(questionario) {
      this.questionario = questionario;
      this.questoes = questionario.questoes;
      delete this.questionario.questoes;
      for (const q in this.questoes) {
        for (const a in this.questoes[q].alternativas) {
          this.questoes[q].alternativas[a] = {
            ...this.questoes[q].alternativas[a],
            selected: 0,
          };
        }
      }
    },
    changeStatus(queIndex = null, altIndex = null) {
      for (const index in this.questoes[queIndex].alternativas) {
        if (index != altIndex) {
          this.questoes[queIndex].alternativas[index].selected = 0;
        } else {
          this.questoes[queIndex].alternativas[index].selected = 1;
        }
      }
    },
    async save(e) {
      e.preventDefault();
      this.loading = true;
      const form = {
        questionario: this.questionario,
        questoes: this.questoes,
      };
      console.log(form);
      let self = this;
      await this.$axios
        .post("respostaQuestionario", form)
        .then(function (response) {
          console.log(response);
          // self.$router.push("/formulario/list");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
