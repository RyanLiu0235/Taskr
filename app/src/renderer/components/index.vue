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
    <md-speed-dial md-open="hover" md-direction="right" class="md-fab-bottom-left table-actions" md-theme="light-blue">
      <md-button class="md-fab md-mini" md-fab-trigger>
        <md-icon md-icon-morph>event</md-icon>
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-fab md-primary md-mini md-clean" id="fab" @click.native="openDialog('dialog2')">
        <md-icon>note_add</md-icon>
      </md-button>
      <md-button class="md-fab md-primary md-mini md-clean">
        <md-icon>email</md-icon>
      </md-button>
    </md-speed-dial>
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
      <md-dialog-title>创建新项目</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-input-container>
            <label>项目名称</label>
            <md-input></md-input>
          </md-input-container>
          <md-input-container>
            <label>版本</label>
            <md-input></md-input>
          </md-input-container>
          <md-input-container>
            <label>备注</label>
            <md-textarea></md-textarea>
          </md-input-container>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog2')">取消</md-button>
        <md-button class="md-primary" @click.native="closeDialog('dialog2')">确认</md-button>
      </md-dialog-actions>
    </md-dialog>
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
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
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

.table-actions.md-fab-bottom-left {
  bottom: 8px;
}
</style>
