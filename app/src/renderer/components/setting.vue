<template>
  <div class="taskr-setting">
    <h3>请设置您的邮箱</h3>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>邮箱smtp服务器</label>
        <md-input required v-model="server.host"></md-input>
      </md-input-container>
      <md-input-container>
        <label>用户邮箱</label>
        <md-input required v-model="server.auth.user"></md-input>
      </md-input-container>
      <md-input-container md-has-password>
        <label>用户密码</label>
        <md-input required type="password" v-model="server.auth.pass"></md-input>
      </md-input-container>
      <hr/>
      <md-input-container>
        <label>发件人</label>
        <md-input required v-model="mailOptions.from"></md-input>
      </md-input-container>
      <md-input-container>
        <label>收件人</label>
        <md-input required v-model="mailOptions.to"></md-input>
      </md-input-container>
      <md-input-container>
        <label>抄送</label>
        <md-input v-model="mailOptions.cc"></md-input>
      </md-input-container>
      <md-input-container>
        <label>标题</label>
        <md-input required v-model="mailOptions.subject"></md-input>
      </md-input-container>
      <hr/>
      <md-input-container>
        <label>签名</label>
        <md-textarea required v-model="metas"></md-textarea>
      </md-input-container>
      <md-button class="md-raised md-primary" @click.native="submitSetting">提交</md-button>
    </form>
    <!-- 弹窗提示 start -->
    <md-dialog ref="save-success" class="save-success">
      <md-dialog-title>添加成功</md-dialog-title>
      <md-dialog-content>
        <p>设置添加成功</p>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('save-success')">确认</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- 弹窗提示 end -->
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'setting-page',
  data () {
    return {
      server: {
        host: '',
        auth: {
          user: '',
          pass: ''
        }
      },
      mailOptions: {
        from: '', // 发送人
        to: '', // 发送人
        cc: '', // 抄送
        subject: '' // 标题
      },
      metas: ''
    }
  },
  computed: {
    ...mapGetters([
      'settingSave', 'settingGet'
    ])
  },
  watch: {
    settingSave: function (val) {
      if (val) {
        this.$refs['save-success'].open()
      }
    }
  },
  methods: {
    submitSetting () {
      this.$store.dispatch('saveSetting', {
        server: this.server,
        mailOptions: this.mailOptions,
        metas: this.metas
      })
    },
    closeDialog (ref) {
      this.$refs['save-success'].close()
      this.$router.push({
        name: 'index-page'
      })
    }
  }
}
</script>
<style lang="less">
.taskr-setting {
  padding: 0 20px;
}
</style>
