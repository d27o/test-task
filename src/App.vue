<template>
  <div id="app">
    <div class="data-table mx-auto my-5">
      <div class="data-table__toolbar">
        <div class="data-table__select-wrp">
          <span>Показать</span>
          <select v-model.number="limit" class="data-table__select mx-1">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span>записей</span>
        </div>

        <label for="data-table__search"
          >Поиск:
          <input
            type="text"
            v-model="search"
            id="data-table__search"
            class="data-table__search"
        /></label>
      </div>

      <table class="table-auto data-table__main">
        <thead class="data-table__main-head">
          <tr>
            <th class="w-1/4">Кнопки</th>
            <th class="w-1/4">
              <button @click.prevent="handleSortClick" name="userId">
                sort
              </button>
              userId
            </th>
            <th class="w-1/4">
              <button @click.prevent="handleSortClick" name="id">sort</button>
              id
            </th>
            <th class="w-1/4">
              <button @click.prevent="handleSortClick" name="title">
                sort
              </button>
              title
            </th>
          </tr>
        </thead>
        <tbody v-if="paginatedData.length !== 0">
          <tr v-for="album of paginatedData" :key="album.id" class="w-full">
            <TableRow :album="album" />
          </tr>
        </tbody>
        <tbody v-else>
          <div>Поиск не дал результатов</div>
        </tbody>
      </table>
      <div style="" class="data-table__pagination-wrp">
        <span v-if="searchResult.length !== 0">
          Показано с {{ start + 1 }} по {{ end }} из
          {{ searchResult.length }}</span
        >
        <Pagination
          @onChangePage="handleChangePage"
          :pageCount="pageCount"
          :currentPage="page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import TableRow from "@/components/TableRow.vue";

export default {
  data() {
    return {
      limit: 5,
      page: 1,
      search: "",
      filterState: {
        default: (items) => [...items],
        fromLessToMore: (items, compareCallback) =>
          [...items].sort(compareCallback),
        fromMoreToLess: (items, compareCallback) =>
          [...items].sort(compareCallback).reverse(),
        currentState: "default",
        currentIndexState: 0,
      },
      currentFiltredProps: "",
    };
  },
  mounted() {
    this.$store.dispatch("getAlbums");
  },
  computed: {
    albums() {
      return this.$store.getters.albums;
    },
    pageCount() {
      let l = this.searchResult.length,
        s = this.limit;
      return Math.ceil(l / s);
    },
    start() {
      return (this.page - 1) * this.limit;
    },
    end() {
      return this.start + this.limit;
    },
    paginatedData() {
      return this.searchResult.slice(this.start, this.end);
    },
    searchResult() {
      return this.filtredResult.filter(
        (item) => item.title.indexOf(this.search) !== -1
      );
    },
    filtredResult() {
      return this.filterState[this.filterState.currentState](
        this.albums,
        this.compareByProp(this.currentFiltredProps)
      );
    },
  },
  methods: {
    handleChangePage(pageNumber) {
      this.page = pageNumber;
    },
    handleSortClick(e) {
      this.currentFiltredProps = e.target.name;
      const keys = Object.keys(this.filterState);
      this.filterState.currentIndexState++;
      this.filterState.currentState = keys[this.filterState.currentIndexState];
      if (this.filterState.currentIndexState >= 2) {
        this.filterState.currentIndexState = -1;
      }
      console.log("func");
    },
    compareByProp(prop) {
      return function(a, b) {
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
        return 0;
      };
    },
  },
  watch: {
    limit() {
      this.page = 1;
    },
    search() {
      this.page = 1;
    },
    filtredResult() {
      this.page = 1;
    },
    currentFiltredProps() {
      this.filterState.currentIndexState = 1;
      // this.filterState.currentState = "default";
      console.log("watch");
    },
  },
  components: {
    Pagination,
    TableRow,
  },
};
</script>

<style lang="scss">
.data-table {
  max-width: 1200px;
  &__toolbar {
    display: flex;
    justify-content: space-between;
  }
  &__select {
    &-wrp {
    }
  }
  &__search {
    border: 1px solid;
    border-radius: 5px;
  }
  &__main {
    width: 100%;
    &-head {
      width: 100%;
    }
  }
  &__pagination {
    &-wrp {
      display: flex;
      justify-content: space-between;
    }
  }
  tr,
  td {
    border: 0;
  }
}
</style>
