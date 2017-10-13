/*eslint-disable */
app.get('/api/v1/schools', (request, response) => {
  let ratioMin = request.query.ratioMin;
  let ratioMax = request.query.ratioMax;

  const checkQuery = () => {
    if (ratioMin && ratioMax) {
      return database('schools').where('student_teacher_ratio', '>=', ratioMin).where('student_teacher_ratio', '<=', ratioMax).select();
    }
    if (ratioMin && !ratioMax) {
      return database('schools').where('student_teacher_ratio', '>=', ratioMin).select();
    }
    if (!ratioMin && ratioMax) {
      return database('schools').where('student_teacher_ratio', '<=', ratioMax).select();
    }
    if (!ratioMin && !ratioMax) {
      return database('schools').select();
    }
  };

  checkQuery()
    .then((schools) => {
      return response.status(200).json(schools);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});
