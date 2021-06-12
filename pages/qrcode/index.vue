<template>
  <div>
    <div class="container-fluid" v-if="questionario">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="align-self-center">
            <div class="container">
              <b-card style="max-width: 20rem">
                <div class="text-center">
                  <vue-qr
                    :text="`localhost:3000/avaliacao/` + questionario.id"
                    qid="qrQuestionario"
                    :size="260"
                  ></vue-qr>
                </div>
                <b-card-body>
                  <b-card-title>{{ questionario.nome }}</b-card-title>
                  <b-card-text>
                    Aponte a camera do seu celular para o QRcode acima para
                    realizar o questionário
                  </b-card-text>
                </b-card-body>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <b-spinner label="Loading..."></b-spinner>
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
export default {
  layout: "navbar",
  middleware: "auth",
  components: {
    VueQr,
  },
  data() {
    return {
      questionarioId: this.$route.params.id,
      questionario: null,
    };
  },
  async fetch() {
    const { data } = await this.$axios.get(
      `questionario/info/${this.questionarioId}`
    );
    this.questionario = data;
  },
};
</script>