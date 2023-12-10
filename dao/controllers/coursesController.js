const Course = require('../../dao/models/courses');

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

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getRandomCourses,
};
