<template>
  <div id="#app">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">Tasker</h2>
    </md-toolbar>
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-middle">
        <div class="md-toolbar-container">
          <h3 class="md-title">菜单</h3>
        </div>
      </md-toolbar>
      <div class="phone-viewport">
        <md-list>
          <md-list-item v-for="item in path">
            <router-link :to="{name: item.link}" @click.native="closeLeftSidenav">
              <md-icon>{{item.icon}}</md-icon>
              <span>{{item.name}}</span>
            </router-link>
          </md-list-item>
        </md-list>
      </div>
    </md-sidenav>
    <router-view></router-view>
  </div>
</template>
<script>
import store from 'renderer/vuex/store'
export default {
  store,
  data () {
    return {
      path: [{
        link: 'index-page',
        icon: 'toc',
        name: '周报'
      }, {
        link: 'setting-page',
        icon: 'settings',
        name: '设置'
      }]
    }
  },
  mounted () {
    this.$store.dispatch('getProjects')
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    closeLeftSidenav () {
      this.$refs.leftSidenav.close()
    }
  }
}
</script>
<style>
</style>
