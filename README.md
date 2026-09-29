# GestionBea 🚀

Aplicación web integral, moderna y responsive para la gestión de tareas, bloc de notas, control de vacaciones de equipo y asistente inteligente con IA (Gemini).

---

## ✨ Características y Módulos

### 1. 📊 Panel de Control (Dashboard)
- Métricas en tiempo real: Tareas totales, pendientes, completadas, notas guardadas y días de vacaciones globales del equipo.
- Acceso directo a tareas urgentes o con fecha de vencimiento próxima.
- Vista previa de las notas más recientes y widget de balance de vacaciones.

### 2. 📋 Gestión Avanzada de Tareas
- Creación, edición y eliminación de tareas.
- **Fechas límite (Due Dates)** con aviso visual inteligente (`Vencida`, `Vence hoy`, `Próxima`).
- Filtrado dinámico por estado (Todas, Pendientes, Completadas), prioridad (Alta 🔴, Media 🟡, Baja 🟢) y categorías.
- Búsqueda en vivo instantánea.

### 3. 📝 Bloc de Notas & Ideas
- Notas con personalización de colores suaves y temas adaptativos.
- Edición rápida y eliminación segura.
- Resúmenes inteligentes impulsados por IA.

### 4. 🏖️ Gestión de Vacaciones & Equipo
- Balance individual de días disfrutados y disponibles con barras de progreso dinámicas.
- Registro rápido de días de vacaciones con motivo y descuento automático.
- Gestión de miembros del equipo (alta, edición y eliminación).
- Métricas consolidadas del equipo.

### 5. ✨ Asistente Inteligente con IA (Gemini)
- Asistente integrado con acceso contextual a las tareas, notas y balance de vacaciones.
- Acciones rápidas con un clic:
  - 📅 **Planificar mi día**: Plan de acción optimizado.
  - ⚡ **Priorizar tareas**: Matriz de Eisenhower automática.
  - 📊 **Resumen global**: Estado ejecutivo de todo el espacio de trabajo.
  - 🏖️ **Balance de equipo**: Recomendaciones de cobertura laboral.
- Chat interactivo libre para cualquier consulta o redacción.

### 6. 🌓 Modo Oscuro / Modo Claro
- Selector visual de tema con guardado de preferencia automático en `localStorage`.

### 7. 💾 Copias de Seguridad & Portabilidad
- **Exportar datos**: Descarga de archivo JSON completo con todas las tareas, notas y vacaciones.
- **Importar datos**: Carga y restauración rápida desde cualquier archivo de respaldo JSON.
- **Notificaciones Toast**: Alertas emergentes elegantes para cada acción.

---

## 🛠️ Tecnologías

- **HTML5 semántico** con accesibilidad.
- **CSS3 moderno**: Variables CSS, soporte para Dark Mode, animaciones fluidas y CSS Grid/Flexbox responsive.
- **JavaScript ES6+**: Arquitectura orientada a objetos, sin dependencias pesadas y con persistencia en `localStorage`.
- **Google Gemini API**: Integración REST para capacidades de IA generativa.

---

## 🚀 Cómo ejecutarlo localmente

1. Abre el archivo `index.html` directamente en tu navegador web favorito (Chrome, Safari, Firefox, Edge).
2. O utiliza una extensión como *Live Server* en tu editor para recarga automática en tiempo real.

---

## 📦 Estructura del Proyecto

```
GestionBea/
├── index.html        # Estructura principal y modales
├── css/
│   └── styles.css    # Estilos modernos y modo oscuro
├── js/
│   └── app.js        # Lógica central, módulos y llamadas IA
├── config/
│   └── env.json      # Configuración de entorno y claves API
├── data/
│   └── vacations.json# Datos iniciales de vacaciones
└── README.md         # Documentación detallada
```
