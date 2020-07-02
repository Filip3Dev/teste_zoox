<template>
  <div class="home">
    <br>
    <div>
      <v-card>
        <v-card-title>
          Estado
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :items-per-page="5"
        ></v-data-table>
      </v-card>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar um Estado</span>
        </v-card-title>
        <v-form @submit="save">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Nome" v-model="body.abreviacao" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Abreviação" v-model="body.nome" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" type="submit">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-btn
      fab
      dark
      fixed
      right
      bottom
      @click="dialog = !dialog"
      color="pink"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// eslint-disable-next-line
import { getParams } from '../plugins/mixing';

export default {
  name: 'Estado',
  data() {
    return {
      dialog: false,
      search: '',
      body: {
        nome: '',
        abreviacao: ''
      },
      options: {
        page: 1,
        itemsPerPage: 10
      },
      headers: [
        { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'name' },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
      ],
    }
  },
  mixins: [getParams],
  created() {
    this.listEstados(this.getParams(this.options));
  },
  methods: {
    ...mapActions([
      'listEstados',
    ]),
    save() {
      console.log('body: ', this.body);
    }
  },
  computed: {
    ...mapState([
      'estados',
    ]),
  }
}
</script>
