<template>
  <md-table-card>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="item in th">{{item.name}}</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="(row, index) in projects" :key="index" :completed="row.completed" class="project-row">
          <md-table-cell>{{row.name}}</md-table-cell>
          <md-table-cell>{{row.version}}</md-table-cell>
          <md-table-cell>{{row.progress}}</md-table-cell>
          <md-table-cell>{{row.remarks}}</md-table-cell>
          <md-table-cell>{{row.lastModified | formatTime}}</md-table-cell>
          <md-table-cell class="has-ripple blue" @click.native="toggleTask(row.tid)">
            <md-ink-ripple />
            <md-icon class="check-task">{{row.completed ? 'clear': 'done'}}</md-icon>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <md-table-pagination md-size="10" :md-total="taskNum" :md-page="page" md-label="Rows" md-separator="of" :md-page-options="false" @pagination="onPagination"></md-table-pagination>
  </md-table-card>
</template>
<script>
export default {
  name: 'index-page',
  data () {
    return {
      page: 1,
      size: 10,
      th: [{
        name: '项目',
        width: 150
      }, {
        name: '版本',
        width: 100
      }, {
        name: '进度',
        width: 100
      }, {
        name: '备注',
        width: 240
      }, {
        name: '最后操作时间',
        width: 125
      }, {
        name: '操作',
        width: 85
      }],
      project: [{
        tid: 100000000000,
        name: '项目1啊啊啊啊啊啊项目1啊啊啊啊啊啊',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '了；啊是建档立卡就算了大富科技啊是了；啊是建档',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000001,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000002,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000003,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000004,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000005,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: true,
        lastModified: 1489906513106
      }, {
        tid: 100000000006,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000007,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000008,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000009,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000010,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000011,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000012,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000013,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }, {
        tid: 100000000014,
        name: '项目1',
        version: 'v5.8.6',
        progress: '100%',
        remarks: '',
        completed: false,
        lastModified: 1489906513106
      }]
    }
  },
  computed: {
    taskNum () {
      return this.project.length
    },
    projects () {
      const size = this.size
      const page = this.page
      const start = size * (page - 1)
      const end = size * page

      return this.project.slice(start, end)
    }
  },
  filters: {
    formatTime (time) {
      return new Date(time).toLocaleString()
    }
  },
  methods: {
    onPagination (arg) {
      this.page = arg.page
      this.size = arg.size
    },
    toggleTask (tid) {
      const project = this.project
      const index = project.findIndex((item) => item.tid === tid)
      const completed = project[index].completed
      this.project[index].completed = !completed
    }
  }
}
</script>
<style lang="less">
.check-task {
  cursor: pointer;
}

.project-row {
  &[completed] {
    background-color: #efefef;
  }
}
</style>
