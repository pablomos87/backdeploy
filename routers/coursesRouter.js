const express = require('express');
const {
  createCourse,
  getCourses,
  updateCourseById,
  getCourseById,
  deleteCourseById,
  getRandomCourses,
  getCourseCount,
  registerUserCourses,
  removeUserCoursesRegistration,
  searchCourses,
} = require('../dao/controllers/coursesController');
const authenticateAdminToken = require('../middleweres/tokenMiddlewere');
const authenticateToken = require('../middleweres/tokenMiddlewere');
const coursesRouter = express.Router();

coursesRouter.post('/newcourse', authenticateAdminToken, async (req, res) => {
  try {
    const {
      nombre,
      resumen,
      palabrasClave,
      precio,
      duracion,
      regularidad,
      certificacion,
      requisitos,
      inscriptos,
      imagen,
      descripcion,
      inicio,
    } = req.body;

    if (
      nombre &&
      precio &&
      resumen &&
      palabrasClave &&
      duracion &&
      regularidad &&
      certificacion &&
      requisitos &&
      inscriptos &&
      imagen &&
      descripcion &&
      inicio
    ) {
      await createCourse({
        nombre,
        resumen,
        precio,
        palabrasClave,
        inicio,
        requisitos,
        duracion,
        regularidad,
        certificacion,
        inscriptos,
        imagen,
        descripcion,
      });
      res.json({ message: 'Curso cargado exitosamente' });
    } else {
      res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
  } catch (error) {
    console.error('Error al cargar el curso:', error);
    res.status(500).json({ error: 'Error al cargar el curso' });
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

coursesRouter.get('/detail', async (req, res) => {
  const { courseId } = req.query;
  const course = await getCourseById(courseId);
  if (course) {
    res.status(200).json({ course });
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

coursesRouter.post('/edit',authenticateAdminToken, async (req, res) => {
  const {
    nombre,
    resumen,
    precio,
    duracion,
    palabrasClave,
    regularidad,
    requisitos,
    certificacion,
    inscriptos,
    imagen,
    descripcion,
    inicio,
    id,
  } = req.body;

  const updatedCourse = await updateCourseById(id, {
    nombre,
    resumen,
    precio,
    requisitos,
    palabrasClave,
    duracion,
    regularidad,
    certificacion,
    inscriptos,
    imagen,
    descripcion,
    inicio,
  });

  if (updatedCourse) {
    res.status(200).json({ message: `Curso con ID ${id} editado exitosamente`, course: updatedCourse });
  } else {
    res.status(404).json({ error: `No se pudo encontrar el curso con ID ${id}` });
  }
});

coursesRouter.delete('/delete', async (req, res) => {
  const { courseId } = req.body;
  await deleteCourseById(courseId);
  res.json({ message: `Curso con ID ${courseId} eliminado exitosamente` });
});

coursesRouter.delete('/delete', authenticateAdminToken, async (req, res) => {
  const { courseId } = req.body;
  await deleteCourseById(courseId);
  res.json({ message: `Curso con ID ${courseId} eliminado exitosamente` });
});

coursesRouter.get('/count', authenticateAdminToken, getCourseCount);

coursesRouter.post(
  '/inscripcion/:userId/:courseId',
  authenticateToken,
  registerUserCourses
);

coursesRouter.delete(
  '/inscripcion/:userId/:courseId',
  authenticateAdminToken,
  removeUserCoursesRegistration
);

coursesRouter.get('/random', async (req, res) => {
  try {
    const randomCourses = await getRandomCourses();
    res.status(200).json({ randomCourses });
  } catch (error) {
    console.error('Error al obtener cursos aleatorios:', error);
    res.status(500).json({ error: 'Error al obtener cursos aleatorios' });
  }
});

coursesRouter.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ error: 'La consulta de búsqueda está vacía' });
    }

    await searchCourses(req, res);
  } catch (error) {
    console.error('Error al buscar cursos:', error);
    res.status(500).json({ error: 'Error al buscar cursos' });
  }
});

module.exports = coursesRouter;
