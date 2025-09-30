<template>
  <div id="app">
    <header>
      <h1>Rubrica Contatti</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  font: inherit;
}
</style>