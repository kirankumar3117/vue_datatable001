<template>
  <IndexDataTable />
  <IndexOfKpi text="Activities" value="10"/>
</template>

<script>
import IndexDataTable from './components/DataTable/IndexDataTable.vue';
import IndexOfKpi from "./components/KPI/IndexOfKpi.vue"

export default {
  name: 'App',
  components: {
    IndexDataTable,
    IndexOfKpi
  }
}
</script>

<style></style>
