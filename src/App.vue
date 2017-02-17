<template>
	<div id="app">
		<img
			class="logo" src="./assets/logo.png"
		>
		<nav>
			<router-link to="/">Hello</router-link>
			<router-link to="/datatable">Datatable</router-link>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 100px;
  height: 100px;
	margin: 0 auto;
}
</style>