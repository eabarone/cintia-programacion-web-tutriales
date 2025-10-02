// Utilidades
function $(selector, scope = document) { return scope.querySelector(selector); }
function $all(selector, scope = document) { return Array.from(scope.querySelectorAll(selector)); }

// Sistema de progreso basado en interacciones
const progressTracker = {
  completed: new Set(),
  tasks: {
    'demo-que-es': { weight: 20, name: 'Demostración ¿Qué es el DOM?' },
    'demo-acceso': { weight: 40, name: 'Prueba de selectores' },
    'demo-manipulacion-add': { weight: 20, name: 'Agregar elementos' },
    'demo-manipulacion-remove': { weight: 20, name: 'Eliminar elementos' }
  },
  
  markComplete(taskId) {
    if (!this.completed.has(taskId) && this.tasks[taskId]) {
      this.completed.add(taskId);
      this.updateProgressBar();
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

function setupQueEsDemo() {
  const btn = $('#btn-qe');
  const p = $('#demo-qe-text');
  if (!btn || !p) return;
  
  btn.addEventListener('click', () => {
    p.textContent = '¡El DOM nos permite modificar este contenido dinámicamente!';
    btn.textContent = 'Hecho';
    progressTracker.markComplete('demo-que-es');
    setTimeout(() => { btn.textContent = 'Cambiar texto'; }, 1200);
  });
}

function clearHighlights(scope) {
  $all('.highlight', scope).forEach(el => el.classList.remove('highlight'));
}

function setupAccesoDemo() {
  const wrap = $('#demo-acceso');
  const input = $('#selector-input');
  const result = $('#selector-result');
  const sample = $('#sample-acceso');
  const btn = $('#btn-probar-selector');
  if (!wrap || !input || !result || !sample || !btn) return;

  btn.addEventListener('click', () => {
    clearHighlights(sample);
    const selector = input.value.trim();
    if (!selector) {
      result.textContent = 'Escribe un selector para probar.';
      return;
    }
    let nodes = [];
    try {
      nodes = $all(selector, sample);
    } catch (err) {
      result.textContent = `Selector inválido: ${err.message}`;
      return;
    }
    if (nodes.length === 0) {
      result.textContent = 'No se encontraron coincidencias.';
      return;
    }
    nodes.forEach(n => n.classList.add('highlight'));
    result.textContent = `Coincidencias: ${nodes.length}`;
    progressTracker.markComplete('demo-acceso');
  });
}

function setupManipulacionDemo() {
  const input = $('#nuevo-item');
  const btnAdd = $('#btn-agregar');
  const btnRemove = $('#btn-eliminar');
  const list = $('#lista-dinamica');
  if (!input || !btnAdd || !btnRemove || !list) return;

  function addItem() {
    const text = (input.value || '').trim();
    const value = text || `Elemento ${list.children.length + 1}`;
    const li = document.createElement('li');
    li.textContent = value;
    list.append(li);
    input.value = '';
    progressTracker.markComplete('demo-manipulacion-add');
  }

  function removeLast() {
    const last = list.lastElementChild;
    if (last) last.remove();
    progressTracker.markComplete('demo-manipulacion-remove');
  }

  btnAdd.addEventListener('click', addItem);
  btnRemove.addEventListener('click', removeLast);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addItem();
  });
}

// Inicializar todo
window.addEventListener('DOMContentLoaded', () => {
  setupQueEsDemo();
  setupAccesoDemo();
  setupManipulacionDemo();
  
  // Inicializar barra de progreso en 0%
  progressTracker.updateProgressBar();

  // Si se ejecuta dentro de un iframe, informar altura al parent para autoajuste
  const inIframe = window.parent && window.parent !== window;
  if (inIframe && 'ResizeObserver' in window) {
    const sendSize = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'resize', height }, '*');
    };
    // Enviar al cargar
    sendSize();
    // Observar cambios en body
    const ro = new ResizeObserver(sendSize);
    ro.observe(document.body);
  }
});
