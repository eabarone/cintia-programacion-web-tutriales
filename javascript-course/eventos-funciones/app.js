// Utilidades
function $(selector, scope = document) { 
  return scope.querySelector(selector); 
}

function $all(selector, scope = document) { 
  return Array.from(scope.querySelectorAll(selector)); 
}

// Sistema de progreso basado en interacciones
const progressTracker = {
  completed: new Set(),
  tasks: {
    'funcion-saludar': { weight: 15, name: 'Usar función de saludo' },
    'funcion-calcular': { weight: 15, name: 'Calcular área' },
    'evento-click': { weight: 15, name: 'Interactuar con evento click' },
    'evento-teclado': { weight: 15, name: 'Usar evento de teclado' },
    'contador-incrementar': { weight: 10, name: 'Incrementar contador' },
    'contador-decrementar': { weight: 10, name: 'Decrementar contador' },
    'contador-resetear': { weight: 10, name: 'Resetear contador' },
    'contador-completo': { weight: 10, name: 'Usar todas las funciones del contador' }
  },
  
  markComplete(taskId) {
    if (!this.completed.has(taskId) && this.tasks[taskId]) {
      this.completed.add(taskId);
      this.updateProgressBar();
      this.checkContadorCompleto();
    }
  },
  
  checkContadorCompleto() {
    const contadorTasks = ['contador-incrementar', 'contador-decrementar', 'contador-resetear'];
    const allCompleted = contadorTasks.every(task => this.completed.has(task));
    if (allCompleted) {
      this.markComplete('contador-completo');
    }
  },
  
  updateProgressBar() {
    const progressBar = $('#progress-bar');
    const progressText = $('#progress-text');
    if (!progressBar || !progressText) return;
    
    let totalWeight = 0;
    let completedWeight = 0;
    
    for (const [taskId, task] of Object.entries(this.tasks)) {
      totalWeight += task.weight;
      if (this.completed.has(taskId)) {
        completedWeight += task.weight;
      }
    }
    
    const progress = totalWeight > 0 ? (completedWeight / totalWeight) * 100 : 0;
    const roundedProgress = Math.round(progress);
    
    progressBar.style.width = `${roundedProgress}%`;
    progressText.textContent = `${roundedProgress}%`;
  }
};

// ============================================
// SECCIÓN: FUNCIONES
// ============================================

function setupFuncionSaludar() {
  const input = $('#nombre-input');
  const btn = $('#btn-saludar');
  const resultado = $('#resultado-saludo');
  
  if (!input || !btn || !resultado) return;
  
  function saludar(nombre) {
    if (!nombre || nombre.trim() === '') {
      return '👋 ¡Hola! ¿Cuál es tu nombre?';
    }
    return `👋 ¡Hola, ${nombre}! Bienvenido al tutorial.`;
  }
  
  function manejarSaludo() {
    const nombre = input.value;
    const mensaje = saludar(nombre);
    resultado.textContent = mensaje;
    resultado.classList.add('animate-slide-in');
    progressTracker.markComplete('funcion-saludar');
    
    setTimeout(() => {
      resultado.classList.remove('animate-slide-in');
    }, 500);
  }
  
  btn.addEventListener('click', manejarSaludo);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') manejarSaludo();
  });
}

function setupFuncionCalcular() {
  const anchoInput = $('#ancho-input');
  const altoInput = $('#alto-input');
  const btn = $('#btn-calcular');
  const resultado = $('#resultado-area');
  
  if (!anchoInput || !altoInput || !btn || !resultado) return;
  
  function calcularArea(ancho, alto) {
    return ancho * alto;
  }
  
  function manejarCalculo() {
    const ancho = parseFloat(anchoInput.value);
    const alto = parseFloat(altoInput.value);
    
    if (isNaN(ancho) || isNaN(alto) || ancho <= 0 || alto <= 0) {
      resultado.textContent = '⚠️ Por favor ingresa valores válidos';
      resultado.style.color = '#ef4444';
      return;
    }
    
    const area = calcularArea(ancho, alto);
    resultado.textContent = `📐 Área = ${area} unidades²`;
    resultado.style.color = '#374151';
    resultado.classList.add('animate-pulse-custom');
    progressTracker.markComplete('funcion-calcular');
    
    setTimeout(() => {
      resultado.classList.remove('animate-pulse-custom');
    }, 2000);
  }
  
  btn.addEventListener('click', manejarCalculo);
  
  [anchoInput, altoInput].forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') manejarCalculo();
    });
  });
}

// ============================================
// SECCIÓN: EVENTOS
// ============================================

function setupEventoClick() {
  const btn = $('#btn-click-demo');
  const counter = $('#click-counter');
  
  if (!btn || !counter) return;
  
  let clicks = 0;
  
  function manejarClick(evento) {
    clicks++;
    counter.textContent = `Clics: ${clicks}`;
    
    // Efecto visual
    btn.classList.add('animate-pulse-custom');
    setTimeout(() => {
      btn.classList.remove('animate-pulse-custom');
    }, 300);
    
    // Cambiar color según cantidad de clics
    if (clicks >= 10) {
      counter.style.color = '#dc2626'; // rojo
      counter.textContent = `🔥 Clics: ${clicks} - ¡Increíble!`;
    } else if (clicks >= 5) {
      counter.style.color = '#f59e0b'; // naranja
      counter.textContent = `⚡ Clics: ${clicks} - ¡Sigue así!`;
    } else {
      counter.style.color = '#10b981'; // verde
    }
    
    progressTracker.markComplete('evento-click');
  }
  
  btn.addEventListener('click', manejarClick);
}

function setupEventoTeclado() {
  const input = $('#keyboard-input');
  const output = $('#keyboard-output');
  
  if (!input || !output) return;
  
  function manejarTeclado(evento) {
    const texto = evento.target.value;
    const caracteres = texto.length;
    const palabras = texto.trim().split(/\s+/).filter(p => p.length > 0).length;
    
    output.textContent = `Caracteres: ${caracteres} | Palabras: ${palabras}`;
    
    if (caracteres > 0) {
      progressTracker.markComplete('evento-teclado');
    }
    
    // Feedback visual según longitud
    if (caracteres > 50) {
      output.style.color = '#10b981';
      output.textContent += ' ✨ ¡Excelente!';
    } else if (caracteres > 20) {
      output.style.color = '#f59e0b';
      output.textContent += ' 👍 ¡Bien!';
    } else {
      output.style.color = '#6b7280';
    }
  }
  
  input.addEventListener('input', manejarTeclado);
}

// ============================================
// SECCIÓN: EVENTOS + FUNCIONES (CONTADOR)
// ============================================

function setupContador() {
  const display = $('#contador-display');
  const btnIncrementar = $('#btn-incrementar');
  const btnDecrementar = $('#btn-decrementar');
  const btnResetear = $('#btn-resetear');
  
  if (!display || !btnIncrementar || !btnDecrementar || !btnResetear) return;
  
  let contador = 0;
  
  // Función para actualizar el display
  function actualizarDisplay() {
    display.textContent = contador;
    
    // Cambiar color según el valor
    if (contador > 0) {
      display.style.color = '#10b981'; // verde
    } else if (contador < 0) {
      display.style.color = '#ef4444'; // rojo
    } else {
      display.style.color = '#6b7280'; // gris
    }
    
    // Animación
    display.classList.add('animate-pulse-custom');
    setTimeout(() => {
      display.classList.remove('animate-pulse-custom');
    }, 300);
  }
  
  // Funciones manejadoras de eventos
  function incrementar(evento) {
    contador++;
    actualizarDisplay();
    progressTracker.markComplete('contador-incrementar');
  }
  
  function decrementar(evento) {
    contador--;
    actualizarDisplay();
    progressTracker.markComplete('contador-decrementar');
  }
  
  function resetear(evento) {
    contador = 0;
    actualizarDisplay();
    progressTracker.markComplete('contador-resetear');
  }
  
  // Asociar eventos con funciones
  btnIncrementar.addEventListener('click', incrementar);
  btnDecrementar.addEventListener('click', decrementar);
  btnResetear.addEventListener('click', resetear);
  
  // También podemos usar atajos de teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      incrementar(e);
    } else if (e.key === 'ArrowDown') {
      decrementar(e);
    } else if (e.key === 'r' || e.key === 'R') {
      resetear(e);
    }
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas las demos
  setupFuncionSaludar();
  setupFuncionCalcular();
  setupEventoClick();
  setupEventoTeclado();
  setupContador();
  
  // Inicializar barra de progreso en 0%
  progressTracker.updateProgressBar();
  
  // Si se ejecuta dentro de un iframe, informar altura al parent
  const inIframe = window.parent && window.parent !== window;
  if (inIframe && 'ResizeObserver' in window) {
    const sendSize = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'resize', height }, '*');
    };
    sendSize();
    const ro = new ResizeObserver(sendSize);
    ro.observe(document.body);
  }
  
  console.log('✅ Tutorial de Eventos y Funciones cargado correctamente');
  console.log('💡 Tip: Usa las flechas ↑↓ y la tecla R para controlar el contador');
});
