const { SQLDataSource } = require('datasource-sql');

class MatriculasAPI extends SQLDataSource {
    constructor(dbConfig) {
        super(dbConfig);
        this.Response = {
            message: ""
        }
    }
    async matricularEstudante(ids) {
        const novaMatricula = {
            estudante_id: ids.estudante,
            classroom_id: ids.classroom,
            status: "confirmado"
        }
        await this.db
            .insert(novaMatricula)
            .into('matriculas')
        this.Response.message = "matricula confirmada"
        return this.Response
    }

    async getMatriculasPorClassroom(idClassroom) {
        const matriculas = await this.db
            .select('*')
            .from('matriculas')
            .where({classroom_id: idClassroom})
        console.log(matriculas)
        return matriculas
    }

    getMatriculasPorEstudante = new DataLoader(async idsEstudantes => {
        const matriculas = await this.db
            .select('*')
            .from('matriculas')
            .whereIn('estudante_id', idsEstudantes)

        return idsEstudantes.map(id =>
            matriculas.filter(matricula =>
                matricula.estudante_id === id))
    })

    async deleteMatricula(idMatricula) {
        await this.db('matriculas')
            .where({id: Number(idMatricula)})
            .del()
        this.Response.message = "registro deletado"
        return this.Response
    }

    async cancelMatricula(idMatricula) {
        await this.db
            .update({status: "cancelado"})
            .where({id: Number(idMatricula)})
            .into('matriculas')
        this.Response.message = "matricula cancelada"
        return this.Response
    }
}

module.exports = MatriculasAPI;