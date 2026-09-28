// GestionBea - Lógica de la aplicación

const STORAGE_KEYS = {
  TASKS: 'gestionbea_tasks',
  NOTES: 'gestionbea_notes'
};

// Datos de ejemplo iniciales
const INITIAL_TASKS = [
  { id: '1', title: 'Configurar entorno y sincronizar con GitHub', priority: 'high', category: 'Proyecto', completed: true, createdAt: new Date().toISOString() },
  { id: '2', title: 'Diseñar la estructura del panel de gestión', priority: 'high', category: 'Diseño', completed: true, createdAt: new Date().toISOString() },
  { id: '3', title: 'Añadir nuevas tareas y objetivos del mes', priority: 'medium', category: 'Organización', completed: false, createdAt: new Date().toISOString() }
];

const INITIAL_NOTES = [
  { id: '1', title: '¡Bienvenida a GestionBea!', content: 'Esta aplicación te ayuda a mantener el control de tus tareas y notas directamente en tu navegador con guardado automático.', color: 'purple', createdAt: new Date().toLocaleDateString('es-ES') },
  { id: '2', title: 'Recordatorio GitHub', content: 'Recuerda hacer commits periódicos para mantener tus cambios a salvo en la nube.', color: 'blue', createdAt: new Date().toLocaleDateString('es-ES') }
];

class GestionBeaApp {
  constructor() {
    this.tasks = this.loadData(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    this.notes = this.loadData(STORAGE_KEYS.NOTES, INITIAL_NOTES);
    this.currentFilter = 'all';
    this.priorityFilter = 'all';
    this.searchQuery = '';

    this.initElements();
    this.initEventListeners();
    this.render();
  }

  loadData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error('Error cargando datos de localStorage', e);
      return fallback;
    }
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error guardando en localStorage', e);
    }
  }

  initElements() {
    // Vistas y navegación
    this.navButtons = document.querySelectorAll('.nav-item');
    this.views = document.querySelectorAll('.view');

    // Stats
    this.statTotalTasks = document.getElementById('statTotalTasks');
    this.statPendingTasks = document.getElementById('statPendingTasks');
    this.statCompletedTasks = document.getElementById('statCompletedTasks');
    this.statTotalNotes = document.getElementById('statTotalNotes');

    // Listas
    this.priorityTaskList = document.getElementById('priorityTaskList');
    this.recentNotesList = document.getElementById('recentNotesList');
    this.allTasksList = document.getElementById('allTasksList');
    this.allNotesGrid = document.getElementById('allNotesGrid');

    // Modales
    this.taskModal = document.getElementById('taskModal');
    this.noteModal = document.getElementById('noteModal');
    this.taskForm = document.getElementById('taskForm');
    this.noteForm = document.getElementById('noteForm');

    // Filtros
    this.filterChips = document.querySelectorAll('.filter-chip');
    this.prioritySelect = document.getElementById('priorityFilter');
    this.searchInput = document.getElementById('searchInput');

    // Botones
    this.openTaskModalBtn = document.getElementById('openTaskModalBtn');
    this.closeTaskModal = document.getElementById('closeTaskModal');
    this.cancelTaskModal = document.getElementById('cancelTaskModal');
    this.openNoteModalBtn = document.getElementById('openNoteModalBtn');
    this.closeNoteModal = document.getElementById('closeNoteModal');
    this.cancelNoteModal = document.getElementById('cancelNoteModal');
    this.exportBtn = document.getElementById('exportBtn');
  }

  initEventListeners() {
    // Navegación
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    // Modales
    this.openTaskModalBtn.addEventListener('click', () => this.toggleModal(this.taskModal, true));
    this.closeTaskModal.addEventListener('click', () => this.toggleModal(this.taskModal, false));
    this.cancelTaskModal.addEventListener('click', () => this.toggleModal(this.taskModal, false));

    this.openNoteModalBtn.addEventListener('click', () => this.toggleModal(this.noteModal, true));
    this.closeNoteModal.addEventListener('click', () => this.toggleModal(this.noteModal, false));
    this.cancelNoteModal.addEventListener('click', () => this.toggleModal(this.noteModal, false));

    // Formularios
    this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
    this.noteForm.addEventListener('submit', (e) => this.handleAddNote(e));

    // Filtros
    this.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentFilter = chip.dataset.filter;
        this.renderTasks();
      });
    });

    this.prioritySelect.addEventListener('change', (e) => {
      this.priorityFilter = e.target.value;
      this.renderTasks();
    });

    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    });

    // Exportar
    this.exportBtn.addEventListener('click', () => this.exportBackup());
  }

  switchTab(tabName) {
    this.navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    this.views.forEach(view => {
      view.classList.toggle('active', view.id === `${tabName}View`);
    });
  }

  toggleModal(modal, show) {
    modal.classList.toggle('open', show);
    if (!show) {
      if (modal === this.taskModal) this.taskForm.reset();
      if (modal === this.noteModal) this.noteForm.reset();
    }
  }

  handleAddTask(e) {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const category = document.getElementById('taskCategory').value.trim() || 'General';

    if (!title) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.unshift(newTask);
    this.saveData(STORAGE_KEYS.TASKS, this.tasks);
    this.toggleModal(this.taskModal, false);
    this.render();
  }

  handleAddNote(e) {
    e.preventDefault();
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const color = document.getElementById('noteColor').value;

    if (!title || !content) return;

    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      color,
      createdAt: new Date().toLocaleDateString('es-ES')
    };

    this.notes.unshift(newNote);
    this.saveData(STORAGE_KEYS.NOTES, this.notes);
    this.toggleModal(this.noteModal, false);
    this.render();
  }

  toggleTaskComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveData(STORAGE_KEYS.TASKS, this.tasks);
      this.render();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveData(STORAGE_KEYS.TASKS, this.tasks);
    this.render();
  }

  deleteNote(id) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveData(STORAGE_KEYS.NOTES, this.notes);
    this.render();
  }

  exportBackup() {
    const backup = {
      tasks: this.tasks,
      notes: this.notes,
      exportDate: new Date().toISOString(),
      appName: 'GestionBea'
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gestionbea-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  render() {
    this.renderStats();
    this.renderDashboard();
    this.renderTasks();
    this.renderNotes();
  }

  renderStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    this.statTotalTasks.textContent = total;
    this.statCompletedTasks.textContent = completed;
    this.statPendingTasks.textContent = pending;
    this.statTotalNotes.textContent = this.notes.length;
  }

  renderDashboard() {
    // Tareas prioritarias pendientes
    const highPriority = this.tasks
      .filter(t => !t.completed && t.priority === 'high')
      .slice(0, 4);

    if (highPriority.length === 0) {
      this.priorityTaskList.innerHTML = '<li class="empty-state">🎉 ¡No hay tareas urgentes pendientes!</li>';
    } else {
      this.priorityTaskList.innerHTML = highPriority.map(t => this.createTaskHTML(t)).join('');
    }

    // Últimas notas
    const recentNotes = this.notes.slice(0, 3);
    if (recentNotes.length === 0) {
      this.recentNotesList.innerHTML = '<div class="empty-state">No hay notas guardadas aún.</div>';
    } else {
      this.recentNotesList.innerHTML = recentNotes.map(n => `
        <div class="note-card color-${n.color}" style="min-height: auto; padding: 0.85rem;">
          <h4 style="font-size: 0.95rem; font-weight: 600;">${this.escapeHTML(n.title)}</h4>
          <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.25rem;">${this.escapeHTML(n.content.slice(0, 80))}${n.content.length > 80 ? '...' : ''}</p>
        </div>
      `).join('');
    }
  }

  renderTasks() {
    let filtered = this.tasks.filter(t => {
      // Filtro de estado
      if (this.currentFilter === 'pending' && t.completed) return false;
      if (this.currentFilter === 'completed' && !t.completed) return false;

      // Filtro de prioridad
      if (this.priorityFilter !== 'all' && t.priority !== this.priorityFilter) return false;

      // Búsqueda
      if (this.searchQuery && !t.title.toLowerCase().includes(this.searchQuery) && !t.category.toLowerCase().includes(this.searchQuery)) {
        return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      this.allTasksList.innerHTML = '<li class="empty-state">No se encontraron tareas con estos filtros.</li>';
    } else {
      this.allTasksList.innerHTML = filtered.map(t => this.createTaskHTML(t)).join('');
    }
  }

  renderNotes() {
    let filtered = this.notes.filter(n => {
      if (!this.searchQuery) return true;
      return n.title.toLowerCase().includes(this.searchQuery) || n.content.toLowerCase().includes(this.searchQuery);
    });

    if (filtered.length === 0) {
      this.allNotesGrid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;">No se encontraron notas.</div>';
    } else {
      this.allNotesGrid.innerHTML = filtered.map(n => `
        <div class="note-card color-${n.color}">
          <div>
            <div class="note-card-header">
              <h3 class="note-title">${this.escapeHTML(n.title)}</h3>
              <button class="note-delete-btn" onclick="app.deleteNote('${n.id}')" title="Eliminar nota">&times;</button>
            </div>
            <p class="note-content">${this.escapeHTML(n.content)}</p>
          </div>
          <div class="note-date">Creado el ${n.createdAt}</div>
        </div>
      `).join('');
    }
  }

  createTaskHTML(task) {
    const priorityLabels = { high: 'Alta 🔴', medium: 'Media 🟡', low: 'Baja 🟢' };
    return `
      <li class="task-item ${task.completed ? 'completed' : ''}">
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="app.toggleTaskComplete('${task.id}')">
          <span class="task-title">${this.escapeHTML(task.title)}</span>
        </div>
        <div class="task-right">
          ${task.category ? `<span class="badge badge-cat">${this.escapeHTML(task.category)}</span>` : ''}
          <span class="badge badge-${task.priority}">${priorityLabels[task.priority] || task.priority}</span>
          <button class="task-delete-btn" onclick="app.deleteTask('${task.id}')" title="Eliminar tarea">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </li>
    `;
  }

  escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Inicialización global
const app = new GestionBeaApp();
