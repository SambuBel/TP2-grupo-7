# TP2 Final — API RESTful con Node.js, Express y Sequelize

API RESTful para gestión de usuarios, libros y opiniones. Los usuarios pueden registrarse, autenticarse y dejar opiniones sobre libros.

## Tecnologías

- Node.js + Express
- Sequelize + MySQL
- bcrypt (hash de passwords)
- JSON Web Token (autenticación)
- cookie-parser, morgan

---

## Instalación y configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`:

```env
SERVER_PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tp_user
DB_PASSWORD=tp1234
DB_NAME=tp_final_grupo_7
DB_DIALECT=mysql
SECRET=clave_secreta_larga_y_segura
```

### 3. Crear la base de datos en MySQL

```sql
CREATE DATABASE tp_final_grupo_7;
```

### 4. Iniciar el servidor

```bash
# Producción
npm start

# Desarrollo (reinicia automáticamente al guardar)
npm run dev
```

El servidor estará disponible en `http://localhost:3001`.

---

## Arquitectura

El proyecto sigue el patrón **MVC** con inyección de dependencias:

```
Routes → Controller → Service → Model → Base de datos
```

Cada entidad tiene su propio archivo en cada capa. El `container` es el punto de ensamblado que instancia las clases y les inyecta sus dependencias.

```
├── Models/          # Definición de tablas y asociaciones (Sequelize)
├── services/        # Lógica de negocio
├── controllers/     # Manejo de requests y responses HTTP
├── containers/      # Inyección de dependencias
├── routes/          # Definición de endpoints
├── middleware/      # autenticar.js, notFound.js
├── utils/           # jwt.js
└── config/          # Variables de entorno
```

### Relaciones entre modelos

```
Usuario ──< Opinion >── Libro
```

- Un **Usuario** puede tener muchas **Opiniones**
- Un **Libro** puede tener muchas **Opiniones**
- Una **Opinion** pertenece a un Usuario y a un Libro

---

## Autenticación

Las rutas protegidas requieren estar autenticado. Al hacer login el servidor devuelve un **JWT** guardado en una cookie `httpOnly`. Las siguientes requests envían esa cookie automáticamente.

Para probar con curl usar el flag `-c cookies.txt` al hacer login y `-b cookies.txt` en los requests protegidos.

---

## Endpoints

### Usuarios — `/api/usuarios`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/usuarios` | No | Registrar nuevo usuario |
| POST | `/api/usuarios/login` | No | Iniciar sesión |
| POST | `/api/usuarios/logout` | Sí | Cerrar sesión |
| GET | `/api/usuarios/me` | Sí | Ver perfil del usuario autenticado |
| GET | `/api/usuarios` | Sí | Listar todos los usuarios |
| GET | `/api/usuarios/:id` | Sí | Obtener usuario por ID |
| GET | `/api/usuarios/:id/opiniones` | Sí | Ver todas las opiniones de un usuario |
| PUT | `/api/usuarios/:id` | Sí | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Sí | Eliminar usuario |

#### Ejemplos

```bash
# Registrar usuario
curl -X POST http://localhost:3001/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Lucas","email":"lucas@mail.com","password":"1234"}'

# Login
curl -X POST http://localhost:3001/api/usuarios/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"lucas@mail.com","password":"1234"}'

# Ver perfil
curl http://localhost:3001/api/usuarios/me -b cookies.txt

# Ver opiniones de un usuario
curl http://localhost:3001/api/usuarios/1/opiniones -b cookies.txt
```

---

### Libros — `/api/libros`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/libros` | No | Listar todos los libros |
| GET | `/api/libros/:id` | No | Obtener libro con sus opiniones |
| POST | `/api/libros` | Sí | Crear libro |
| PUT | `/api/libros/:id` | Sí | Actualizar libro |
| DELETE | `/api/libros/:id` | Sí | Eliminar libro |

#### Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `titulo` | String | Sí | Título del libro |
| `autor` | String | Sí | Nombre del autor |
| `genero` | String | No | Género literario |
| `anio` | Integer | No | Año de publicación |

#### Ejemplos

```bash
# Listar libros (público)
curl http://localhost:3001/api/libros

# Crear libro
curl -X POST http://localhost:3001/api/libros \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"titulo":"Cien años de soledad","autor":"Gabriel García Márquez","genero":"Realismo mágico","anio":1967}'

# Ver libro con sus opiniones
curl http://localhost:3001/api/libros/1
```

---

### Opiniones — `/api/opiniones`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/opiniones` | No | Listar todas las opiniones |
| GET | `/api/opiniones/:id` | No | Obtener opinión por ID |
| POST | `/api/opiniones` | Sí | Crear opinión (usuarioId sale del token) |
| PUT | `/api/opiniones/:id` | Sí | Actualizar opinión |
| DELETE | `/api/opiniones/:id` | Sí | Eliminar opinión |

#### Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `texto` | Text | Sí | Contenido de la opinión |
| `puntuacion` | Integer | Sí | Puntuación del 1 al 5 |
| `libroId` | Integer | Sí | ID del libro a opinar |

#### Ejemplos

```bash
# Crear opinión (requiere login)
curl -X POST http://localhost:3001/api/opiniones \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"texto":"Una obra maestra, imposible de soltar.","puntuacion":5,"libroId":1}'

# Listar todas las opiniones (público)
curl http://localhost:3001/api/opiniones

# Actualizar opinión
curl -X PUT http://localhost:3001/api/opiniones/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"puntuacion":4}'
```

---

## Manejo de errores

Todas las respuestas siguen el mismo formato:

```json
// Éxito
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "descripción del error" }
```

Las rutas inexistentes devuelven `404 Not found` a través del middleware `notFound.js`.
