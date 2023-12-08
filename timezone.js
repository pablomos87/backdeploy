const moment = require('moment-timezone');

const formatCoursesToBuenosAiresTimezone = (courses) => {
    return courses.map((course) => ({
      ...course._doc,
      fechaInclusion: moment(course.fechaInclusion).tz('America/Argentina/Buenos_Aires').format(), 
      fechaInscripcion: moment(course.fechaInscripcion).tz('America/Argentina/Buenos_Aires').format(), 
    }));
  };

  const formatUsersToBuenosAiresTimezone = (courses) => {
    return users.map((users) => ({
      ...users._doc,
      
      fechaInclusion: moment(users.fechaInclusion).tz('America/Argentina/Buenos_Aires').format(), 
    }));
  };

module.exports = {formatCoursesToBuenosAiresTimezone, formatUsersToBuenosAiresTimezone }