const Course = require('../../dao/models/courses');
const { findUserById } = require('./userController');

const createCourse = async (course) => {
  try {
    const newCourse = new Course(course);
    newCourse.fechaInclusion = new Date();
    await newCourse.save();
    return true;
  } catch (error) {
    throw error;
  }
};

const getCourses = async () => {
  try {
    let courses = await Course.find();
    return courses;
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    throw new Error('Error al obtener cursos');
  }
};

const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);
  return course;
};

const updateCourseById = async (
  id,
  {
    nombre,
    resumen,
    palabrasClave,
    requisitos,
    precio,
    duracion,
    regularidad,
    certificacion,
    inscriptos,
    imagen,
    descripcion,
    inicio,
  }
) => {
  return await Course.findByIdAndUpdate(
    id,
    {
      nombre,
      resumen,
      palabrasClave,
      requisitos,
      precio,
      duracion,
      regularidad,
      certificacion,
      inscriptos,
      imagen,
      descripcion,
      inicio,
    },
    { new: true }
  );
};

const deleteCourseById = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};

const getRandomCourses = async () => {
  return await Course.aggregate([{ $sample: { size: 3 } }]);
};

const getCourseCount = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error al obtener el contador de cursos:', err);
    res.status(500).json({ error: 'Error al obtener el contador de usuarios' });
  }
};


const registerUserCourses = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const user = await findUserById(userId);
    const course = await getCourseById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'Datos de usuario o curso no válidos' });
    }

    if (!course.students || !course.students.some((student) => student.equals(userId))) {
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
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};


const removeUserCoursesRegistration = async (req, res) => {
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
      course.students = course.students.filter((student) => !student.equals(userId));
      user.registeredCourses = user.registeredCourses.filter((course) => !course.equals(courseId));

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
};

const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;

    const courses = await Course.find({
      $or: [
        { nombre: { $regex: query, $options: 'i' } }, 
        { palabrasClave: { $regex: query, $options: 'i' } }, 
      ],
    });

    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error al buscar cursos:', error);
    res.status(500).json({ error: 'Error al buscar cursos' });
  }
};
module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getRandomCourses,
  getCourseCount,
  registerUserCourses,
  removeUserCoursesRegistration,
  searchCourses 
};
