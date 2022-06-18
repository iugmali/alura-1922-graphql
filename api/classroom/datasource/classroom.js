const { SQLDataSource } = require('datasource-sql');

class ClassroomAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
    this.Response = {
      message: ""
    }
  }

  async getClasses() {
    return this.db.select('*').from('classes')
  }

  async getClassroom(id) {
    const classroom = await this.db
      .select('*')
      .from('classes')
      .where({ id: Number(id)});
    return classroom[0];
  }

  async incluiTurma(novaTurma) {
    const novaTurmaId = await this.db
        .insert(novaTurma)
        .returning('id')
        .into('classes')
    const turmaInserida = await this.getClassroom(novaTurmaId[0])
    return ({ ...turmaInserida })
  }

  async atualizaTurma(novosDados) {
    await this.db
        .update({ ...novosDados.classroom })
        .where({ id: Number(novosDados.id) })
        .into('classes')
    const turmaAtualizada = await this.getClassroom(novosDados.id)
    return ({
      ...turmaAtualizada
    })
  }

  async deletaTurma(id) {
    await this.db('classes')
        .where({ id: id })
        .del()
    this.Response.message = "registro deletado"
    return this.Response
  }
}

module.exports = ClassroomAPI