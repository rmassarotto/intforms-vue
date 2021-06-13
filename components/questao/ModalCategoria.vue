<template>
  <div>
    <b-modal
      id="modal-categoria"
      title="Nova Categoria"
      @ok="handleOk"
      @hidden="resetModal"
    >
      <b-form>
        <b-form-group label="Categoria">
          <b-form-input
            id="input-categoria-modal"
            placeholder="Insira a categoria aqui"
            v-model="categoria"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template #modal-footer="{ cancel, ok }">
        <b-button size="sm" @click="cancel()"> Cancelar </b-button>
        <b-button size="sm" variant="primary" @click="ok()"> Salvar </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "f-modal-categoria",
  data() {
    return {
      categoria: null,
    };
  },
  methods: {
    handleOk() {
      let self = this;
      this.$axios
        .post("categoria", { nome: this.categoria })
        .then(function () {
          self.resetModal();
          self.$emit("updateCategoria");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    resetModal() {
      this.categoria = null;
    },
  },
};
</script>