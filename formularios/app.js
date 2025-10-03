// ============================================
// UTILIDADES
// ============================================

function $(selector, scope = document) { 
  return scope.querySelector(selector); 
}

function $all(selector, scope = document) { 
  return Array.from(scope.querySelectorAll(selector)); 
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================

function mostrarNotificacion(mensaje, tipo = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification bg-white border-l-4 p-4 rounded-lg shadow-lg ${
    tipo === 'success' ? 'border-green-500' : 
    tipo === 'error' ? 'border-red-500' : 
    tipo === 'info' ? 'border-blue-500' : 'border-gray-500'
  }`;
  
  const icon = tipo === 'success' ? '✅' : 
               tipo === 'error' ? '❌' : 
               tipo === 'info' ? 'ℹ️' : '⚠️';
  
  notification.innerHTML = `
    <div class="flex items-center">
      <span class="text-2xl mr-3">${icon}</span>
      <div class="flex-1">
        <p class="text-gray-800 font-medium">${mensaje}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600 ml-4">
        ✕
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Mostrar con animación
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Auto-remover después de 4 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

// ============================================
// SISTEMA DE PROGRESO
// ============================================

const progressTracker = {
  completed: new Set(),
  tasks: {
    'form-basico': { weight: 15, name: 'Completar formulario básico' },
    'form-validacion-js': { weight: 25, name: 'Validación con JavaScript' },
    'form-html-comparacion': { weight: 10, name: 'Probar validación HTML' },
    'form-js-comparacion': { weight: 10, name: 'Probar validación JavaScript' },
    'form-proyecto-final': { weight: 40, name: 'Completar proyecto final' }
  },
  
  markComplete(taskId) {
    if (!this.completed.has(taskId) && this.tasks[taskId]) {
      this.completed.add(taskId);
      this.updateProgressBar();
      
      // Mostrar notificación de progreso
      const task = this.tasks[taskId];
      const progress = this.getProgress();
      mostrarNotificacion(`¡Progreso actualizado! ${progress}% - ${task.name}`, 'success');
    }
  },
  
  getProgress() {
    let totalWeight = 0;
    let completedWeight = 0;
    
    for (const [taskId, task] of Object.entries(this.tasks)) {
      totalWeight += task.weight;
      if (this.completed.has(taskId)) {
        completedWeight += task.weight;
      }
    }
    
    return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
  },
  
  updateProgressBar() {
    const progressBar = $('#progress-bar');
    const progressText = $('#progress-text');
    if (!progressBar || !progressText) return;
    
    const progress = this.getProgress();
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    
    // Celebrar cuando se complete
    if (progress === 100) {
      setTimeout(() => {
        mostrarNotificacion('🎉 ¡Felicidades! Has completado todo el tutorial de formularios', 'success');
      }, 500);
    }
  }
};

// ============================================
// UTILIDADES DE VALIDACIÓN
// ============================================

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarError(inputId, mensaje) {
  const input = $(`#${inputId}`);
  const errorElement = $(`#error-${inputId}`);
  const successElement = $(`#success-${inputId}`);
  
  if (input) {
    input.classList.add('border-red-500');
    input.classList.remove('border-green-500');
  }
  
  if (errorElement) {
    errorElement.textContent = mensaje;
    errorElement.classList.remove('hidden');
  }
  
  if (successElement) {
    successElement.classList.add('hidden');
  }
}

function mostrarExito(inputId, mensaje = '') {
  const input = $(`#${inputId}`);
  const errorElement = $(`#error-${inputId}`);
  const successElement = $(`#success-${inputId}`);
  
  if (input) {
    input.classList.remove('border-red-500');
    input.classList.add('border-green-500');
  }
  
  if (errorElement) {
    errorElement.classList.add('hidden');
  }
  
  if (successElement) {
    if (mensaje) successElement.textContent = mensaje;
    successElement.classList.remove('hidden');
  }
}

function limpiarValidacion(inputId) {
  const input = $(`#${inputId}`);
  const errorElement = $(`#error-${inputId}`);
  const successElement = $(`#success-${inputId}`);
  
  if (input) {
    input.classList.remove('border-red-500', 'border-green-500');
  }
  
  if (errorElement) {
    errorElement.classList.add('hidden');
  }
  
  if (successElement) {
    successElement.classList.add('hidden');
  }
}

// ============================================
// FORMULARIO BÁSICO
// ============================================

function setupFormularioBasico() {
  const form = $('#form-basico');
  const resultadoDiv = $('#resultado-basico');
  const datosDiv = $('#datos-basico');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const datos = {};
    
    for (let [key, value] of formData.entries()) {
      datos[key] = value;
    }
    
    // Mostrar resultado
    if (resultadoDiv && datosDiv) {
      datosDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${datos.nombre || 'No proporcionado'}</p>
        <p><strong>Email:</strong> ${datos.email || 'No proporcionado'}</p>
        <p><strong>Edad:</strong> ${datos.edad || 'No proporcionado'}</p>
      `;
      resultadoDiv.classList.remove('hidden');
    }
    
    // Notificación
    mostrarNotificacion('✅ Formulario básico enviado correctamente', 'success');
    
    // Actualizar progreso
    progressTracker.markComplete('form-basico');
    
    // Limpiar formulario después de 2 segundos
    setTimeout(() => {
      form.reset();
      if (resultadoDiv) resultadoDiv.classList.add('hidden');
    }, 3000);
  });
}

// ============================================
// FORMULARIO CON VALIDACIÓN JAVASCRIPT
// ============================================

function setupFormularioValidacionJS() {
  const form = $('#form-validacion-js');
  const resultadoDiv = $('#resultado-validacion-js');
  
  if (!form) return;
  
  const usernameInput = $('#username-js');
  const emailInput = $('#email-js');
  const passwordInput = $('#password-js');
  const confirmPasswordInput = $('#confirm-password-js');
  
  // Validación en tiempo real para username
  if (usernameInput) {
    usernameInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      
      if (value === '') {
        limpiarValidacion('username-js');
      } else if (value.length < 4) {
        mostrarError('username-js', 'El usuario debe tener al menos 4 caracteres');
      } else if (value.includes(' ')) {
        mostrarError('username-js', 'El usuario no puede contener espacios');
      } else {
        mostrarExito('username-js');
      }
    });
  }
  
  // Validación en tiempo real para email
  if (emailInput) {
    emailInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      
      if (value === '') {
        limpiarValidacion('email-js');
      } else if (!validarEmail(value)) {
        mostrarError('email-js', 'Email inválido. Formato: ejemplo@correo.com');
      } else {
        mostrarExito('email-js');
      }
    });
  }
  
  // Validación en tiempo real para password
  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      const value = e.target.value;
      
      if (value === '') {
        limpiarValidacion('password-js');
      } else if (value.length < 8) {
        mostrarError('password-js', 'La contraseña debe tener al menos 8 caracteres');
      } else {
        mostrarExito('password-js');
      }
      
      // Revalidar confirmación si ya tiene valor
      if (confirmPasswordInput && confirmPasswordInput.value) {
        validarConfirmPassword();
      }
    });
  }
  
  // Validación para confirmar password
  function validarConfirmPassword() {
    const password = passwordInput ? passwordInput.value : '';
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
    
    if (confirmPassword === '') {
      limpiarValidacion('confirm-password-js');
    } else if (password !== confirmPassword) {
      mostrarError('confirm-password-js', 'Las contraseñas no coinciden');
    } else {
      mostrarExito('confirm-password-js');
    }
  }
  
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', validarConfirmPassword);
  }
  
  // Validación al enviar
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput ? usernameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
    
    let isValid = true;
    
    // Validar username
    if (username === '') {
      mostrarError('username-js', 'El usuario es obligatorio');
      isValid = false;
    } else if (username.length < 4) {
      mostrarError('username-js', 'El usuario debe tener al menos 4 caracteres');
      isValid = false;
    } else if (username.includes(' ')) {
      mostrarError('username-js', 'El usuario no puede contener espacios');
      isValid = false;
    }
    
    // Validar email
    if (email === '') {
      mostrarError('email-js', 'El email es obligatorio');
      isValid = false;
    } else if (!validarEmail(email)) {
      mostrarError('email-js', 'Email inválido');
      isValid = false;
    }
    
    // Validar password
    if (password === '') {
      mostrarError('password-js', 'La contraseña es obligatoria');
      isValid = false;
    } else if (password.length < 8) {
      mostrarError('password-js', 'La contraseña debe tener al menos 8 caracteres');
      isValid = false;
    }
    
    // Validar confirmación
    if (confirmPassword === '') {
      mostrarError('confirm-password-js', 'Debes confirmar la contraseña');
      isValid = false;
    } else if (password !== confirmPassword) {
      mostrarError('confirm-password-js', 'Las contraseñas no coinciden');
      isValid = false;
    }
    
    if (isValid) {
      // Mostrar resultado
      if (resultadoDiv) {
        resultadoDiv.classList.remove('hidden');
      }
      
      // Notificación
      mostrarNotificacion('🎉 ¡Registro exitoso! Todos los campos son válidos', 'success');
      
      // Actualizar progreso
      progressTracker.markComplete('form-validacion-js');
      
      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        form.reset();
        limpiarValidacion('username-js');
        limpiarValidacion('email-js');
        limpiarValidacion('password-js');
        limpiarValidacion('confirm-password-js');
        if (resultadoDiv) resultadoDiv.classList.add('hidden');
      }, 3000);
    } else {
      mostrarNotificacion('❌ Por favor corrige los errores en el formulario', 'error');
    }
  });
}

// ============================================
// COMPARACIÓN HTML VS JAVASCRIPT
// ============================================

function setupComparacionHTML() {
  const form = $('#form-html');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    mostrarNotificacion('✅ Validación HTML exitosa - El navegador validó automáticamente', 'success');
    progressTracker.markComplete('form-html-comparacion');
    
    setTimeout(() => {
      form.reset();
    }, 2000);
  });
}

function setupComparacionJS() {
  const form = $('#form-js-comparacion');
  const emailInput = $('#email-comparacion');
  const errorElement = $('#error-comparacion');
  
  if (!form || !emailInput) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Limpiar error previo
    if (errorElement) {
      errorElement.classList.add('hidden');
    }
    emailInput.classList.remove('border-red-500', 'border-green-500');
    
    // Validar
    if (email === '') {
      if (errorElement) {
        errorElement.textContent = '❌ El email es obligatorio';
        errorElement.classList.remove('hidden');
      }
      emailInput.classList.add('border-red-500');
      mostrarNotificacion('❌ El email es obligatorio', 'error');
      return;
    }
    
    if (!validarEmail(email)) {
      if (errorElement) {
        errorElement.textContent = '❌ El formato del email no es válido';
        errorElement.classList.remove('hidden');
      }
      emailInput.classList.add('border-red-500');
      mostrarNotificacion('❌ El formato del email no es válido', 'error');
      return;
    }
    
    // Éxito
    emailInput.classList.add('border-green-500');
    mostrarNotificacion('✅ Validación JavaScript exitosa - Email válido con lógica personalizada', 'success');
    progressTracker.markComplete('form-js-comparacion');
    
    setTimeout(() => {
      form.reset();
      emailInput.classList.remove('border-green-500');
    }, 2000);
  });
}

// ============================================
// PROYECTO FINAL
// ============================================

function setupProyectoFinal() {
  const form = $('#form-proyecto-final');
  const resultadoDiv = $('#resultado-proyecto-final');
  const datosDiv = $('#datos-proyecto-final');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener todos los valores
    const nombre = $('#nombre-final')?.value.trim() || '';
    const apellido = $('#apellido-final')?.value.trim() || '';
    const email = $('#email-final')?.value.trim() || '';
    const telefono = $('#telefono-final')?.value.trim() || '';
    const edad = $('#edad-final')?.value || '';
    const pais = $('#pais-final')?.value || '';
    const intereses = $all('input[name="intereses"]:checked').map(cb => cb.value);
    const terminos = $('#terminos-final')?.checked || false;
    
    let isValid = true;
    
    // Limpiar errores previos
    ['nombre-final', 'apellido-final', 'email-final', 'telefono-final', 'edad-final', 'pais-final', 'intereses-final', 'terminos-final'].forEach(id => {
      const errorElement = $(`#error-${id}`);
      if (errorElement) errorElement.classList.add('hidden');
      const input = $(`#${id}`);
      if (input) input.classList.remove('border-red-500');
    });
    
    // Validaciones personalizadas adicionales
    if (nombre === '') {
      mostrarError('nombre-final', 'El nombre es obligatorio');
      isValid = false;
    }
    
    if (apellido === '') {
      mostrarError('apellido-final', 'El apellido es obligatorio');
      isValid = false;
    }
    
    if (email === '') {
      mostrarError('email-final', 'El email es obligatorio');
      isValid = false;
    } else if (!validarEmail(email)) {
      mostrarError('email-final', 'El formato del email no es válido');
      isValid = false;
    }
    
    if (telefono === '') {
      mostrarError('telefono-final', 'El teléfono es obligatorio');
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(telefono)) {
      mostrarError('telefono-final', 'El teléfono debe tener exactamente 10 dígitos');
      isValid = false;
    }
    
    if (edad === '') {
      mostrarError('edad-final', 'La edad es obligatoria');
      isValid = false;
    } else if (parseInt(edad) < 18) {
      mostrarError('edad-final', 'Debes ser mayor de 18 años');
      isValid = false;
    }
    
    if (pais === '') {
      mostrarError('pais-final', 'Debes seleccionar un país');
      isValid = false;
    }
    
    if (intereses.length === 0) {
      mostrarError('intereses-final', 'Debes seleccionar al menos un interés');
      isValid = false;
    }
    
    if (!terminos) {
      mostrarError('terminos-final', 'Debes aceptar los términos y condiciones');
      isValid = false;
    }
    
    if (isValid) {
      // Mostrar resultado
      if (datosDiv) {
        datosDiv.innerHTML = `
          <p><strong>Nombre completo:</strong> ${nombre} ${apellido}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Edad:</strong> ${edad} años</p>
          <p><strong>País:</strong> ${pais}</p>
          <p><strong>Intereses:</strong> ${intereses.join(', ') || 'Ninguno'}</p>
          <p><strong>Términos aceptados:</strong> Sí</p>
        `;
      }
      
      if (resultadoDiv) {
        resultadoDiv.classList.remove('hidden');
      }
      
      // Notificación de éxito
      mostrarNotificacion('🎉 ¡Felicidades! Registro completado exitosamente', 'success');
      
      // Actualizar progreso
      progressTracker.markComplete('form-proyecto-final');
      
      // Scroll al resultado
      resultadoDiv?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Limpiar formulario después de 5 segundos
      setTimeout(() => {
        form.reset();
        if (resultadoDiv) resultadoDiv.classList.add('hidden');
      }, 5000);
    } else {
      mostrarNotificacion('❌ Por favor corrige los errores en el formulario', 'error');
    }
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas las secciones
  setupFormularioBasico();
  setupFormularioValidacionJS();
  setupComparacionHTML();
  setupComparacionJS();
  setupProyectoFinal();
  
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
  
  console.log('✅ Tutorial de Formularios cargado correctamente');
  console.log('💡 Completa los formularios para aumentar tu progreso');
});
