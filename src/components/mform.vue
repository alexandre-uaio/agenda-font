<template>
  <b-container fluid="sm">
    <b-row>
      <b-col>
        <b-form class="missaform">
          <b-form-group label="Local" label-for="localmissa">
            <b-form-select
              id="localmissa"
              v-model="selcomunidade"
              :options="comunidade"
              @change="SetHorario"
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Data" label-for="datamissa">
            <b-form-datepicker
              id="datamissa"
              v-model="datamissa"
              @context="onContext"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>

          <b-form-group label="Horário" label-for="horamissa">
            <b-form-select
              id="horamissa"
              v-model="horamissa"
              :options="horario"
              @change="SetTeste"
            ></b-form-select>
          </b-form-group>
          <div v-if="bmissa">
            <b-row>
              <b-col cols="9">
                <b-form-group label="Nome" label-for="nomemissa">
                  <b-form-input
                    placeholder="Informe seu nome"
                    id="nomemissa"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group label="Idade" label-for="idademissa">
                  <b-form-input
                    placeholder="Idade"
                    id="idademissa"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="celular" label-for="celularmissa">
              <b-form-input
                placeholder="Informe seu celular/telefone"
                id="celularmissa"
              ></b-form-input>
            </b-form-group>
          </div>
        </b-form>
        <b-row>
          <b-col>
            <b-button variant="success" block="">
              <b-icon icon="calendar-plus-fill" aria-hidden="true"></b-icon> Agendar
              </b-button>
          </b-col>
          <b-col>
            <b-button variant="primary" block="">Cancelar</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-card-group columns v-if="bmissa">
          <b-card bg-variant="success" text-variant="white" class="text-center">
            <template v-slot:header>
              <b-icon icon="unlock-fill"></b-icon>
              <h6 class="mb-0">LIVRES</h6>
            </template>
            <b-card-text>
              <h1>{{ assentoslivres }}</h1>
            </b-card-text>
          </b-card>
          <b-card bg-variant="danger" text-variant="white" class="text-center">
            <template v-slot:header>
              <b-icon icon="lock-fill"></b-icon>
              <h6 class="mb-0">OCUPADOS</h6>
            </template>
            <b-card-text>
              <h1>{{ assentosocupados }}</h1>
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      totalassentos: 130,
      assentosocupados: 0,
      assentoslivres: 0,
      selcomunidade: null,
      selhorario: null,
      datamissa: "",
      diamissa: "",
      horamissa: "",
      comunidade: [
        { value: null, text: "Selecione o local" },
        { value: "fatima", text: "Paróquia Nossa Senhora de Fátima" },
        { value: "saojose", text: "Comunidade São Jose" },
      ],
      horario: [],
      bmissa: true,
    };
  },
  methods: {
    makeToast(variant = null, msgtitle, msgbody) {
      this.$bvToast.toast(msgbody, {
        title: msgtitle,
        variant: variant,
        toaster: "b-toaster-bottom-full",
        solid: true,
      });
    },
    SetHorario() {
      if (this.selcomunidade == "fatima") {
        console.log(this.selcomunidade);
      } else {
        console.log("Não foi na paróquia!");
      }
    },
    SetTeste() {
      console.log("Comunidade.: " + this.selcomunidade);
      console.log("Data.: " + this.datamissa);
      console.log("Dia Missa.: " + this.diamissa);
      console.log("Hora.: " + this.horamissa);

      Vue.axios
        .get("missas", {
          params: {
            datamissa: this.datamissa,
            horamissa: this.horamissa,
            comunidade: this.selcomunidade,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.assentosocupados = response.data.length;
            this.assentoslivres = this.totalassentos - this.assentosocupados;
            console.log("Número de Registros.: " + response.data.length);
          } else {
            this.assentoslivres = this.totalassentos;
          }
          console.log("Resposta do Comando");
          console.log(response);
        })
        .catch((error) => {
          this.assentoslivres = this.totalassentos;
          console.log("Retorno com erro!");
          console.log(error);
        })
        .then(function() {
          console.log("Sempre passa aqui!");
        });
    },
    onContext(ctx) {
      console.log("Passei no contexto.: " + ctx.length);

      console.log(ctx);

      if (ctx.selectedDate != null) {
        if (this.isDateInvalid()) {
          this.makeToast(
            "danger",
            "Erro",
            "Reserva somente para a data de hoje ou datas futuras!"
          );
          return;
        }

        if (this.selcomunidade == "" || this.selcomunidade == null) {
          this.makeToast("danger", "Erro", "Selecione a Comunidade");
        } else {
          const tmp = ctx.selectedFormatted;
          this.diamissa = tmp.split(",")[0];

          if (
            this.selcomunidade == "saojose" &&
            (this.diamissa == "segunda-feira" ||
              this.diamissa == "terça-feira" ||
              this.diamissa == "quinta-feira")
          ) {
            this.makeToast(
              "danger",
              "Erro",
              "Não tem celebração para o dia da semana selecionado para a Comunidade São José Operário"
            );
            return;
          }

          this.Teste();
        }
      }

      // The date formatted in the locale, or the `label-no-date-selected` string
      //this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      //this.selected = ctx.selectedYMD
    },
    isDateInvalid() {
      let retval = true;
      let hoje = Date.now();
      let dataselms = Date.parse(this.datamissa);
      const dia = 86400000;

      console.log(retval);
      console.log(hoje);
      console.log(dataselms);
      console.log(dia);

      let resp = hoje - dataselms;

      console.log(resp);

      if (resp > dia && dataselms < hoje) {
        retval = true;
      } else {
        retval = false;
      }

      console.log(retval);

      return retval;
    },
    async Teste() {
      const hrl = await fetch("horario.json");
      const hrl2 = await hrl.json();

      if (
        this.diamissa != "" ||
        this.diamissa != null ||
        this.selcomunidade != "" ||
        this.selcomunidade != null
      ) {
        const horatmp = hrl2[this.selcomunidade][this.diamissa];
        this.horario.length = 0;
        for (var i = 0; i < horatmp.length; i++) {
          this.horario.push(horatmp[i]);
        }
      }
    },
  },
};
</script>

<style lang="css" scoped>
.missaform {
  text-align: left;
}
</style>
