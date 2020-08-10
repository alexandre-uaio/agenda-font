<template>
  <b-container class="divcontainer">
    <div>
      <b-form class="missaform">
        <div>
          <b-form-group label="Local" label-for="localmissa">
            <b-form-select
              id="localmissa"
              v-model="selcomunidade"
              :options="comunidade"
              @change="setComunidade"
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
              placeholder="Selecione a Hora"
              v-model="horamissa"
              :options="horario"
              @change="setHorario"
            ></b-form-select>
          </b-form-group>
        </div>
        <div v-if="bassentos">
          <b-card-group deck>
            <b-card
              bg-variant="success"
              text-variant="white"
              class="text-center"
            >
              <template v-slot:header>
                <b-icon icon="unlock-fill" class="mr-2"></b-icon>
                <span>LIVRES</span>
              </template>
              <b-card-text>
                <h3>{{ assentoslivres }}</h3>
              </b-card-text>
            </b-card>
            <b-card
              bg-variant="danger"
              text-variant="white"
              class="text-center"
            >
              <template v-slot:header>
                <b-icon icon="lock-fill" class="mr-2"></b-icon>
                <span>OCUPADOS</span>
              </template>
              <b-card-text>
                <h3>{{ assentosocupados }}</h3>
              </b-card-text>
            </b-card>
          </b-card-group>
        </div>

        <div v-if="bencerrada" class="mt-3">
          <b-card
            bg-variant="warning"
            text-variant="white"
            title="Agendamento Encerrado"
          >
            <b-card-text>
              A agendamento foi encerrado devido ao preenchimento de todas as
              vagas para esta celebração!
            </b-card-text>
            <b-button variant="primary" @click="novaReserva"
              >Selecionar outra data</b-button
            >
          </b-card>
        </div>

        <div v-if="bmissa" class="mt-3">
          <b-row>
            <b-col cols="9">
              <b-form-group label="Nome" label-for="nomemissa">
                <b-form-input
                  placeholder="Informe seu nome"
                  id="nomemissa"
                  v-model="nome"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="Idade" label-for="idademissa">
                <b-form-input
                  placeholder="Idade"
                  id="idademissa"
                  v-model="idade"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label="Celular" label-for="celularmissa">
            <b-form-input
              placeholder="Informe seu celular/telefone"
              id="celularmissa"
              v-model="celular"
              :formatter="CelularFormater"
            ></b-form-input>
          </b-form-group>
        </div>
        <div v-if="bmissa">
          <b-row>
            <b-col>
              <b-button size="md" variant="success" block @click="agendarMissa">
                <b-icon
                  icon="calendar-plus-fill"
                  class="mr-2"
                  aria-hidden="true"
                ></b-icon
                >Agendar
              </b-button>
            </b-col>
            <b-col>
              <b-button size="md" variant="primary" block @click="novaReserva">
                <b-icon
                  icon="trash-fill"
                  class="mr-2"
                  aria-hidden="true"
                ></b-icon>
                Cancelar</b-button
              >
            </b-col>
          </b-row>
        </div>
      </b-form>
    </div>
    <div v-if="bcodigo" class="mt-3">
      <b-row>
        <b-col>
          <b-card
            img-src="../assets/reservaokp.gif"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <b-card-text>
              <h3>Código Reserva: {{ codigoreserva }}</h3>
            </b-card-text>
            <b-button @click="novaReserva" block variant="info">
              <b-icon
                icon="calendar-plus-fill"
                class="mr-2"
                aria-hidden="true"
              ></b-icon>
              Nova Reserva</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </div>
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
      nome: "",
      celular: "",
      idade: "",
      assento: "",
      comunidade: [
        { value: null, text: "Selecione o local" },
        { value: "fatima", text: "Paróquia Nossa Senhora de Fátima" },
        { value: "saojose", text: "Comunidade São Jose" },
      ],
      horario: [],
      codigoreserva: 0,
      bmissa: false,
      bassentos: false,
      bcodigo: false,
      bencerrada: false,
    };
  },
  methods: {
    makeToast(variant = null, msgtitle, msgbody) {
      this.$bvToast.toast(msgbody, {
        title: msgtitle,
        variant: variant,
        autoHideDelay: 5000,
        toaster: "b-toaster-bottom-full",
        solid: true,
      });
    },
    setComunidade() {
      if (this.selcomunidade == "fatima") {
        console.log(this.selcomunidade);
      } else {
        console.log("Não foi na paróquia!");
      }
      if (this.bencerrada == true) {
        this.novaReserva();
      }
    },
    setHorario() {
      console.log("Comunidade.: " + this.selcomunidade);
      console.log("Data.: " + this.datamissa);
      console.log("Dia Missa.: " + this.diamissa);
      console.log("Hora.: " + this.horamissa);
      if (this.bencerrada == true) {
        this.novaReserva();
      }
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
          if (this.assentoslivres > 0) {
            this.bmissa = true;
          } else {
            this.bencerrada = true;
          }
          this.bassentos = true;
          console.log("Resposta do Comando");
          console.log(response);
        })
        .catch((error) => {
          this.assentoslivres = this.totalassentos;
          this.assentosocupados = 0;
          this.bmissa = true;
          this.bassentos = true;
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
      if (this.bencerrada == true) {
        this.novaReserva();
      }

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
          this.selhorario = null;
          this.horamissa = null;
          this.fillSelectHorario();
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
    async fillSelectHorario() {
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

      console.log("Passei aqui na função Fill Select");
    },
    agendarMissa() {
      console.log("Passei aqui Alexandre no botao");
      console.log("Comunidade.: " + this.selcomunidade);
      console.log("Data.: " + this.datamissa);
      console.log("Dia Missa.: " + this.diamissa);
      console.log("Hora.: " + this.horamissa);
      console.log("Nome.: " + this.nome);
      console.log("Idade.: " + this.idade);
      console.log("Celular.: " + this.celular);
      this.assento = 88;
      console.log("Assento.: " + this.assento);

      if (this.nome == "" || this.nome.length == 0) {
        this.makeToast(
          "primary",
          "Atenção: Falha no preenchimento do campo!",
          "O nome deve ser informado para agendamento!"
        );
        return;
      }

      if (this.idade == "" || this.idade.length == 0) {
        this.makeToast(
          "primary",
          "Atenção: Falha no preenchimento do campo!",
          "A idade deve ser informada para agendamento!"
        );
        return;
      }

      if (this.celular == "" || this.celular.length == 0) {
        this.makeToast(
          "primary",
          "Atenção: Falha no preenchimento do campo!",
          "O número do celular deve ser informado para agendamento!"
        );
        return;
      }

      if (this.idade < 12 || this.idade > 59) {
        this.makeToast(
          "warning",
          "Atenção: ",
          "Idade fora da faixa estipulada pela Diocese!"
        );
        return;
      }

      Vue.axios
        .post("missa", {
          datamissa: this.datamissa,
          horamissa: this.horamissa,
          comunidade: this.selcomunidade,
          nome: this.nome,
          celular: this.celular,
          idade: this.idade,
          assento: this.assentosocupados + 1,
        })
        .then((response) => {
          console.log(response.status);
          console.log("Resposta do Comando");
          console.log(response);
          if (response.status == 200) {
            if (response.data.erro == 0) {
              console.log("Resposta veio com status 200 e erro.: 0");
              this.codigoreserva = response.data.codigoreserva;
              this.assentoslivres -= 1;
              this.assentosocupados = this.codigoreserva;
              this.makeToast(
                "success",
                "Atenção: ",
                "Agendamento realizado com sucesso!"
              );

              this.bmissa = false;
              this.bcodigo = true;
            } else {
              console.log(
                "Resposta veio com status 200 e erro.: " + response.data.erro
              );
            }
          }
        })
        .catch((error) => {
          console.log("Retorno com erro!");
          if (error.response.status == 400) {
            this.makeToast(
              "danger",
              "Atenção: ",
              "Reserva duplicada para esta data, favor agendar para outra data!"
            );
          }
        })
        .then(function() {
          console.log("Sempre passa aqui!");
        });
    },
    tstReservas() {
      Vue.axios
        .get("missas", {
          params: {
            datamissa: "2020-08-11",
            horamissa: "19:30",
            comunidade: "fatima",
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
    CelularFormater(_txt) {
      console.log(_txt);
      if (_txt.length == 1 && _txt != "(") {
        return "(" + _txt;
      } else if (_txt.length == 3) {
        console.log(_txt.indexOf(")"));
        return _txt + ")";
      } else if (_txt.length > 13) {
        console.log("Passei aqui");
        console.log(_txt.substr(0, _txt.length - 1));
        return _txt.substr(0, _txt.length - 1);
      }
      return _txt;
    },
    novaReserva() {
      this.bmissa = false;
      this.bassentos = false;
      this.bcodigo = false;
      this.bencerrada = false;
      this.datamissa = null;
      this.horamissa = null;
      this.selcomunidade = null;
      this.nome = "";
      this.celular = "";
      this.idade = "";
      this.assentosocupados = 0;
      this.assentoslivres = 0;
      this.assento = 0;
      this.assentoindex = 0;
    },
  },
};
</script>

<style lang="css" scoped>
.missaform {
  text-align: left;
}
.divcontainer {
}
</style>
