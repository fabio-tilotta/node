<template>
  <div class="app-layout">
    <header class="app-header">
      <h1 class="site-title">Rubrica Contatti</h1>
      <nav class="main-nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/contacts" class="nav-link">Lista Contatti</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <footer class="app-footer">
      <p>Questo non è AUTOTORINO &copy;</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: rgba(0,0,0,0.87);
  min-height: 100vh;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.site-title {
  color: #1976D2;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.nav-link {
  color: #616161;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #1976D2;
  background-color: rgba(25, 118, 210, 0.08);
}

.router-link-active {
  color: #1976D2;
  background-color: rgba(25, 118, 210, 0.08);
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  background-color: #f5f5f5;
  padding: 12px;
  text-align: center;
  border-top: 1px solid rgba(0,0,0,0.08);
}

.app-footer p {
  color: #757575;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 1px rgba(255,255,255,0.8);
  line-height: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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