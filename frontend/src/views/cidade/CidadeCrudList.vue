<template>
  <div>
    <v-card-title>
      Cidades
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
      :server-items-length="totalItens"
      :sort-desc.sync="sortDesc"
      :options.sync="options"
      :sort-by.sync="sortBy"
      class="elevation-1"
      :loading="loading"
      :headers="headers"
      :search="search"
      :items="rows"
    >
      <template v-slot:item.createdAt="{ item }">
        <div>
          {{item.createdAt | formatDate}}
        </div>
      </template>
      <template v-slot:item.updatedAt="{ item }">
        <div>
          {{item.updatedAt | formatDate}}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="mr-3"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{formTitle}}
          </span>
        </v-card-title>
        <v-form v-model="valid">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedItem.nome" label="Nome" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-autocomplete
                        @input="selectEstate"
                        v-model="model"
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="searchEstado"
                        color="black"
                        hide-no-data
                        hide-selected
                        item-text="Nome"
                        item-value="_id"
                        label="Estado"
                        return-object
                    ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" class="mr-4" outlined @click="closeDialog">Fechar</v-btn>
            <v-btn color="primary" @click="saveData">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CidadeRequest from './CidadeRequest';
import EstadoRequest from '../estado/EstadoRequest';
import RouterMixin from '../../plugins/router-mixin';
import PageableMixin from '../../plugins/pageable-mixin';
import NotificationMixin from '../../plugins/notification-mixin';

export default {
  name: 'CidadeCrudList',
  mixins: [RouterMixin, PageableMixin, NotificationMixin],
  data() {
    return {
      sortBy: 'nome',
      sortDesc: false,
      totalItens: null,
      dialog: false,
      loading: false,
      valid: false,
      options: {},
      search: '',
      entries: [],
      isLoading: false,
      model: null,
      searchEstado: null,
      editedItem: {
        nome: '',
        estadoId: '',
      },
      defaultItem: {
        nome: '',
        estadoId: '',
      },
      headers: [
        {
          text: 'Nome',
          value: 'nome',
          type: 'string'
        },
        {
          text: 'Estado',
          value: 'estadoId.abreviacao',
          align: 'center',
          sortable: false,
          type: 'string'
        },
        {
          text: 'Ultima atualização',
          value: 'updatedAt',
          type: 'date'
        },
        {
          text: 'Data de criação',
          value: 'createdAt',
          type: 'date'
        },
        {
          text: 'Ações',
          value: 'actions',
          type: 'string',
          sortable: false
        },
      ],
      rows: [],
      requestClass: CidadeRequest
    };
  },
  created() {
    this.makeRestRequest();
  },
  watch: {
    options: {
      handler (evento) {
        let {itemsPerPage, page, sortBy, sortDesc} = evento;
        let payload = {
          limit: itemsPerPage,
          page,
          sortBy: sortBy[0],
          sortDesc: sortDesc[0],
          textSearch: this.search
        }
        this.updateQueryParams(payload);
        this.updateQueryPaginate(payload);
        this.makeRestRequest();
      },
    },
    search () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(() => {
        this.fetchEntriesDebounced();
      }, 1000)
    },
    searchEstado () {
        if (this.items.length > 0) return 0;
        if (this.isLoading) return 0;

        this.isLoading = true
        EstadoRequest.listaEstados(this.searchEstado)
            .then(res => {
                const { data, total } = res.data;
                this.count = total;
                this.entries = data;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    selectEstate() {
        const { _id } = this.model;
        this.editedItem.estadoId = _id;
    },
    transformSortQueryParams(params) {
      const copy = { ...params };
      const retorno = {};
      let orderBy = 'desc';
      if (copy.sortBy) {
        if (copy.orderBy === 'desc') {
          orderBy = 'desc';
        }
        retorno.orderBy = orderBy;
        retorno.sortBy = copy.sortBy;
        delete copy.sortDesc;
      }
      Object.assign(retorno, copy);
      return retorno;
    },
    makeRestRequest() {
      this.loading = true;
      let queries = this.getQueryParams();
      const params = this.transformSortQueryParams(queries);
      this.requestClass.list(params).then(({ data }) => {
        this.handleResponse(data.data, data.total);
        this.updateQueryParams({limit: data.limit, page: data.page, sortBy: queries.sortBy, sortDesc: queries.sortDesc});
        this.updateQueryPaginate({limit: data.limit, page: data.page, sortBy: queries.sortBy, sortDesc: queries.sortDesc});
      });
    },
    handleResponse(rows, total) {
      this.totalItens = total;
      this.rows.splice(0);
      this.rows.push(...rows.map(item => item));
      this.loading = false;
    },
    closeDialog() {
      this.dialog = false;
      this.editedItem = this.defaultItem;
    },
    editItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      confirm('Tem certeza que quer apagar essa cidade?') && this.delete(item);
    },
    async delete(item) {
      try {
        await this.requestClass.remove(item._id);
        this.makeRestRequest();
        this.showSuccessToast({title: 'Cidade removida com sucesso!'})
      } catch (error) {
        let { data } = error.response;
        data.forEach(element => {
          this.showErrorToast({title: element.message });
        });
      }
    },
    async saveData() {
      if (this.editedItem._id) {
        try {
          await this.requestClass.edit(this.editedItem._id, this.editedItem);
          this.closeDialog();
          this.makeRestRequest();
          this.showSuccessToast({title: 'Estado editado com sucesso!'})
          return 0;
        } catch (error) {
          let { data } = error.response;
          data.forEach(element => {
            this.showErrorToast({title: element.message });
          });
        }
      }
      try {
        await this.requestClass.save(this.editedItem);
        this.closeDialog();
        this.makeRestRequest();
        this.showSuccessToast({title: 'Estado criado com sucesso!'})
        return 0;
      } catch (error) {
        let { data } = error.response;
        data.forEach(element => {
          this.showErrorToast({title: element.message });
        });
      }
      return 0;
    },
    fetchEntriesDebounced() {
        let {itemsPerPage, page, sortBy, sortDesc} = this.options;
        let payload = {
            limit: itemsPerPage,
            page,
            sortBy: sortBy[0],
            sortDesc: sortDesc[0],
            textSearch: this.search
        }
        this.updateQueryParams(payload);
        this.updateQueryPaginate(payload);
        this.makeRestRequest();
    }
  },
  computed: {
    formTitle () {
      return (this.editedItem._id && this.editedItem._id !== undefined) ? 'Editar cidade' : 'Cadastrar cidade';
    },
    items () {
        return this.entries.map(entry => {
          const Nome = entry.nome;
          return Object.assign({}, entry, { Nome })
        })
    },
  }
};
</script>
