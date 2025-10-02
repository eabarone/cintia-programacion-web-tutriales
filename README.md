# 📚 Tutoriales JavaScript - Curso Interactivo

Curso completo de JavaScript con tutoriales interactivos que cubren desde fundamentos hasta manipulación del DOM y manejo de eventos. Cada tutorial incluye ejemplos prácticos, ejercicios interactivos y un sistema de progreso que rastrea tu avance.

## 🗂️ Estructura del Proyecto

```
javascript-course/
├── README.md                  # Este archivo - Documentación completa
├── shared-styles.css          # Estilos compartidos por todos los proyectos
├── fundamentos/
│   ├── index.html            # Tutorial de fundamentos de JavaScript
│   ├── styles.css            # Estilos específicos (tooltips, notificaciones)
│   └── app.js                # Lógica interactiva y sistema de progreso
├── dom/
│   ├── index.html            # Tutorial del DOM
│   ├── styles.css            # Estilos específicos (árbol DOM, resaltado)
│   └── app.js                # Lógica interactiva y sistema de progreso
└── eventos-funciones/
    ├── index.html            # Tutorial de eventos y funciones
    ├── styles.css            # Estilos específicos (vacío - usa solo compartidos)
    └── app.js                # Lógica interactiva y sistema de progreso
```

## 🎨 Sistema de Estilos

### **shared-styles.css** (Archivo Global)

Contiene todos los estilos compartidos entre proyectos:
- ✅ Variables CSS (colores, sombras, radios)
- ✅ Reset básico
- ✅ Tipografía base
- ✅ Bloques de código
- ✅ Barra de progreso
- ✅ Animaciones (bounce, pulse, slideIn)
- ✅ Efectos hover
- ✅ Media queries responsive

### **Estilos Específicos por Proyecto**

Cada proyecto tiene su propio `styles.css` para estilos únicos:

- **fundamentos/styles.css**: Tooltips, notificaciones, editor de código con syntax highlighting
- **dom/styles.css**: Árbol DOM visual, resaltado de selección, listas dinámicas, tablero de eventos
- **eventos-funciones/styles.css**: Vacío (usa solo estilos compartidos)

## 🚀 Despliegue en GitHub Pages

### ✅ **Compatible con GitHub Pages**

La estructura con `shared-styles.css` funciona perfectamente en GitHub Pages porque:

1. **Rutas relativas**: Todos los proyectos usan `../shared-styles.css`
2. **Sin dependencias externas**: Solo TailwindCSS desde CDN
3. **Estructura estática**: HTML, CSS y JS puros

### 📝 **Configuración para GitHub Pages**

1. **Estructura de URLs**:
   ```
   https://tu-usuario.github.io/javascript-course/
   ├── shared-styles.css
   ├── fundamentos/index.html
   ├── dom/index.html
   └── eventos-funciones/index.html
   ```

2. **Acceso a los tutoriales**:
   - Fundamentos: `/fundamentos/`
   - DOM: `/dom/`
   - Eventos y Funciones: `/eventos-funciones/`

3. **No requiere configuración especial**: GitHub Pages sirve archivos estáticos automáticamente

## 🎯 Características

### **Sistema de Progreso Interactivo**
- Barra de progreso que se actualiza con las interacciones del usuario
- Tracking de tareas completadas
- Porcentaje de 0-100% calculado proporcionalmente

### **Diseño Responsive**
- Optimizado para móviles, tablets y desktop
- Grids que se adaptan automáticamente
- Código con scroll horizontal en pantallas pequeñas
- Prevención de overflow en todos los contenedores

### **Estilo Consistente**
- Paleta de colores verde (#10b981, #059669, #d1fae5)
- TailwindCSS para utilidades
- Animaciones suaves
- Cards interactivos con efectos hover

## 💡 Ventajas del CSS Compartido

### ✅ **Beneficios**
1. **Mantenibilidad**: Cambios en un solo archivo afectan a todos los proyectos
2. **Consistencia**: Mismo look & feel en todos los tutoriales
3. **Rendimiento**: Navegador cachea `shared-styles.css` una sola vez
4. **Tamaño**: Reduce código duplicado significativamente

### 📊 **Reducción de Código**
- **Antes**: ~200 líneas de CSS por proyecto = 600 líneas totales
- **Después**: 220 líneas compartidas + ~80 líneas específicas = 300 líneas totales
- **Ahorro**: ~50% de código CSS

## 🛠️ Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/javascript-course.git

# Abrir cualquier tutorial
cd javascript-course/fundamentos
# Abrir index.html en tu navegador
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Móviles iOS/Android

## 🎓 Contenido de los Tutoriales

### 1. **Fundamentos de JavaScript** 📖

**Ruta**: `/fundamentos/`

#### Temas Cubiertos:
- **¿Qué es JavaScript?**
  - Conceptos fundamentales
  - Dónde se usa JavaScript
  - Características principales
  - Cómo funciona JavaScript

- **Variables y Tipos de Datos**
  - `let`, `const`, `var`
  - Tipos de datos (string, number, boolean, undefined, null, array, object)
  - Operador `typeof`

- **Operadores**
  - Aritméticos (+, -, *, /, %)
  - Comparación (==, ===, !=, >, <, >=)
  - Lógicos (&&, ||, !)

- **Estructuras Condicionales**
  - if / else if / else
  - switch

- **Ciclos y Bucles**
  - for
  - while

#### Ejemplos Interactivos:
- ✨ Primer código JavaScript
- 🎮 JavaScript en acción
- 👤 Crear perfil de usuario
- 🧮 Calculadora interactiva
- 🎯 Juego de comparaciones
- 🧩 Puzzle lógico
- 🎭 Simulador de decisiones
- 🎮 Menú de opciones
- 🎯 Contador visual

---

### 2. **DOM (Document Object Model)** 🌳

**Ruta**: `/dom/`

#### Temas Cubiertos:
- **¿Qué es el DOM?**
  - Representación en árbol
  - Nodos y elementos
  - Atributos
  - Buenas prácticas

- **Acceso a Elementos del DOM**
  - `getElementById()`
  - `querySelector()` y `querySelectorAll()`
  - Recorridos (children, parentElement, nextElementSibling)
  - Errores comunes y buenas prácticas

- **Manipulación del DOM**
  - `textContent` vs `innerHTML`
  - `setAttribute()`, `classList`
  - `createElement()`, `append()`, `prepend()`, `remove()`
  - DocumentFragment para inserción eficiente
  - Patrones de actualización

#### Ejemplos Interactivos:
- 🌲 Visualización de estructura en árbol
- 🎮 Demostración de cambio de texto
- 🔍 Probador de selectores CSS
- 📋 Lista dinámica (agregar/eliminar elementos)

#### Sistema de Progreso:
- Demo "¿Qué es el DOM?": **20%**
- Prueba de selectores: **40%**
- Agregar elementos: **20%**
- Eliminar elementos: **20%**

---

### 3. **Eventos y Funciones** ⚡

**Ruta**: `/eventos-funciones/`

#### Temas Cubiertos:
- **Funciones en JavaScript**
  - ¿Qué son las funciones?
  - Tipos de funciones (declaración, expresión, flecha, anónima)
  - Anatomía de una función
  - Parámetros y valores de retorno
  - Arrow Functions (ES6)

- **Eventos en JavaScript**
  - ¿Qué son los eventos?
  - Tipos de eventos (mouse, teclado, formulario)
  - `addEventListener()`
  - Objeto Event y sus propiedades
  - Métodos útiles (preventDefault, stopPropagation)

- **Eventos + Funciones: La Combinación Perfecta**
  - Por qué combinarlos
  - Patrones de código organizado
  - Delegación de eventos
  - Mejores prácticas y antipatrones

#### Ejemplos Interactivos:
- 👋 Función de saludo personalizado
- 📐 Calculadora de área de rectángulo
- 🖱️ Contador de clics con feedback visual
- ⌨️ Detector de teclado con estadísticas
- 🎮 **Proyecto completo**: Contador interactivo
  - Incrementar/Decrementar/Resetear
  - Atajos de teclado (↑↓ y R)
  - Cambio de color según valor

#### Sistema de Progreso:
- Función de saludo: **15%**
- Calcular área: **15%**
- Evento click: **15%**
- Evento teclado: **15%**
- Incrementar contador: **10%**
- Decrementar contador: **10%**
- Resetear contador: **10%**
- Usar todas las funciones: **10%**

---

## 💻 Características Técnicas

### **Sistema de Progreso Interactivo**
Cada tutorial incluye un sistema de tracking que:
- ✅ Rastrea las interacciones del usuario
- ✅ Actualiza la barra de progreso en tiempo real
- ✅ Calcula porcentaje de 0-100% proporcionalmente
- ✅ No duplica tareas completadas (usa `Set`)
- ✅ Persiste visualmente en barra sticky

### **Diseño Responsive**
- ✅ Optimizado para móviles (320px+), tablets y desktop
- ✅ Grids que se adaptan automáticamente
- ✅ Código con scroll horizontal en pantallas pequeñas
- ✅ Prevención de overflow en todos los contenedores
- ✅ Font-size adaptativo para mejor legibilidad
- ✅ Inputs con font-size 16px (previene zoom en iOS)

### **Accesibilidad**
- ✅ Estructura semántica HTML5
- ✅ Atributos ARIA donde corresponde
- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado funcional
- ✅ Mensajes de feedback claros

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript (ES6+)**: Lógica interactiva
- **TailwindCSS (CDN)**: Framework de utilidades CSS
- **Git**: Control de versiones

---

## 📱 Compatibilidad de Navegadores

| Navegador | Versión Mínima | Estado |
|-----------|----------------|--------|
| Chrome | 90+ | ✅ Totalmente compatible |
| Firefox | 88+ | ✅ Totalmente compatible |
| Safari | 14+ | ✅ Totalmente compatible |
| Edge | 90+ | ✅ Totalmente compatible |
| Opera | 76+ | ✅ Totalmente compatible |
| iOS Safari | 14+ | ✅ Totalmente compatible |
| Chrome Android | 90+ | ✅ Totalmente compatible |

---

## 🚀 Cómo Usar

### **Opción 1: Desarrollo Local**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/javascript-course.git

# Navegar al proyecto
cd javascript-course

# Abrir cualquier tutorial en tu navegador
# Por ejemplo:
cd fundamentos
# Abrir index.html en tu navegador favorito
```

### **Opción 2: GitHub Pages (Recomendado)**

1. Hacer fork del repositorio
2. Ir a Settings → Pages
3. Seleccionar branch `main` y carpeta `/root`
4. Guardar y esperar el despliegue
5. Acceder a: `https://tu-usuario.github.io/javascript-course/`

### **Navegación entre Tutoriales**

Cada tutorial es independiente y puede accederse directamente:
- **Fundamentos**: `https://tu-usuario.github.io/javascript-course/fundamentos/`
- **DOM**: `https://tu-usuario.github.io/javascript-course/dom/`
- **Eventos y Funciones**: `https://tu-usuario.github.io/javascript-course/eventos-funciones/`

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Tutoriales** | 3 |
| **Ejemplos interactivos** | 20+ |
| **Líneas de código** | ~2,500 |
| **Tareas de progreso** | 19 |
| **Archivos CSS** | 4 (1 compartido + 3 específicos) |
| **Archivos JavaScript** | 3 |
| **Reducción de CSS** | ~37% gracias a shared-styles.css |

---

## 🤝 Contribuciones

¿Quieres mejorar los tutoriales? ¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usar, modificar y distribuir.

---

## 👨‍💻 Autor

Creado con ❤️ para ayudar a estudiantes a aprender JavaScript de forma interactiva.

---

**¡Disfruta aprendiendo JavaScript!** 🎉

Si encuentras útil este proyecto, considera darle una ⭐ en GitHub.
