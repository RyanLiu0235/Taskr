<template>
  <md-table-card>
    <!-- 表格 start -->
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="item in th">{{item.name}}</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="(row, index) in projectList" :key="index" :completed="row.completed" class="project-row">
          <md-table-cell>{{row.name}}</md-table-cell>
          <md-table-cell>{{row.version}}</md-table-cell>
          <md-table-cell>{{row.progress}}</md-table-cell>
          <md-table-cell>{{row.remarks}}</md-table-cell>
          <md-table-cell>
            <span>
              {{row.createdAt | getDate}}
              <md-tooltip md-delay="1000" md-direction="bottom">{{row.createdAt | getTime}}</md-tooltip>
            </span> -
            <span>
              {{row.lastModified | getDate}}
              <md-tooltip md-delay="1000" md-direction="bottom">{{row.lastModified | getTime}}</md-tooltip>
            </span>
          </md-table-cell>
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
                <md-menu-item @click.native="openDialog('dialog', 'edit', row)">
                  <md-icon>mode_edit</md-icon>
                  <span>编辑</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <!-- 表格 end -->
    <!-- 分页 start -->
    <md-table-pagination :md-size="5" :md-total="taskNum" :md-page="page" md-label="Rows" md-separator="of" :md-page-options="[5, 10, 25, 50]" @pagination="onPagination"></md-table-pagination>
    <!-- 分页 end -->
    <!-- 功能按钮 start -->
    <div class="table-action">
      <md-button class="md-icon-button md-raised md-accent" @click.native="openDialog('dialog', 'new')">
        <md-icon>note_add</md-icon>
        <md-tooltip md-delay="400" md-direction="bottom">添加任务</md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised md-warn" @click.native="sendMail">
        <md-icon>email</md-icon>
        <md-tooltip md-delay="400" md-direction="bottom">发送邮件</md-tooltip>
      </md-button>
    </div>
    <!-- 功能按钮 end -->
    <!-- 对话框 start -->
    <md-dialog ref="dialog">
      <md-dialog-title>创建新项目</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-input-container>
            <label>项目名称</label>
            <md-input v-model="dialogData.name"></md-input>
          </md-input-container>
          <md-input-container>
            <label>版本</label>
            <md-input v-model="dialogData.version"></md-input>
          </md-input-container>
          <md-input-container>
            <label>进度</label>
            <md-input v-model="dialogData.progress"></md-input>
          </md-input-container>
          <md-input-container>
            <label>备注</label>
            <md-textarea v-model="dialogData.remarks"></md-textarea>
          </md-input-container>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog')">取消</md-button>
        <md-button class="md-primary" @click.native="confirmDialog('dialog')">确认</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- 对话框 end -->
    <!-- 发送邮件对话框 start -->
    <md-dialog ref="dialog-mail" class="dialog-mail">
      <md-dialog-title>{{dialogMailTitle}}</md-dialog-title>
      <template v-if="mailNotify">
        <md-dialog-content v-if="!mailSuccess">
          <p>请稍后再试，或者检查一下配置</p>
        </md-dialog-content>
        <md-dialog-content v-else>
          <div v-if="mailResult.accepted.count > 0">
            <p>发送成功：</p>
            <p v-for="accepter in mailResult.accepted.detail">{{accepter}}</p>
          </div>
          <div v-if="mailResult.rejected.count > 0">
            <p>发送失败：</p>
            <p v-for="rejecter in mailResult.rejected.detail">{{rejecter}}</p>
          </div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDialog('dialog-mail')">确认</md-button>
        </md-dialog-actions>
      </template>
      <md-spinner :md-size="60" md-indeterminate class="md-accent" v-else></md-spinner>
    </md-dialog>
    <!-- 发送邮件对话框 end -->
    <!-- 小提示 start -->
    <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="2000">
      <span>{{dialogState === 'new' ? '新增' : '编辑'}}任务成功</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">关闭</md-button>
    </md-snackbar>
    <!-- 小提示 end -->
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
      size: 5,
      dialogState: '',
      dialogTid: '',
      dialogData: {
        name: '',
        version: '',
        progress: '',
        remarks: ''
      },
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
        name: '创建/最后操作时间',
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
    projectList () {
      const size = this.size
      const page = this.page
      const start = size * (page - 1)
      const end = size * page

      return this.projects.slice(start, end)
    },
    dialogMailTitle () {
      let title = '发送'

      if (this.mailNotify) {
        title += this.mailSuccess ? '成功' : '失败'
      } else {
        title += '中'
      }

      return title
    },
    ...mapGetters([
      'projects', 'mailNotify', 'mailSuccess', 'mailResult'
    ])
  },
  filters: {
    getDate (time) {
      return new Date(time).toLocaleDateString()
    },
    getTime (time) {
      return new Date(time).toLocaleTimeString()
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

      this.$store.dispatch('updateProject', {
        tid,
        newData: {
          completed: !completed
        }
      })
    },
    openDialog (ref, state, data) {
      this.dialogState = state
      switch (state) {
        case 'new':
          this.dialogTid = new Date().getTime()
          this.dialogData.name = ''
          this.dialogData.version = ''
          this.dialogData.progress = ''
          this.dialogData.remarks = ''
          break
        case 'edit':
          this.dialogTid = data.tid
          this.dialogData.name = data.name
          this.dialogData.version = data.version
          this.dialogData.progress = data.progress
          this.dialogData.remarks = data.remarks
          break
        default:
          break
      }
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      if (ref === 'dialog-mail') {
        this.$store.dispatch('resetMail')
      }
      this.$refs[ref].close()
    },
    confirmDialog (ref) {
      const state = this.dialogState
      const dialogData = this.dialogData
      const tid = this.dialogTid
      const data = {}
      data.name = dialogData.name
      data.version = dialogData.version
      data.progress = dialogData.progress
      data.remarks = dialogData.remarks
      data.lastModified = new Date().getTime()

      switch (state) {
        case 'new':
          data.createdAt = data.lastModified
          this.$store.dispatch('addProject', {
            tid,
            data
          })
          break
        case 'edit':
          this.$store.dispatch('updateProject', {
            tid,
            newData: data
          })
          break
        default:
          break
      }
      this.$refs[ref].close()
      this.$refs.snackbar.open()
    },
    sendMail () {
      this.$store.dispatch('sendMail', {
        data: this.projects
      })
      this.$refs['dialog-mail'].open()
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

.dialog-mail {
  .md-spinner {
    margin: 0 auto 20px;
  }
}
</style>
