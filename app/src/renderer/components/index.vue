<template>
  <div>
    <md-table v-once>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="item in th" md-numeric>{{item.name}}</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="(row, index) in project" :key="index">
          <md-table-cell md-numeric>{{row.name}}</md-table-cell>
          <md-table-cell md-numeric>{{row.version}}</md-table-cell>
          <md-table-cell md-numeric>{{row.progress}}</md-table-cell>
          <md-table-cell md-numeric>{{row.remarks}}</md-table-cell>
          <md-table-cell md-numeric>{{row.lastModified}}</md-table-cell>
          <md-table-cell md-numeric>操作</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>
<script>
export default {
  name: 'index-page',
  data () {
    return {
      th: [{
        name: '项目'
      }, {
        name: '版本'
      }, {
        name: '进度'
      }, {
        name: '备注'
      }, {
        name: '最后操作时间'
      }, {
        name: '操作'
      }],
      project: [{
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        lastModified: 1489906513106
      }, {
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        lastModified: 1489906513106
      }, {
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        lastModified: 1489906513106
      }]
    }
  }
}
</script>
<style>
</style>
