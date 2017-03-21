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
          <md-table-cell class="project-action">
            <md-menu md-size="3">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click.native="toggleTask(row.tid)">
                  <md-icon>{{row.completed ? 'clear': 'done'}}</md-icon>
                  <span>{{row.completed ? '取消': '完成'}}</span>
                </md-menu-item>
                <md-menu-item>
                  <md-icon>mode_edit</md-icon>
                  <span>编辑</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <md-table-pagination md-size="10" :md-total="taskNum" :md-page="page" md-label="Rows" md-separator="of" :md-page-options="false" @pagination="onPagination"></md-table-pagination>
    <div class="table-action">
      <md-button class="md-icon-button md-raised md-accent" id="add-note" @click.native="openDialog('dialog')">
        <md-icon>note_add</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised md-warn">
        <md-icon>email</md-icon>
      </md-button>
    </div>
    <md-dialog md-open-from="#add-note" md-close-to="#add-note" ref="dialog">
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
        <md-button class="md-primary" @click.native="closeDialog('dialog')">取消</md-button>
        <md-button class="md-primary" @click.native="closeDialog('dialog')">确认</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-table-card>
</template>
<script>
import {
  mapGetters
} from 'vuex'
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
      }]
    }
  },
  computed: {
    taskNum () {
      return this.projects.length
    },
    projects () {
      const size = this.size
      const page = this.page
      const start = size * (page - 1)
      const end = size * page

      return this.projects.slice(start, end)
    },
    ...mapGetters([
      'projects'
    ])
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
      const project = this.projects
      const index = project.findIndex((item) => item.tid === tid)
      const completed = project[index].completed

      this.$store.dispatch('updateProjects', {
        tid,
        newData: {
          completed: !completed
        }
      })
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
  position: relative;
  &[completed] {
    background-color: #efefef;
  }
}

.md-table .project-action .md-icon-button .md-icon {
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
  font-size: 24px;
  margin: auto;
}

.table-action {
  position: absolute;
  top: -53px;
  right: 12px;
}
</style>
