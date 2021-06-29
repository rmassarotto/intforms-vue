<template>
  <b-card no-body header="Questões do formulários">
    <b-list-group flush>
      <div v-for="(questao, index) in value" :key="index">
        <b-list-group-item>
          <b-row>
            <b-col>
              <h3>{{ questao.titulo }}</h3>
            </b-col>
            <b-col class="text-right">
              <a href="#"
                ><b-icon
                  icon="trash-fill"
                  variant="danger"
                  @click="remove(index)"
                ></b-icon
              ></a>
            </b-col>
          </b-row>
          <br />
          <div
            v-for="(alternativa, index) in questao.alternativas"
            :key="index"
          >
            <b-icon icon="square" v-if="questao.tipoAlternativa === 2"></b-icon>
            <b-icon icon="circle" v-if="questao.tipoAlternativa === 1"></b-icon>
            {{ alternativa }}
          </div>
        </b-list-group-item>
      </div>
      <b-list-group-item v-if="value.length === 0"
        >Nenhuma questão inserida!</b-list-group-item
      >
    </b-list-group>
  </b-card>
</template>
<script>
export default {
  name: "f-list-questoes",
  props: {
    value: Array,
  },
  methods: {
    remove(index) {
      this.value.splice(index, 1);
    },
  },
};
</script>