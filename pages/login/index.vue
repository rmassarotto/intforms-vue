<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 d-flex vh-100 justify-content-center">
        <div class="col-md-4 align-self-center">
          <b-card bg-variant="light" class="text-center">
            <b-card-text class="mt-5 mb-5">
              <h1>Intforms</h1>
              <p>Informe os dados abaixo para acessar</p>

              <b-form @submit.prevent="login">
                <b-form-group>
                  <b-form-input
                    v-model="email"
                    type="email"
                    placeholder="E-mail"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-form-input
                    v-model="senha"
                    type="password"
                    placeholder="Senha"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-button block type="submit" variant="primary"
                  >Acessar</b-button
                >
              </b-form>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      senha: null,
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            senha: this.senha,
          },
        });
        this.$router.push("/");
      } catch (e) {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email ou senha incorretos",
        });
        console.log(e);
      }
    },
  },
};
</script>

