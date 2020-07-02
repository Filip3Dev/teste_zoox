export default {
  data: () => ({
    rows: [],
    totalItens: 0,
    disableSetQueryString: false,
    queryPaginate: {
      page: 1,
      limit: 10,
      sortBy: undefined,
      orderBy: undefined,
    },
  }),
  created() {
    if (this.disableSetQueryString) {
      this.makeRestRequest();
    }
  },
  methods: {
    updateQueryPaginate(params) {
      this.queryPaginate.page = params.page;
      this.queryPaginate.limit = params.limit;
      this.queryPaginate.sortBy = params.sortBy;
      this.queryPaginate.orderBy = params.orderBy || params.sortDesc;
    },
    getDefaultQueryPage() {
      const defaultPage = 1;
      if (this.disableSetQueryString) {
        return this.queryPaginate.page || defaultPage;
      }
      return this.$route.query.page || defaultPage;
    },
    getDefaultQueryLimit() {
      const defaultLimit = 10;
      if (this.disableSetQueryString) {
        return this.queryPaginate.limit || defaultLimit;
      }
      return this.$route.query.limit || defaultLimit;
    },
    getDefaultQuerySortBy() {
      const defaultSortBy = undefined;
      if (this.disableSetQueryString) {
        return this.queryPaginate.sortBy || defaultSortBy;
      }
      return this.$route.query.sortBy || defaultSortBy;
    },
    getDefaultQueryOrderBy() {
      const defaultOrderBy = undefined;
      if (this.disableSetQueryString) {
        return this.queryPaginate.orderBy || defaultOrderBy;
      }
      return this.$route.query.orderBy || defaultOrderBy;
    },
    setQueryStringPaginate({
      page = this.getDefaultQueryPage(),
      limit = this.getDefaultQueryLimit(),
      sortBy = this.getDefaultQuerySortBy(),
      orderBy = this.getDefaultQueryOrderBy(),
    } = {}) {
      this.updateQueryPaginate({
        page, limit, sortBy, orderBy,
      });

      if (this.disableSetQueryString) {
        this.getData();
        return;
      }

      this.$router.replace({
        query: {
          ...this.$route.query,
          limit,
          page,
          sortBy: sortBy || undefined,
          orderBy: orderBy || undefined,
        },
      }).catch(() => {});
    },
    pageUpdated(newPage) {
      this.setQueryStringPaginate({ page: newPage });
    },
    rowsPerPageUpdated(newLimit) {
      this.setQueryStringPaginate({ limit: newLimit, page: 1 });
    },
    orderUpdated(event) {
      const { column, orderBy } = event;
      if (orderBy === null) {
        this.setQueryStringPaginate({ sortBy: null, orderBy: null, page: 1 });
        return;
      }
      this.setQueryStringPaginate({ sortBy: column, orderBy, page: 1 });
    },
  },
  watch: {
    totalItens: {
      handler(value) {
        this.$emit('total-itens-updated', value);
      },
    },
    rows: {
      deep: true,
      handler(value) {
        this.$emit('total-rows-updated', value.length);
      },
    },
    '$route.query': {
      handler() {
        if (!this.disableSetQueryString) {
          this.makeRestRequest();
        }
      },
    },
  },
};
