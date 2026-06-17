# roomies-time
app web de reserva de espacios compartidos en un piso
# 🏠 RoomiesTime

RoomiesTime es una aplicación web diseñada para mejorar la convivencia en pisos compartidos mediante la gestión y reserva de espacios comunes.

La aplicación permite organizar el uso de espacios como cocinas, baños, lavadoras, terrazas y otras áreas compartidas, evitando conflictos entre compañeros de piso gracias a un sistema de reservas, notificaciones y control de horarios.

---

# ✨ Problema que resuelve

En pisos compartidos es frecuente que existan conflictos relacionados con:

* Uso simultáneo de espacios comunes.
* Falta de organización de horarios.
* Reservas informales o inexistentes.
* Malentendidos entre compañeros.

RoomiesTime centraliza la administración de estos espacios mediante un sistema colaborativo de reservas y gestión de convivencia.

---

# 🚀 Funcionalidades principales

## 👤 Gestión de usuarios

* Registro de usuarios.
* Inicio de sesión.
* Recuperación de contraseña vía email.
* Invitaciones para unirse a un piso compartido.

---

## 🏢 Gestión de pisos compartidos

* Creación de pisos.
* Invitación de compañeros mediante enlace.
* Administración de participantes.

---

## 🛋️ Gestión de espacios comunes

Cada piso puede tener múltiples espacios:

* Cocina
* Baño
* Lavadora
* Terraza
* Sala de estar
* Otros

### Configuración de espacios

Cada espacio permite definir:

* Nombre del espacio.
* Tiempo máximo de reserva.
* Reservas compartidas o exclusivas.
* Horarios de descanso.
* Bloqueos de disponibilidad.

---

## 📅 Sistema de reservas

Los usuarios pueden:

* Reservar espacios.
* Reservar para otros compañeros.
* Seleccionar fecha y hora.
* Permitir compartir el espacio durante la reserva.
* Cancelar reservas.

### Validaciones del sistema

* Detecta conflictos de horarios.
* Impide reservas duplicadas.
* Advierte cuando se excede el tiempo máximo permitido.
* Permite reservas extensas bajo advertencia configurable.

---

# 🧩 Casos de uso

## 1. Registro de usuario

El usuario crea una cuenta en la plataforma.

---

## 2. Inicio de sesión

El usuario accede al sistema mediante email y contraseña.

---

## 3. Recuperación de contraseña

El usuario solicita un email para restablecer su contraseña.

---

## 4. Invitación a un piso

El usuario recibe un enlace de invitación para unirse a un piso compartido.

---

## 5. Creación de piso

El usuario crea un nuevo piso:

* Nombre del piso.
* Participantes.
* Generación de enlace de invitación.

---

## 6. Creación de espacios

El usuario configura nuevos espacios indicando:

* Nombre.
* Tiempo máximo de uso.
* Tipo de reserva (compartida o explusiva).
* Restricciones horarias.

---

## 7. Reserva de espacios

El usuario selecciona:

* Espacio.
* Persona que realizará la reserva.
* Fecha.
* Hora.

---

## 8. Exceso de tiempo permitido

El sistema detecta reservas superiores al límite permitido y muestra una advertencia.

---

## 9. Conflicto de reservas

El sistema impide reservas simultáneas del mismo espacio.

---

## 10. Cancelación de reservas

El usuario puede eliminar o cancelar una reserva existente.

---

# 🛠️ Tecnologías utilizadas

## Frontend

* React
* JavaScript / TypeScript
* HTML5
* CSS3

---

## Backend

* Node.js
* Express.js

---

## Base de datos

* PostgreSQL

---

## ORM

* Prisma ORM

---

## Control de versiones

* Git
* GitHub

---

# 🧱 Arquitectura del proyecto

```bash
roomies-time/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── hooks/
│
├── backend/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── prisma/
│   └── utils/
│
├── database/
│
├── docs/
│
└── README.md
```

# 🔐 Futuras funcionalidades

* Notificaciones en tiempo real.
* Calendario compartido.
* Estadísticas de uso de espacios.
* Integración con Google Calendar.
* Roles y permisos avanzados.
* Aplicación móvil.
* Sistema de puntuación de convivencia.

---

# ⚙️ Instalación del proyecto

## Clonar el repositorio

```bash
git clone https://github.com/madag7/roomies-time.git
```

---

## Backend

```bash
cd backend
npm install
```

### Configurar variables de entorno

Crear archivo `.env`

```env
DATABASE_URL=""
JWT_SECRET=""
EMAIL_USER=""
EMAIL_PASSWORD=""
```

### Ejecutar migraciones Prisma

```bash
npx prisma migrate dev
```

### Iniciar servidor

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm start
```

---

# 🧪 Posibles reglas de negocio

* Un espacio no puede tener reservas superpuestas.
* El tiempo máximo de reserva es configurable.
* Algunos espacios permiten uso compartido.
* Solo miembros del piso pueden reservar espacios.
* Los usuarios pueden reservar para otros miembros.

---

# 📌 Estado del proyecto

🚧 Proyecto en desarrollo.

Actualmente se encuentra en fase de diseño y arquitectura inicial.

---

# 🤝 Contribuciones

Las contribuciones son bienvenidas.

1. Fork del proyecto.
2. Crear una rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Commit:

   ```bash
   git commit -m "feat: nueva funcionalidad"
   ```
4. Push:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crear Pull Request.

---

# 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

# 👨‍💻 Autor

Desarrollado por el equipo de RoomiesTime.
