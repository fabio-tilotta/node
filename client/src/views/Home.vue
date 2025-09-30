<template>
  <div class="home-container">
    <div class="hero-section">
      <h1 class="hero-title">Benvenuto nella Rubrica Contatti</h1>
      <p class="hero-subtitle">Gestisci i tuoi contatti in modo semplice ed efficace</p>
      
      <div class="action-buttons">
        <router-link to="/contacts" class="btn btn-primary">
          <span class="material-icons">contact_page</span>
          Vai alla Lista Contatti
        </router-link>
        <router-link to="/about" class="btn btn-secondary">
          <span class="material-icons">info</span>
          Scopri di più
        </router-link>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <span class="material-icons feature-icon">person_add</span>
        <h3>Aggiungi Contatti</h3>
        <p>Crea nuovi contatti con tutte le informazioni necessarie</p>
      </div>
      <div class="feature-card">
        <span class="material-icons feature-icon">edit</span>
        <h3>Modifica Facilmente</h3>
        <p>Aggiorna i dati dei tuoi contatti in pochi click</p>
      </div>
      <div class="feature-card">
        <span class="material-icons feature-icon">search</span>
        <h3>Trova Rapidamente</h3>
        <p>Cerca e visualizza tutti i tuoi contatti</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  margin-bottom: 60px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 40px;
  opacity: 0.95;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn-primary {
  background-color: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.btn-secondary {
  background-color: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #667eea;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.feature-icon {
  font-size: 48px;
  color: #667eea;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>