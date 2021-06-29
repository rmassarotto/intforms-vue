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

      <br />

      <b-card
        bg-variant="light"
        v-if="questao.tipoAlternativa"
        :title="questao.titulo"
      >
        <hr />
        <div v-for="(alt, index) in questao.alternativas" :key="index">
          <div class="mb-2 ml-2 d-flex flex-row">
            <div class="text-center pr-1" v-if="questao.tipoAlternativa != 3">
              <b-icon
                icon="square"
                v-if="questao.tipoAlternativa === 2"
              ></b-icon>
              <b-icon
                icon="circle"
                v-if="questao.tipoAlternativa === 1"
              ></b-icon>
            </div>

            <div class="alternativa">
              <div class="pl-1 pr-1">
                {{ alt }}
              </div>
            </div>

            <b-col class="trash-icon pl-2">
              <a href="#" @click="removeAlternativa(index)"
                ><b-icon icon="trash" variant="danger"></b-icon
              ></a>
            </b-col>
          </div>
        </div>

        <b-input-group>
          <b-form-input
            id="alternativa"
            v-model="alternativa"
            placeholder="Insira a alternativa aqui"
            required
          ></b-form-input>

          <b-input-group-append>
            <b-button @click="addAlternativa">+</b-button>
          </b-input-group-append>
        </b-input-group>
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
  name: "f-new-alternativa",
  data() {
    return {
      questao: {
        titulo: "",
        tipoAlternativa: null,
        alternativas: [],
      },
      alternativa: "",
      tiposAlternativas: [],
    };
  },
  async fetch() {
    const { data } = await this.$axios.get("tipo");
    this.tiposAlternativas = data;
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
    removeAlternativa(index) {
      this.questao.alternativas.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.trash-icon {
  display: none;
}

.alternativa:hover + .trash-icon {
  display: block;
}

.trash-icon:hover {
  display: block;
}
</style>