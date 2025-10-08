// ========================================
// TUTORIAL INTERACTIVO DE JAVASCRIPT
// ========================================

// Variables globales para el progreso
let progreso = 0;
const totalSecciones = 5;
const actividadesCompletadas = new Set(); // Para rastrear actividades completadas
const totalActividades = 20; // Total de actividades disponibles

// Función para simular console.log en la página
function logToPage(message) {
    const consoleDiv = document.getElementById('console-output');
    const newLine = document.createElement('div');
    newLine.innerHTML = `<span class="text-green-400">></span> <span class="text-white">${message}</span>`;
    consoleDiv.appendChild(newLine);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

// Función para mostrar resultados
function mostrarResultado(contenido) {
    document.getElementById('resultado').innerHTML = contenido;
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification bg-white border-l-4 p-4 rounded-lg shadow-lg ${
        tipo === 'success' ? 'border-green-500' : 
        tipo === 'error' ? 'border-gray-500' : 
        tipo === 'info' ? 'border-green-500' : 'border-gray-500'
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

// Función para actualizar progreso
function actualizarProgreso(actividadId, silencioso = false) {
    // Verificar si la actividad ya fue completada
    if (actividadesCompletadas.has(actividadId)) {
        return; // No incrementar si ya está completada
    }
    
    // Marcar actividad como completada
    actividadesCompletadas.add(actividadId);
    
    const oldProgreso = progreso;
    // Calcular progreso basado en actividades completadas
    progreso = Math.min((actividadesCompletadas.size / totalActividades) * 100, 100);
    progreso = Math.round(progreso); // Redondear para evitar decimales
    
    document.getElementById('progress-bar').style.width = progreso + '%';
    document.getElementById('progress-text').textContent = progreso + '%';
    
    // Mostrar notificación de progreso solo si no es silencioso y hubo cambio
    if (progreso > oldProgreso && !silencioso) {
        mostrarNotificacion(`¡Progreso actualizado! ${progreso}% (${actividadesCompletadas.size}/${totalActividades} actividades)`, 'success');
    }
    
    // Celebrar cuando se complete
    if (progreso === 100) {
        mostrarNotificacion('🎉 ¡Felicidades! Has completado todo el tutorial', 'success');
    }
}

// Función para mostrar secciones (simplificada para modo iframe)
function showSection(sectionName) {
    // En modo iframe, todas las secciones están visibles en flujo vertical
    // Esta función ahora solo hace scroll a la sección deseada
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        logToPage(`Navegando a sección: ${sectionName}`);
    }
}

// ========================================
// FUNCIONES DE VARIABLES
// ========================================

function practicaVariables() {
    let nombre = prompt("¿Cuál es tu nombre?") || "Estudiante";
    let edad = prompt("¿Cuántos años tienes?") || "0";
    let lenguajeFavorito = prompt("¿Cuál es tu lenguaje de programación favorito?") || "JavaScript";
    
    edad = parseInt(edad) || 0;
    
    let usuario = {
        nombre: nombre,
        edad: edad,
        lenguaje: lenguajeFavorito,
        fechaCreacion: new Date().toLocaleDateString()
    };
    
    let resultado = `
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-green-800 mb-4">👤 Perfil de programador creado</h3>
            <div class="bg-white p-4 rounded-lg mb-4">
                <p class="mb-2"><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p class="mb-2"><strong>Edad:</strong> ${usuario.edad} años</p>
                <p class="mb-2"><strong>Lenguaje favorito:</strong> ${usuario.lenguaje}</p>
                <p><strong>Fecha de registro:</strong> ${usuario.fechaCreacion}</p>
            </div>
            
            <h4 class="text-lg font-semibold text-green-700 mb-3">📝 Código generado:</h4>
            <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>let nombre = "${usuario.nombre}"; // String</div>
                <div>let edad = ${usuario.edad}; // Number</div>
                <div>let lenguaje = "${usuario.lenguaje}"; // String</div>
                <div>let usuario = { // Object</div>
                <div>&nbsp;&nbsp;nombre: nombre,</div>
                <div>&nbsp;&nbsp;edad: edad,</div>
                <div>&nbsp;&nbsp;lenguaje: lenguaje</div>
                <div>};</div>
            </div>
            
            <div class="mt-4 p-3 bg-light-green rounded-lg">
                <p class="text-dark-green"><strong>💡 Concepto aprendido:</strong> Has creado variables de diferentes tipos y las has organizado en un objeto.</p>
            </div>
        </div>
    `;
    
    mostrarResultado(resultado);
    logToPage(`Perfil creado para ${usuario.nombre}`);
    actualizarProgreso('practica-variables');
}

function explorarTipos() {
    let ejemplos = {
        string: "Hola JavaScript",
        number: 42,
        boolean: true,
        undefined: undefined,
        null: null,
        array: [1, 2, 3, "cuatro"],
        object: { nombre: "Ejemplo", activo: true }
    };
    
    let resultado = `
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-dark-green mb-4">📊 Tipos de datos en JavaScript</h3>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                ${Object.entries(ejemplos).map(([tipo, valor]) => `
                    <div class="bg-white p-4 rounded-lg border-l-4 border-primary-green">
                        <h4 class="font-bold text-secondary-green mb-2">${tipo.toUpperCase()}</h4>
                        <p class="text-gray-600 text-sm mb-2">Valor: ${JSON.stringify(valor)}</p>
                        <p class="text-gray-500 text-xs">Tipo: ${typeof valor}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-dark-gray mb-2">🔍 Prueba typeof:</h4>
                <div class="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                    <div>typeof "Hola" → ${typeof "Hola"}</div>
                    <div>typeof 42 → ${typeof 42}</div>
                    <div>typeof true → ${typeof true}</div>
                    <div>typeof undefined → ${typeof undefined}</div>
                    <div>typeof null → ${typeof null} (¡Cuidado! Es un bug histórico)</div>
                </div>
            </div>
        </div>
    `;
    
    mostrarResultado(resultado);
    logToPage("Tipos de datos explorados");
    actualizarProgreso('explorar-tipos');
}

// ========================================
// FUNCIONES DE OPERADORES
// ========================================

function practicaAritmetica() {
    let num1 = parseFloat(prompt("Primer número:")) || 10;
    let operador = prompt("Operador (+, -, *, /, %):") || "+";
    let num2 = parseFloat(prompt("Segundo número:")) || 5;
    
    let resultado;
    let explicacion;
    
    switch(operador) {
        case "+":
            resultado = num1 + num2;
            explicacion = "Suma: combina dos números";
            break;
        case "-":
            resultado = num1 - num2;
            explicacion = "Resta: substrae el segundo del primero";
            break;
        case "*":
            resultado = num1 * num2;
            explicacion = "Multiplicación: multiplica ambos números";
            break;
        case "/":
            resultado = num2 !== 0 ? num1 / num2 : "Error: División por cero";
            explicacion = "División: divide el primero entre el segundo";
            break;
        case "%":
            resultado = num1 % num2;
            explicacion = "Módulo: resto de la división";
            break;
        default:
            resultado = "Operador no válido";
            explicacion = "Operadores válidos: +, -, *, /, %";
    }
    
    let contenido = `
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-green-800 mb-4">🧮 Calculadora interactiva</h3>
            
            <div class="bg-white p-6 rounded-lg mb-4 text-center">
                <div class="text-4xl font-bold text-green-600 mb-2">${num1} ${operador} ${num2} = ${resultado}</div>
                <p class="text-gray-600">${explicacion}</p>
            </div>
            
            <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div>let num1 = ${num1};</div>
                <div>let num2 = ${num2};</div>
                <div>let resultado = num1 ${operador} num2;</div>
                <div>console.log(resultado); // ${resultado}</div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
                <button onclick="practicaAritmetica()" class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
                    🔄 Otra operación
                </button>
                <button onclick="mostrarOperadores()" class="bg-dark-gray text-white py-2 px-4 rounded-lg hover:bg-primary-gray transition-all">
                    📚 Ver todos los operadores
                </button>
            </div>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Operación: ${num1} ${operador} ${num2} = ${resultado}`);
    actualizarProgreso('practica-aritmetica');
}

function practicaComparacion() {
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    
    let comparaciones = [
        { op: '>', resultado: num1 > num2, desc: 'mayor que' },
        { op: '<', resultado: num1 < num2, desc: 'menor que' },
        { op: '>=', resultado: num1 >= num2, desc: 'mayor o igual que' },
        { op: '<=', resultado: num1 <= num2, desc: 'menor o igual que' },
        { op: '===', resultado: num1 === num2, desc: 'igual estricto a' },
        { op: '!==', resultado: num1 !== num2, desc: 'diferente de' }
    ];
    
    let contenido = `
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-dark-gray mb-4">🎯 Juego de comparaciones</h3>
            
            <div class="bg-white p-4 rounded-lg mb-4 text-center">
                <div class="text-3xl font-bold mb-4">Números: ${num1} y ${num2}</div>
                
                <div class="grid md:grid-cols-2 gap-3">
                    ${comparaciones.map(comp => `
                        <div class="p-3 rounded-lg ${comp.resultado ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'} border">
                            <div class="font-mono text-lg">${num1} ${comp.op} ${num2}</div>
                            <div class="text-sm text-gray-600">${num1} ${comp.desc} ${num2}</div>
                            <div class="font-bold ${comp.resultado ? 'text-green-600' : 'text-gray-600'}">${comp.resultado}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button onclick="practicaComparacion()" class="w-full bg-primary-green text-white py-3 px-6 rounded-lg hover:bg-secondary-green transition-all">
                🎲 Nuevos números aleatorios
            </button>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Comparando ${num1} y ${num2}`);
    actualizarProgreso('practica-comparacion');
}

function practicaLogica() {
    let edad = parseInt(prompt("¿Qué edad tienes?")) || 18;
    let tieneCarnet = confirm("¿Tienes carnet de conducir?");
    let tieneExperiencia = confirm("¿Tienes más de 2 años de experiencia conduciendo?");
    
    let puedeConducir = edad >= 18 && tieneCarnet;
    let puedeAlquilarCoche = puedeConducir && (edad >= 25 || tieneExperiencia);
    let necesitaAcompañante = edad < 18 || !tieneCarnet;
    
    let contenido = `
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-dark-green mb-4">🧩 Puzzle lógico: ¿Puedes conducir?</h3>
            
            <div class="bg-white p-4 rounded-lg mb-4">
                <h4 class="font-semibold mb-3">📋 Datos ingresados:</h4>
                <ul class="space-y-1 text-gray-700">
                    <li>• Edad: ${edad} años</li>
                    <li>• Carnet: ${tieneCarnet ? '✅ Sí' : '❌ No'}</li>
                    <li>• Experiencia: ${tieneExperiencia ? '✅ Sí' : '❌ No'}</li>
                </ul>
            </div>
            
            <div class="space-y-3">
                <div class="p-3 rounded-lg ${puedeConducir ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'} border">
                    <div class="font-semibold">¿Puede conducir?</div>
                    <div class="font-mono text-sm">edad >= 18 && tieneCarnet</div>
                    <div class="font-mono text-sm">${edad} >= 18 && ${tieneCarnet}</div>
                    <div class="font-bold ${puedeConducir ? 'text-green-600' : 'text-gray-600'}">${puedeConducir}</div>
                </div>
                
                <div class="p-3 rounded-lg ${puedeAlquilarCoche ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'} border">
                    <div class="font-semibold">¿Puede alquilar un coche?</div>
                    <div class="font-mono text-sm">puedeConducir && (edad >= 25 || tieneExperiencia)</div>
                    <div class="font-bold ${puedeAlquilarCoche ? 'text-green-600' : 'text-gray-600'}">${puedeAlquilarCoche}</div>
                </div>
                
                <div class="p-3 rounded-lg ${necesitaAcompañante ? 'bg-gray-100 border-gray-300' : 'bg-green-100 border-green-300'} border">
                    <div class="font-semibold">¿Necesita acompañante?</div>
                    <div class="font-mono text-sm">edad < 18 || !tieneCarnet</div>
                    <div class="font-bold ${necesitaAcompañante ? 'text-gray-600' : 'text-green-600'}">${necesitaAcompañante}</div>
                </div>
            </div>
            
            <button onclick="practicaLogica()" class="mt-4 w-full bg-dark-green text-white py-3 px-6 rounded-lg hover:bg-secondary-green transition-all">
                🔄 Probar con otros datos
            </button>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Lógica evaluada para edad ${edad}`);
    actualizarProgreso('practica-logica');
}

// ========================================
// FUNCIONES DE CONDICIONALES
// ========================================

function practicaCondicionales() {
    let situacion = prompt("Describe una situación (ej: 'llueve', 'soleado', 'nublado'):") || "soleado";
    let temperatura = parseInt(prompt("¿Qué temperatura hace? (en grados):")) || 20;
    
    let actividad;
    let ropa;
    let estado;
    
    if (situacion.toLowerCase().includes("lluv")) {
        actividad = "Quedarse en casa leyendo";
        ropa = "Impermeable y paraguas";
        estado = "🌧️ Lluvioso";
    } else if (temperatura > 25) {
        actividad = "Ir a la playa o piscina";
        ropa = "Ropa ligera y protector solar";
        estado = "☀️ Caluroso";
    } else if (temperatura < 10) {
        actividad = "Tomar chocolate caliente";
        ropa = "Abrigo y bufanda";
        estado = "❄️ Frío";
    } else {
        actividad = "Pasear por el parque";
        ropa = "Ropa cómoda";
        estado = "🌤️ Agradable";
    }
    
    let contenido = `
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-dark-gray mb-4">🎭 Simulador de decisiones</h3>
            
            <div class="bg-white p-4 rounded-lg mb-4">
                <div class="text-center mb-4">
                    <div class="text-4xl mb-2">${estado}</div>
                    <div class="text-lg font-semibold">Situación: ${situacion} - ${temperatura}°C</div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-light-green p-3 rounded-lg">
                        <h4 class="font-semibold text-dark-green">🎯 Actividad recomendada:</h4>
                        <p class="text-secondary-green">${actividad}</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                        <h4 class="font-semibold text-green-800">👕 Ropa sugerida:</h4>
                        <p class="text-green-700">${ropa}</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>if (situacion.includes("lluv")) {</div>
                <div>&nbsp;&nbsp;actividad = "Quedarse en casa";</div>
                <div>} else if (temperatura > 25) {</div>
                <div>&nbsp;&nbsp;actividad = "Ir a la playa";</div>
                <div>} else if (temperatura < 10) {</div>
                <div>&nbsp;&nbsp;actividad = "Chocolate caliente";</div>
                <div>} else {</div>
                <div>&nbsp;&nbsp;actividad = "Pasear";</div>
                <div>}</div>
            </div>
            
            <button onclick="practicaCondicionales()" class="mt-4 w-full bg-primary-green text-white py-3 px-6 rounded-lg hover:bg-secondary-green transition-all">
                🔄 Nueva situación
            </button>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Decisión tomada para: ${situacion} a ${temperatura}°C`);
    actualizarProgreso('practica-condicionales');
}

function practicaSwitch() {
    let dia = parseInt(prompt("Ingresa un número del 1 al 7 (día de la semana):")) || 1;
    
    let nombreDia;
    let tipo;
    let actividad;
    
    switch(dia) {
        case 1:
            nombreDia = "Lunes";
            tipo = "Laboral";
            actividad = "Empezar la semana con energía";
            break;
        case 2:
            nombreDia = "Martes";
            tipo = "Laboral";
            actividad = "Continuar con los proyectos";
            break;
        case 3:
            nombreDia = "Miércoles";
            tipo = "Laboral";
            actividad = "Mitad de semana, ¡sigue adelante!";
            break;
        case 4:
            nombreDia = "Jueves";
            tipo = "Laboral";
            actividad = "Casi llegamos al fin de semana";
            break;
        case 5:
            nombreDia = "Viernes";
            tipo = "Laboral";
            actividad = "¡Por fin viernes! Terminar tareas";
            break;
        case 6:
            nombreDia = "Sábado";
            tipo = "Fin de semana";
            actividad = "Relajarse y disfrutar";
            break;
        case 7:
            nombreDia = "Domingo";
            tipo = "Fin de semana";
            actividad = "Descansar y prepararse para la semana";
            break;
        default:
            nombreDia = "Día inválido";
            tipo = "Error";
            actividad = "Por favor ingresa un número del 1 al 7";
    }
    
    let contenido = `
        <div class="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-indigo-800 mb-4">🎮 Menú de días de la semana</h3>
            
            <div class="bg-white p-6 rounded-lg mb-4 text-center">
                <div class="text-4xl mb-2">${dia === 6 || dia === 7 ? '🎉' : '💼'}</div>
                <div class="text-2xl font-bold text-indigo-700 mb-2">${nombreDia}</div>
                <div class="text-lg text-indigo-600 mb-3">${tipo}</div>
                <div class="bg-indigo-50 p-3 rounded-lg">
                    <p class="text-indigo-800">${actividad}</p>
                </div>
            </div>
            
            <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div>switch(dia) {</div>
                <div>&nbsp;&nbsp;case 1:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;nombreDia = "Lunes";</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;break;</div>
                <div>&nbsp;&nbsp;case 2:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;nombreDia = "Martes";</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;break;</div>
                <div>&nbsp;&nbsp;// ... más casos</div>
                <div>&nbsp;&nbsp;default:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;nombreDia = "Inválido";</div>
                <div>}</div>
            </div>
            
            <button onclick="practicaSwitch()" class="w-full bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition-all">
                📅 Probar otro día
            </button>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Día seleccionado: ${nombreDia}`);
    actualizarProgreso('practica-switch');
}

// ========================================
// FUNCIONES DE CICLOS
// ========================================

function practicaFor() {
    let limite = parseInt(prompt("¿Hasta qué número quieres contar?")) || 10;
    let paso = parseInt(prompt("¿De cuánto en cuánto? (paso)")) || 1;
    
    let numeros = [];
    for (let i = 0; i <= limite; i += paso) {
        numeros.push(i);
    }
    
    let contenido = `
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-dark-green mb-4">🎯 Contador visual</h3>
            
            <div class="bg-white p-4 rounded-lg mb-4">
                <h4 class="font-semibold mb-3">📊 Contando de 0 a ${limite} (paso: ${paso})</h4>
                <div class="grid grid-cols-5 md:grid-cols-10 gap-2 mb-4">
                    ${numeros.slice(0, 50).map(num => `
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${num === 5 ? 'bg-green-500' : 'bg-gray-500'}">
                            ${num}
                        </div>
                    `).join('')}
                    ${numeros.length > 50 ? '<div class="col-span-5 text-center text-gray-500">... y más</div>' : ''}
                </div>
                <p class="text-gray-600">Total de números generados: ${numeros.length}</p>
            </div>
            
            <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div>for (let i = 0; i <= ${limite}; i += ${paso}) {</div>
                <div>&nbsp;&nbsp;console.log("Número: " + i);</div>
                <div>&nbsp;&nbsp;// Iteración número: " + (i/${paso} + 1)</div>
                <div>}</div>
                <div class="text-gray-600 mt-2">// Total de iteraciones: ${numeros.length}</div>
            </div>
            
            <button onclick="practicaFor()" class="w-full bg-primary-green text-white py-3 px-6 rounded-lg hover:bg-secondary-green transition-all">
                🔄 Nuevo contador
            </button>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Ciclo for ejecutado: 0 a ${limite}, paso ${paso}`);
    actualizarProgreso('practica-for');
}

function practicaWhile() {
    let numeroSecreto = Math.floor(Math.random() * 10) + 1;
    let intentos = 0;
    let adivinado = false;
    let historial = [];
    
    while (!adivinado && intentos < 5) {
        let intento = parseInt(prompt(`Intento ${intentos + 1}/5: Adivina el número (1-10):`));
        intentos++;
        historial.push(intento);
        
        if (intento === numeroSecreto) {
            adivinado = true;
        }
    }
    
    let contenido = `
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-dark-gray mb-4">🎲 Juego de adivinanza</h3>
            
            <div class="bg-white p-4 rounded-lg mb-4">
                <div class="text-center mb-4">
                    <div class="text-4xl mb-2">${adivinado ? '🎉' : '😅'}</div>
                    <div class="text-xl font-bold ${adivinado ? 'text-green-600' : 'text-gray-600'}">
                        ${adivinado ? '¡Felicidades! Adivinaste' : 'No adivinaste'}
                    </div>
                    <div class="text-lg text-dark-gray">El número era: ${numeroSecreto}</div>
                </div>
                
                <div class="mb-4">
                    <h4 class="font-semibold mb-2">📝 Historial de intentos:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${historial.map((intento, index) => `
                            <div class="px-3 py-1 rounded-lg border ${intento === numeroSecreto ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'}">
                                ${index + 1}: ${intento}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mt-4 p-3 bg-green-50 rounded-lg">
                    <p class="text-secondary-green">Intentos realizados: ${intentos}/5</p>
                </div>
            </div>
            
            <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div>let intentos = 0;</div>
                <div>let adivinado = false;</div>
                <div>while (!adivinado && intentos < 5) {</div>
                <div>&nbsp;&nbsp;let intento = prompt("Número:");</div>
                <div>&nbsp;&nbsp;intentos++;</div>
                <div>&nbsp;&nbsp;if (intento === numeroSecreto) {</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;adivinado = true;</div>
                <div>&nbsp;&nbsp;}</div>
                <div>}</div>
            </div>
            
            <button onclick="practicaWhile()" class="w-full bg-dark-gray text-white py-3 px-6 rounded-lg hover:bg-primary-gray transition-all">
                🎲 Nuevo juego
            </button>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Juego completado en ${intentos} intentos`);
    actualizarProgreso('practica-while');
}

function practicaForEach() {
    let tareas = [];
    let numTareas = parseInt(prompt("¿Cuántas tareas quieres agregar?")) || 3;
    
    for (let i = 0; i < numTareas; i++) {
        let tarea = prompt(`Tarea ${i + 1}:`) || `Tarea ${i + 1}`;
        tareas.push(tarea);
    }
    
    let tareasCompletadas = [];
    tareas.forEach((tarea, index) => {
        let completada = Math.random() > 0.5; // Simular completado aleatorio
        tareasCompletadas.push({ tarea, completada, index });
    });
    
    let contenido = `
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-secondary-green mb-4">📋 Lista de tareas interactiva</h3>
            
            <div class="bg-white p-4 rounded-lg mb-4">
                <h4 class="font-semibold mb-3">✅ Estado de las tareas:</h4>
                <div class="space-y-2">
                    ${tareasCompletadas.map(item => `
                        <div class="p-3 rounded-lg border ${item.completada ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'}">
                            <div class="flex items-center justify-between">
                                <span class="${item.completada ? 'line-through text-green-600' : 'text-gray-600'}">
                                    ${item.tarea}
                                </span>
                                <span class="text-2xl">${item.completada ? '✅' : '❌'}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-4 p-3 bg-green-50 rounded-lg">
                    <p class="text-secondary-green">
                        Completadas: ${tareasCompletadas.filter(t => t.completada).length}/${tareas.length}
                    </p>
                </div>
            </div>
            
            <div class="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div>let tareas = [${tareas.map(t => `"${t}"`).join(', ')}];</div>
                <div>tareas.forEach(function(tarea, index) {</div>
                <div>&nbsp;&nbsp;console.log(index + ": " + tarea);</div>
                <div>&nbsp;&nbsp;// Procesar cada tarea</div>
                <div>});</div>
            </div>
            
            <button onclick="practicaForEach()" class="w-full bg-secondary-green text-white py-3 px-6 rounded-lg hover:bg-dark-green transition-all">
                📋 Nueva lista de tareas
            </button>
        </div>
    `;
    
    mostrarResultado(contenido);
    logToPage(`Lista creada con ${tareas.length} tareas`);
    actualizarProgreso('practica-foreach');
}

// ========================================
// FUNCIONES DEL EDITOR DE CÓDIGO
// ========================================

// Plantillas de código predefinidas
const codeTemplates = {
    variables: `// Variables básicas en JavaScript
let nombre = "Juan";
let edad = 25;
const PI = 3.14159;

console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.log("PI:", PI);

// Cambiar el valor de una variable
edad = 26;
console.log("Nueva edad:", edad);`,

    operadores: `// Operadores aritméticos
let a = 10;
let b = 5;

console.log("Suma:", a + b);
console.log("Resta:", a - b);
console.log("Multiplicación:", a * b);
console.log("División:", a / b);
console.log("Módulo:", a % b);

// Operadores de comparación
console.log("a > b:", a > b);
console.log("a === b:", a === b);`,

    condicionales: `// Estructuras condicionales
let edad = 18;
let tieneCarnet = true;

if (edad >= 18 && tieneCarnet) {
    console.log("Puede conducir");
} else if (edad >= 18) {
    console.log("Puede sacar el carnet");
} else {
    console.log("Muy joven para conducir");
}

// Switch
let dia = 1;
switch(dia) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    default:
        console.log("Otro día");
}`,

    ciclos: `// Ciclos en JavaScript
console.log("=== Ciclo for ===");
for (let i = 1; i <= 5; i++) {
    console.log("Iteración:", i);
}

console.log("=== Ciclo while ===");
let contador = 0;
while (contador < 3) {
    console.log("Contador:", contador);
    contador++;
}

console.log("=== forEach con array ===");
let frutas = ["manzana", "banana", "naranja"];
frutas.forEach(function(fruta, index) {
    console.log(index + ":", fruta);
});`,

    funciones: `// Funciones en JavaScript
function saludar(nombre) {
    return "¡Hola, " + nombre + "!";
}

function calcularArea(largo, ancho) {
    return largo * ancho;
}

// Llamar las funciones
console.log(saludar("María"));
console.log("Área del rectángulo:", calcularArea(5, 3));

// Función flecha (arrow function)
const multiplicar = (a, b) => a * b;
console.log("Multiplicación:", multiplicar(4, 7));`,

    arrays: `// Trabajando con arrays
let numeros = [1, 2, 3, 4, 5];
let nombres = ["Ana", "Luis", "Carmen"];

console.log("Array de números:", numeros);
console.log("Primer número:", numeros[0]);
console.log("Longitud del array:", numeros.length);

// Agregar elementos
numeros.push(6);
console.log("Después de push:", numeros);

// Métodos de array
let pares = numeros.filter(num => num % 2 === 0);
console.log("Números pares:", pares);

let dobles = numeros.map(num => num * 2);
console.log("Números duplicados:", dobles);`
};

// Array para guardar código
let savedCode = [];

// Función para cargar plantillas
function loadTemplate() {
    const select = document.getElementById('code-templates');
    const editor = document.getElementById('code-editor');
    const template = select.value;
    
    if (template && codeTemplates[template]) {
        editor.value = codeTemplates[template];
        logToPage(`Plantilla cargada: ${template}`);
    }
}

// Función para ejecutar código
function ejecutarCodigo() {
    const code = document.getElementById('code-editor').value;
    const outputDiv = document.getElementById('code-output');
    const errorDiv = document.getElementById('code-errors');
    const successDiv = document.getElementById('code-success');
    const errorMessage = document.getElementById('error-message');
    
    // Limpiar salidas anteriores
    outputDiv.innerHTML = '';
    errorDiv.classList.add('hidden');
    successDiv.classList.add('hidden');
    
    if (!code.trim()) {
        outputDiv.innerHTML = '<div class="text-gray-400">// No hay código para ejecutar</div>';
        return;
    }
    
    // Capturar console.log
    const originalLog = console.log;
    const logs = [];
    
    console.log = function(...args) {
        logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
        originalLog.apply(console, args);
    };
    
    try {
        // Ejecutar el código
        eval(code);
        
        // Mostrar resultados
        if (logs.length > 0) {
            outputDiv.innerHTML = logs.map(log => 
                `<div class="text-green-400">> ${log}</div>`
            ).join('');
        } else {
            outputDiv.innerHTML = '<div class="text-green-400">// Código ejecutado (sin salida en consola)</div>';
        }
        
        // Mostrar mensaje de éxito
        successDiv.classList.remove('hidden');
        
        logToPage(`Código ejecutado: ${logs.length} líneas de salida`);
        mostrarNotificacion('Código ejecutado correctamente', 'success');
        actualizarProgreso('ejecutar-codigo');
        
    } catch (error) {
        // Mostrar error
        errorMessage.textContent = error.message;
        errorDiv.classList.remove('hidden');
        outputDiv.innerHTML = `<div class="text-gray-400">// Error: ${error.message}</div>`;
        
        logToPage(`Error en código: ${error.message}`);
        mostrarNotificacion(`Error: ${error.message}`, 'error');
    } finally {
        // Restaurar console.log original
        console.log = originalLog;
    }
}

// Función para limpiar el editor
function limpiarEditor() {
    document.getElementById('code-editor').value = '';
    document.getElementById('code-output').innerHTML = '<div class="text-gray-500">// La salida de tu código aparecerá aquí...</div>';
    document.getElementById('code-errors').classList.add('hidden');
    document.getElementById('code-success').classList.add('hidden');
    document.getElementById('code-templates').value = '';
    
    logToPage("Editor limpiado");
}

// Función para guardar código
function guardarCodigo() {
    const code = document.getElementById('code-editor').value;
    
    if (!code.trim()) {
        mostrarNotificacion('No hay código para guardar', 'warning');
        return;
    }
    
    const timestamp = new Date().toLocaleString();
    const codeEntry = {
        id: Date.now(),
        code: code,
        timestamp: timestamp,
        preview: code.substring(0, 50) + (code.length > 50 ? '...' : '')
    };
    
    savedCode.unshift(codeEntry);
    
    // Limitar a 10 códigos guardados
    if (savedCode.length > 10) {
        savedCode = savedCode.slice(0, 10);
    }
    
    updateSavedCodeList();
    logToPage(`Código guardado: ${codeEntry.preview}`);
    mostrarNotificacion('Código guardado exitosamente', 'success');
}

// Función para actualizar la lista de código guardado
function updateSavedCodeList() {
    const listDiv = document.getElementById('saved-code-list');
    
    if (savedCode.length === 0) {
        listDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No hay código guardado aún. ¡Escribe algo y guárdalo!</p>';
        return;
    }
    
    listDiv.innerHTML = savedCode.map(entry => `
        <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary-green transition-all">
            <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                    <div class="font-mono text-sm text-gray-700 mb-1">${entry.preview}</div>
                    <div class="text-xs text-gray-500">${entry.timestamp}</div>
                </div>
                <div class="flex gap-2 ml-4">
                    <button onclick="loadSavedCode(${entry.id})" class="text-secondary-green hover:text-dark-green text-sm">
                        📂 Cargar
                    </button>
                    <button onclick="deleteSavedCode(${entry.id})" class="text-gray-600 hover:text-gray-800 text-sm">
                        🗑️ Borrar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para cargar código guardado
function loadSavedCode(id) {
    const entry = savedCode.find(code => code.id === id);
    if (entry) {
        document.getElementById('code-editor').value = entry.code;
        logToPage(`Código cargado desde: ${entry.timestamp}`);
    }
}

// Función para eliminar código guardado
function deleteSavedCode(id) {
    savedCode = savedCode.filter(code => code.id !== id);
    updateSavedCodeList();
    logToPage("Código eliminado");
}

// Inicialización cuando se carga la página
window.addEventListener('DOMContentLoaded', function() {
    logToPage("🚀 Tutorial interactivo cargado");
    logToPage("📚 Todas las secciones están disponibles");
    logToPage("💡 Cada ejercicio te ayudará a entender JavaScript mejor");
    logToPage("📊 Tu progreso se guardará automáticamente");
});

// ========================================
// FUNCIONES PARA LA SECCIÓN DE INTRODUCCIÓN
// ========================================

// Función para ejecutar el primer código
function primerCodigo() {
    logToPage("Ejecutando tu primer código JavaScript...");
    logToPage("¡Hola, mundo!");
    
    mostrarResultado(`
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-green-800 mb-4">🎉 ¡Felicitaciones!</h3>
            <p class="text-green-700 mb-4">Acabas de ejecutar tu primera línea de código JavaScript:</p>
            <div class="bg-black rounded-lg p-4 mb-4">
                <code class="text-green-400 font-mono">console.log("¡Hola, mundo!");</code>
            </div>
            <div class="bg-white p-4 rounded-lg border border-green-200">
                <h4 class="font-semibold text-green-800 mb-2">¿Qué acabas de hacer?</h4>
                <ul class="text-green-700 space-y-1 text-sm">
                    <li>• <strong>console.log()</strong> es una función que muestra mensajes</li>
                    <li>• Las comillas ("") indican que es texto</li>
                    <li>• El punto y coma (;) termina la instrucción</li>
                </ul>
            </div>
        </div>
    `);
    
    mostrarNotificacion("¡Has ejecutado tu primer código JavaScript! 🎯", 'success');
    actualizarProgreso('primer-codigo', true);
}

// Función para demostración interactiva de JavaScript
function demostracionJS() {
    const demoArea = document.getElementById('demo-area');
    const colores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const mensajes = [
        "¡JavaScript puede cambiar colores! 🌈",
        "¡Puede cambiar texto dinámicamente! ✨",
        "¡Puede crear animaciones! 🎭",
        "¡Puede responder a tus clics! 👆",
        "¡Es súper poderoso! 💪"
    ];
    
    let contador = 0;
    
    const intervalo = setInterval(() => {
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        const mensajeAleatorio = mensajes[contador % mensajes.length];
        
        demoArea.style.backgroundColor = colorAleatorio;
        demoArea.style.transform = `scale(${1 + Math.sin(contador) * 0.1})`;
        demoArea.innerHTML = `
            <p class="text-white font-bold text-lg animate-bounce">
                ${mensajeAleatorio}
            </p>
        `;
        
        contador++;
        
        if (contador >= 10) {
            clearInterval(intervalo);
            demoArea.style.backgroundColor = '#10b981';
            demoArea.style.transform = 'scale(1)';
            demoArea.innerHTML = `
                <p class="text-white font-bold">
                    ¡Esto es solo el comienzo! 🚀
                </p>
            `;
        }
    }, 800);
    
    logToPage("Ejecutando demostración de JavaScript...");
    logToPage("Cambiando colores y contenido dinámicamente");
    
    mostrarResultado(`
        <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 class="text-2xl font-bold text-dark-green mb-4">🪄 ¡JavaScript en acción!</h3>
            <p class="text-secondary-green mb-4">Lo que acabas de ver demuestra el poder de JavaScript:</p>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg border border-green-200">
                    <h4 class="font-bold text-secondary-green mb-2">Manipulación del DOM</h4>
                    <p class="text-sm text-gray-600">JavaScript puede cambiar cualquier elemento de la página</p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-green-200">
                    <h4 class="font-bold text-dark-green mb-2">Interactividad</h4>
                    <p class="text-sm text-gray-600">Responde a eventos como clics, teclas, etc.</p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-green-200">
                    <h4 class="font-bold text-primary-green mb-2">Animaciones</h4>
                    <p class="text-sm text-gray-600">Crea efectos visuales y transiciones suaves</p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-green-200">
                    <h4 class="font-bold text-green-600 mb-2">Dinamismo</h4>
                    <p class="text-sm text-gray-600">Cambia contenido sin recargar la página</p>
                </div>
            </div>
        </div>
    `);
    
    mostrarNotificacion("¡Has visto JavaScript en acción! Ahora estás listo para aprender más 🌟", 'success');
    actualizarProgreso('demo-js', true);
}
