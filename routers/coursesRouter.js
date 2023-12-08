const express = require('express');
const { createCourse, getCourses, updateCourseById, getCourseById, deleteCourseById, getRandomCourses } = require('../dao/controllers/coursesController')
const Courses = require('../dao/models/courses');
const {findUserById} = require ('../dao/controllers/userController');


const coursesRouter = express.Router();

coursesRouter.post('/newcourse', async (req, res) => {
  const {nombre, resumen, precio, duracion, regularidad, certificacion, requisitos, inscriptos, imagen, descripcion, inicio} = req.body
  if(nombre &&  precio &&  resumen &&  duracion &&  regularidad && certificacion && requisitos &&  inscriptos &&  imagen && descripcion && inicio){
      const result = await createCourse({nombre, resumen, precio, inicio, requisitos, duracion, regularidad, certificacion, inscriptos, imagen,descripcion})
      if(result){
        res.json({ message: 'Curso cargado exitosamente' });
          console.log('Curso cargado')
      }
      else{
          res.json('error')
          console.log('Error al cargar el curso')
      }
  }
});


coursesRouter.get('/', async (req, res) => {
  try {
    const courses = await getCourses();
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error al obtener la lista de cursos:', error);
    res.status(500).json({ error: 'Error al obtener la lista de cursos' });
  }
});


coursesRouter.get('/detail', async (req, res) =>{
  const {courseId} = req.query 
  console.log('ID del curso recibido:', courseId); 
  const course =  await getCourseById(courseId)
  console.log('Curso encontrado:', course);
   if(course){
    res.status(200).json({course})
  }

  else{
      res.status(404).json({error: 'Course not found'})
  }
});

coursesRouter.post('/edit', async (req, res) =>{
  const {nombre , resumen ,precio, duracion, regularidad, requisitos, certificacion, inscriptos, imagen, descripcion, inicio, id} = req.body

  const updatedCourse = await updateCourseById (id, {nombre, resumen ,precio, requisitos, duracion, regularidad, certificacion, inscriptos, imagen, descripcion, inicio})

  res.status(200).json({message: `Curso con ID ${id} editado exitosamente`})
})

coursesRouter.delete('/delete', async (req, res) => {
  const {courseId} = req.body;
  await deleteCourseById(courseId)
  res.json({ message: `Curso con ID ${courseId} eliminado exitosamente` });
});


coursesRouter.get('/count', async (req, res) => {
  try {
    const count = await Courses.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error al obtener el contador de cursos:', err);
    res.status(500).json({ error: 'Error al obtener el contador de usuarios' });
  }
});

coursesRouter.post('/inscripcion/:userId/:courseId', async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    console.log('ID de usuario recibido:', userId);
    console.log('ID de curso recibido:', courseId);

    const user = await findUserById (userId);
    const course = await getCourseById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'Datos de usuario o curso no válidos' });
    }

    if (!course.students || !course.students.some(student => student.equals(userId))) {
      course.fechaInscripcion = new Date();
      course.students = course.students || [];
      course.students.push(userId);
      user.registeredCourses.push(courseId);

      await course.save();
      await user.save();

    

      return res.status(200).json({ message: 'Usuario inscrito correctamente en el curso' });
    } else {
      return res.status(400).json({ message: 'El usuario ya está inscrito en este curso' });
    }
  } catch (error) {
    console.error('Error al inscribir usuario en el curso:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

coursesRouter.delete('/inscripcion/:userId/:courseId', async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    console.log('ID de usuario recibido:', userId);
    console.log('ID de curso recibido:', courseId);

    const user = await findUserById(userId);
    const course = await getCourseById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'Datos de usuario o curso no válidos' });
    }

    if (course.students && course.students.includes(userId)) {
      
      course.students = course.students.filter(student => !student.equals(userId));
      user.registeredCourses = user.registeredCourses.filter(course => !course.equals(courseId));

      await course.save();
      await user.save();

      return res.status(200).json({ message: 'Usuario eliminado correctamente del curso' });
    } else {
      return res.status(400).json({ message: 'El usuario no está inscrito en este curso' });
    }
  } catch (error) {
    console.error('Error al eliminar la inscripción del usuario en el curso:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

coursesRouter.get('/random', async (req, res) => {
  try {
    const randomCourses = await getRandomCourses();
    res.status(200).json({ randomCourses });
  } catch (error) {
    console.error('Error al obtener cursos aleatorios:', error);
    res.status(500).json({ error: 'Error al obtener cursos aleatorios' });
  }
});

module.exports = coursesRouter;