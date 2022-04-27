const { DataSource } = require('apollo-datasource');
const db = [
  {
    id: 1,
    description: "básico",
    period: "manhã"
  },
  {
    id: 2,
    description: "intermediário",
    period: "tarde"
  }
]
class ClassroomAPI extends DataSource {
  constructor() {
    super();
    this.db = db
  }
  async getClasses() {
    return this.db
  }
  async getClassroom(id){
    return this.db.find(classroom => classroom.id === Number(id))
  }
}

module.exports = ClassroomAPI