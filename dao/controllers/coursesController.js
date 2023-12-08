const Course = require("../models/courses");

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
    return await Course.find().select('nombre resumen'); 
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    throw new Error('Error al obtener cursos');
  }
};

const getCourseById = async (courseId) => {
  return await Course.findById(courseId);
};

const updateCourseById = async (id, { nombre, resumen, requisitos, precio, duracion, regularidad, certificacion, inscriptos, imagen, descripcion, inicio }) => {
  return await Course.findByIdAndUpdate(id, { nombre, resumen, requisitos, precio, duracion, regularidad, certificacion, inscriptos, imagen, descripcion, inicio }, { new: true });
};

const deleteCourseById = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};

const getRandomCourses = async () => {
  return await Course.aggregate([{ $sample: { size: 3 } }]).select('nombre resumen');
};

module.exports = { createCourse, getCourses, getCourseById, updateCourseById, deleteCourseById, getRandomCourses };

