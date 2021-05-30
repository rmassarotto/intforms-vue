<template>
  <div>
    <div v-if="!loading">
      <b-jumbotron>
        <template #header>Resultados</template>

        <template #lead> {{ questionario.nome }}</template>

        <hr class="my-4" />

        <div v-for="(questao, index) of questionario.questoes" :key="index">
          <b-card :title="questao.titulo" class="mb-2">
            <b-card-text>
              <br />
              <b-form-group>
                <div
                  v-for="(alternativa, indexAlt) of questao.alternativas"
                  :key="indexAlt"
                >
                  <h6>{{ alternativa.texto }}</h6>
                  <b-progress
                    variant="dark"
                    show-value
                    :max="questao.totalCount"
                    class="mb-3"
                  >
                    <b-progress-bar :value="alternativa.count">
                    </b-progress-bar>
                  </b-progress>
                </div>
              </b-form-group>
            </b-card-text>
          </b-card>
        </div>
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
      respostaQuestionario: null,
      loading: true,
      value: 70,
    };
  },
  async fetch() {
    if (this.questionarioId) {
      const resQuestionario = await this.$axios.get(
        `questionario/${this.questionarioId}`
      );
      this.questionario = resQuestionario.data;

      const resRespostas = await this.$axios.get(
        `respostaQuestionario/contagem/${this.questionarioId}`
      );
      this.respostaQuestionario = resRespostas.data;

      await this.setContagemRespostas(
        this.questionario,
        this.respostaQuestionario
      );
    }
  },
  methods: {
    setContagemRespostas(questionario, respostas) {
      for (const indexQ in questionario.questoes) {
        let totalRespostasCount = null;
        for (const indexA in questionario.questoes[indexQ].alternativas) {
          let possuiResposta = respostas.filter(
            (e) =>
              e.alternativaid ==
              questionario.questoes[indexQ].alternativas[indexA].id
          );
          if (possuiResposta.length !== 0) {
            questionario.questoes[indexQ].alternativas[indexA] = {
              ...questionario.questoes[indexQ].alternativas[indexA],
              count: parseInt(possuiResposta[0].count),
            };
            totalRespostasCount += parseInt(possuiResposta[0].count);
          } else {
            questionario.questoes[indexQ].alternativas[indexA] = {
              ...questionario.questoes[indexQ].alternativas[indexA],
              count: 0,
            };
          }
        }
        questionario.questoes[indexQ] = {
          ...questionario.questoes[indexQ],
          totalCount: totalRespostasCount,
        };
      }
      console.log(this.questionario);
      this.loading = false;
    },
  },
};
</script>

<style></style>
