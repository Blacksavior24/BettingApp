# 🏟 Sports Betting App (Prueba Técnica)

Aplicación web de apuestas deportivas creada como **prueba técnica**.  
Permite a los usuarios autenticarse, ver eventos deportivos, realizar apuestas y consultar su historial.


## 📌 Descripción Técnica General

- **Frontend:** Next.js (modo desarrollo con hot reload)
- **Backend:** NestJS + Prisma ORM
- **Base de Datos:** PostgreSQL
- **Contenerización:** Docker + Docker Compose
- **Lenguaje:** TypeScript en frontend y backend
- **Migraciones:** Prisma Migrate
- **Hot Reload:** Configurado en frontend y backend
- **Volumen Persistente:** `postgres_data/` para mantener datos de la BD en local

---

## 🚀 Cómo levantar el proyecto

> **Requisitos previos**
> - Tener instalado **Docker** y **Docker Compose**
> - Puerto `3000` libre (frontend)
> - Puerto `3001` libre (backend)
> - Puerto `5432` libre (PostgreSQL)

### 1️ Clonar el repositorio
```bash
git clone https://github.com/Blacksavior24/BettingApp.git
cd BettingApp
```

### 2️ Levantar los servicios con Docker
```bash
docker compose up --build -d
```

Este comando:
- Construye las imagenes del frontend, backend y base de datos.
- Levanta todos los servicios en segundo plano.
- Crea un volumen persistente para la base de datos (`postgres_data`).

### 3 Verificar que todo este corriendo
```bash
docker ps
```
Debes ver los contenedores:
- `sports_frontend`
- `sports_backend`
- `sports_db`
---

## Usuarios Demo  

Recuerda ingresar al frontend en "http://localhost:3000/"
Puedes iniciar sesión con las siguientes credenciales:  

| Usuario      | Contraseña |  
|--------------|------------|  
| `demo`       | `123456`   |  
| `usuario123` | `wardev`   |  



## API REST
La API esta disponible en:
```
http://localhost:3001/api/v1
```
### Endpoints principales
> Todos los endpoints CRUD estan disponibles para los recursos listados.
#### Apuestas
- `GET /bet` - Obtener todas las apuestas  
- `POST /bet` - Crear una nueva apuesta  
- `GET /bet/:id` - Obtener una apuesta específica  
- `PUT /bet/:id` - Actualizar una apuesta  
- `DELETE /bet/:id` - Eliminar una apuesta  

#### Eventos deportivos
- `GET /sport-event` - Obtener todos los eventos  
- `POST /sport-event` - Crear un nuevo evento  
- `GET /sport-event/:id` - Obtener un evento específico  
- `PUT /sport-event/:id` - Actualizar un evento  
- `DELETE /sport-event/:id` - Eliminar un evento  

#### Usuarios
- `GET /user` - Obtener todos los usuarios  
- `POST /user` - Crear un nuevo usuario  
- `GET /user/:id` - Obtener un usuario específico  
- `PUT /user/:id` - Actualizar un usuario  
- `DELETE /user/:id` - Eliminar un usuario  

#### Autenticación
- `POST /user/login` - Iniciar sesión  

## Migraciones con Prisma
### Modificar el esquema
1. Editar el archivo:
 ```
 backend/prisma/schema.prisma
 ```
> Nota: Para aplicar cambios estructurales a la base de datos, usar:
```bash
docker compose exec backend npx prisma migrate dev --name nombre_migracion
```

### Generar cliente Prisma (fuera de Docker)
```bash
cd backend
npx prisma generate
```
### Generar cliente Prisma (dentro de Docker)
```bash
docker compose exec backend npx prisma generate
```
---

## Comandos utiles con Docker
### Reiniciar todos los servicios
```bash
docker compose restart
```
### Reiniciar un servicio especifico
```bash
docker compose restart backend
docker compose restart frontend
docker compose restart db
```
### Ver logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```
### Detener todos los servicios
```bash
docker compose down
```
### Detener y eliminar volumenes (reset de la BD)
```bash
docker compose down -v
```
---
Tip: Al usar `docker compose exec backend` puedes correr cualquier comando dentro del
contenedor de NestJS, lo mismo aplica para `frontend` o `db`.