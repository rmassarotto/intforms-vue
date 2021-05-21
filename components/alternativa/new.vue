<template>
  <div>
    <b-form>
      <b-row>
        <b-col sm="8">
          <b-form-group label="Titulo">
            <b-form-input
              id="titulo"
              v-model="questao.titulo"
              placeholder="Questao sem titulo"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group label="Tipo de Alternativa">
            <b-form-select
              id="tipoAlternativa"
              v-model="questao.tipoAlternativa"
              :options="tiposAlternativas"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <br />

      <b-card v-if="questao.tipoAlternativa" :title="questao.titulo">
        <br />
        <div v-for="(alt, index) in questao.alternativas" :key="index">
          <b-row class="mb-2">
            <b-col
              sm="12"
              class="text-left"
              v-if="questao.tipoAlternativa != 3"
            >
              <b-icon
                icon="square"
                v-if="questao.tipoAlternativa === 2"
              ></b-icon>
              <b-icon
                icon="circle"
                v-if="questao.tipoAlternativa === 1"
              ></b-icon>
              {{ alt }}
            </b-col>
          </b-row>
        </div>

        <b-row>
          <b-col sm="11">
            <b-form-input
              id="alternativa"
              v-model="alternativa"
              placeholder="Insira a alternativa aqui"
              required
            ></b-form-input>
          </b-col>
          <b-col sm="1">
            <b-button pill @click="addAlternativa">+</b-button>
          </b-col>
        </b-row>
      </b-card>
      <div class="text-center mt-3">
        <b-button v-if="questao.alternativas.length" @click="addQuestao">
          Adicionar questão</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      questao: {
        titulo: "",
        tipoAlternativa: null,
        alternativas: [],
      },
      alternativa: "",
      tiposAlternativas: [
        { text: "Tipos Alternativas", value: null },
        { text: "Multipla Escolha", value: 1 },
        { text: "Checkbox", value: 2 },
        { text: "Resposta Curta", value: 3 },
      ],
    };
  },
  methods: {
    addAlternativa() {
      this.questao.alternativas.push(this.alternativa);
      this.alternativa = "";
    },
    addQuestao(event) {
      event.preventDefault();
      let questao = JSON.parse(JSON.stringify(this.questao));
      this.$emit("addQuestao", questao);
      this.questao.titulo = "";
      this.questao.tipoAlternativa = null;
      this.questao.alternativas = [];
      this.alternativa = "";
    },
    // onSubmit(event) {
    //   event.preventDefault();
    //   alert(JSON.stringify(this.form));
    // },
    // onReset(event) {
    //   event.preventDefault();
    //   // Reset our form values
    //   this.form.email = "";
    //   this.form.name = "";
    //   this.form.categoria = null;
    //   this.form.checked = [];
    //   // Trick to reset/clear native browser form validation state
    //   this.show = false;
    //   this.$nextTick(() => {
    //     this.show = true;
    //   });
    // },
  },
};
</script>