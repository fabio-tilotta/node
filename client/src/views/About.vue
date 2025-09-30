<template>
  <div class="about">
    <h1>Chi Siamo</h1>
    <div class="content">
      <h2>Contattaci</h2>
      <p>
        Se vuoi lavorare con noi, non esitare a contattarci!
        Invia una mail a: <a href="mailto:careers@example.com">careers@example.com</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #1976D2;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 0.5px;
}

.content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #2196F3;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 1.5rem 0 1rem;
}

h2:first-child {
  margin-top: 0;
}

p {
  color: #616161;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

a {
  color: #1976D2;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  color: #2196F3;
  text-decoration: underline;
}
</style>]]>