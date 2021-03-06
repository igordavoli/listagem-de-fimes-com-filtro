const { moviesRepository } = require("../../repositories");

module.exports.getById = async (id) => {
  const query = {};


  query.where = { id };
  query.include = [
    {
      association: 'actors',
      attributes: ['name'],
      through: { attributes: [] }
    },
    {
      association: 'directors',
      attributes: ['name'],
      through: { attributes: [] }
    },
    {
      association: 'grades',
      attributes: ['grade'],
    },
  ]

  const movie = await moviesRepository.get(query);

  const gradesSum = movie.grades.reduce((sum, grade) => sum + grade.grade, 0);

  const averegeGrade = (gradesSum / movie.grades.length).toFixed(1);

  console.log(movie.grades)

  movieDetails = {
    title: movie.title,
    gender: movie.gender,
    synopsis: movie.synopsis,
    directors: movie.directors,
    actors: movie.actors,
    averegeGrade,
  }

  return movieDetails;
};
