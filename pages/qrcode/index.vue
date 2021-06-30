<template>
  <div>
    <div class="container-fluid" v-if="questionario">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="align-self-center">
            <div class="container">
              <b-row>
                <b-card style="max-width: 20rem" class="mb-3">
                  <div class="text-center">
                    <vue-qr
                      :text="
                        `https://intform-vue.herokuapp.com/avaliacao/` +
                        questionario.id
                      "
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
              </b-row>
              <b-row align-h="end">
                <ShareNetwork
                  network="whatsapp"
                  :url="
                    `https://intform-vue.herokuapp.com/avaliacao/` +
                    questionario.id
                  "
                  title="Link de acesso ao formulário!"
                  :description="questionario.nome"
                >
                  <b-button size="sm" variant="success"
                    ><b-icon icon="share"></b-icon> &nbsp; Whatsapp</b-button
                  >
                  <!-- <a href="#" class="btn btn-success">Whatsapp</a> -->
                </ShareNetwork>
              </b-row>
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