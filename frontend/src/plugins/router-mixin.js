export default {
  methods: {
    navigateTo(routeName, params = {}) {
      this.$router.push({ name: routeName, params });
    },
    updateQueryParams(params) {
      this.$route.query.page = params.page || 1;
      this.$router.replace({
        query: {
          ...this.$route.query,
          ...params,
        },
      }).catch(() => {});
    },
    getQueryParams(defaultParams = {
      limit: 10,
      page: 1,
    }) {
      if (this.disableSetQueryString) {
        return {
          ...defaultParams,
          ...this.queryPaginate,
        };
      }
      return {
        ...defaultParams,
        ...this.$route.query,
      };
    },
  },
};
