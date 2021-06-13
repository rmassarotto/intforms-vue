<template>
  <div>
    <div v-if="!loading">
      <b-jumbotron>
        <template #header>Resultados</template>

        <template #lead class="ml-3"> {{ questionario.nome }}</template>

        <hr class="my-4" />

        <div v-for="(questao, index) of questionario.questoes" :key="index">
          <b-card :title="questao.titulo" class="mb-2">
            <b-card-text>
              <br />
              <div v-if="questao.tipoQuestaoId === 1">
                <apexchart
                  type="bar"
                  height="350"
                  :options="questao.chartOptions"
                  :series="questao.series"
                ></apexchart>
              </div>
              <div v-if="questao.tipoQuestaoId === 2">
                <div class="col-md-12 d-flex justify-content-center">
                  <apexchart
                    type="pie"
                    width="380"
                    :options="questao.chartOptions"
                    :series="questao.series"
                  ></apexchart>
                </div>
              </div>
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
import VueApexCharts from "vue-apexcharts";
export default {
  layout: "navbar",
  middleware: "auth",
  components: {
    apexchart: VueApexCharts,
  },
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

      await this.setContagemRespostasChats(
        this.questionario,
        this.respostaQuestionario
      );
    }
  },
  methods: {
    setContagemRespostasChats(questionario, respostas) {
      for (const indexQ in questionario.questoes) {
        let totalRespostasCount = null;
        let tipoQuestaoId =
          questionario.questoes[indexQ].alternativas[0].tipoId;
        let series = null; //Quantidades de cada alternativa
        let chartOptions = null; //Titulo de cada alternativa

        if (tipoQuestaoId === 1) {
          series = [{ data: [] }]; //Quantidades de cada alternativa
          chartOptions = {
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: true,
            },
            xaxis: {
              max: null,
              categories: [], //Titulo de cada alternativa
            },
          };
        } else if (tipoQuestaoId === 2) {
          series = []; //Quantidades de cada alternativa
          chartOptions = {
            chart: {
              width: 480,
              type: "pie",
            },
            labels: [], //Titulo de cada alternativa
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          };
        }

        for (const indexA in questionario.questoes[indexQ].alternativas) {
          if (tipoQuestaoId === 1) {
            chartOptions.xaxis.categories.push(
              questionario.questoes[indexQ].alternativas[indexA].texto
            );
          } else if (tipoQuestaoId === 2) {
            chartOptions.labels.push(
              questionario.questoes[indexQ].alternativas[indexA].texto
            );
          }

          let possuiResposta = respostas.filter(
            (e) =>
              e.alternativaid ==
              questionario.questoes[indexQ].alternativas[indexA].id
          );

          if (possuiResposta.length !== 0) {
            if (tipoQuestaoId === 1) {
              series[0].data.push(parseInt(possuiResposta[0].count));
            } else if (tipoQuestaoId === 2) {
              series.push(parseInt(possuiResposta[0].count));
            }
            // questionario.questoes[indexQ].alternativas[indexA] = {
            //   ...questionario.questoes[indexQ].alternativas[indexA],
            //   count: parseInt(possuiResposta[0].count),
            // };
            totalRespostasCount += parseInt(possuiResposta[0].count);
          } else {
            if (tipoQuestaoId === 1) {
              series[0].data.push(0);
            } else if (tipoQuestaoId === 2) {
              series.push(0);
            }
            // questionario.questoes[indexQ].alternativas[indexA] = {
            //   ...questionario.questoes[indexQ].alternativas[indexA],
            //   count: 0,
            // };
          }
        }

        if (tipoQuestaoId === 1) {
          chartOptions.xaxis.max = totalRespostasCount;
        }
        questionario.questoes[indexQ] = {
          ...questionario.questoes[indexQ],
          chartOptions: chartOptions,
          series: series,
          tipoQuestaoId: tipoQuestaoId,
        };
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
