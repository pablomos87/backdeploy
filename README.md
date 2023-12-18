# Proyecto Final
### Plataforma de Cursos Online
#

¡Bienvenido/a al Proyecto Final!  Este proyecto consta de un backend desarrollado en Node.js, una base de datos MongoDB, y un frontend desarrollado en React.


#
### Autores 

##### Pablo Moscón

#

### Descripción del Proyecto

Sitio web para la publicación de cursos online y para el registro e inscripción a ellos.
Permite a los usuarios registrarse, acceder, buscar e inscribirse a cursos.
Les ofrece un perfil a los usuarios registrados para que puedan gestionar sus datos y actividad.
Los administradores pueden gestionar cursos, usuarios, inscripciones y administradores.

#


### Características

#### La aplicación cuenta con las siguientes funciones: 

La aplicación cuenta con las siguientes funciones: 
- Descubrir cursos online y acceder a sus características.
- Inscribirse a cursos online mediante un formulario.
- Servirse de un buscador que permite encontrar cursos a partir de palabras clave. 
- Registrarse en el sitio, completando un formulario, y acceder al perfil personal. 
- Ingresar al sitio como usuario, e ingresar al perfil del usuario. 
- Añadir, editar y eliminar cursos. 
- Eliminar usuarios. 
- Añadir y eliminar adminsitradores.

#

Base de Datos 

1. (MongoDB): Utilizada para almacenar datos relacionados con usuarios, cursos, inscripciones y administradores.

Backend (Node.js)

1. Express: Framework web de Node.js para crear API de forma rápida y sencilla.
3. Mongoose.
4. Bcrypt: Librería para el cifrado de contraseñas.
5. Jsonwebtoken: Implementación de JSON Web Tokens (JWT) para autenticación.
6. Cors:Middleware de Express para habilitar el intercambio de recursos de origen cruzado (CORS).
7. Dotenv:  Módulo para cargar variables de entorno desde un archivo .env.
8. Moment-timezone: Manejo de fechas y zonas horarias en Node.js.
9. Morgan: Middleware de logging para Express.
10. Path: Módulo para trabajar con rutas de archivos y directorios en Node.js.
11. MongoDB: Librería de modelado de datos para MongoDB.
12. Node.js: Entorno de ejecución para JavaScript del lado del servidor.



Frontend (React)

1. React: Biblioteca JavaScript para construir interfaces de usuario.
2. React Router Dom: Enrutamiento para aplicaciones de React, facilitando la navegación entre diferentes vistas.
3. Bootstrap: Framework CSS para el diseño y la maquetación de la interfaz de usuario.
4. FontAwesome: Conjunto de íconos vectoriales.
5. React Icons.
6. React Bootstrap: Implementación de componentes de Bootstrap como elementos de React.
7. Moment.js / Moment Timezone: Manipulación de fechas y zonas horarias en JavaScript.
8. React Icons: Biblioteca de íconos para aplicaciones de React.
9. Axios: Cliente HTTP basado en promesas para realizar solicitudes a un servidor.


#

### Instalación y uso

Para usar e instaar esta aplicación, podés hacer lo siguiente:

Backend

1. Clona este repositorio en tu máquina local utilizando el siguiente comando. 

git clone https://github.com/pablomos87/backdeploy

2. Configura las variables de entorno necesarias. Crea un archivo .env en la raíz del proyecto y proporciona los valores necesarios para las variables de entorno como PORT, MONGO_URI, SECRET_KEY, etc.

3.	 Ejecuta el comando npm start para iniciar el servidor en modo de producción. Para el desarrollo, utiliza npm run dev para iniciar el servidor con nodemon y así tener actualizaciones en tiempo real.	

El proyecto se iniciará en tu navegador en la dirección http://localhost:3000.


Frotend

1. Clona este repositorio en tu máquina local utilizando el siguiente comando. 

git clone https://github.com/pablomos87/frontdeploy

2.	Instala las dependencias usando el siguiente comando:

npm install

3.	Ejecuta la aplicación utilizando el siguiente comando:

npm install


#

También puedes acceder a la aplicación en línea en https://proyecto-final-app.vercel.app/home.







