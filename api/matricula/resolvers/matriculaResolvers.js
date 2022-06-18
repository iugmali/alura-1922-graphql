const {GraphQLScalarType} = require("graphql");

const matriculaResolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string no formato ISO-8601',
        serialize: (value) => new Date(value).toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value).toISOString()
    }),
    Mutation: {
        matricularEstudante: (_,ids,{dataSources}) => dataSources.matriculasAPI.matricularEstudante(ids),
        deleteMatricula: (_, {matricula}, {dataSources}) => dataSources.matriculasAPI.deleteMatricula(matricula),
        cancelMatricula: (_, {matricula}, {dataSources}) => dataSources.matriculasAPI.cancelMatricula(matricula)
    },
    Matricula: {
        estudante: (parent, _, {dataSources}) => dataSources.usersAPI.getUserById(parent.estudante_id),
        classroom: (parent, _, {dataSources}) => dataSources.classroomAPI.getClassroom(parent.classroom_id)
    }
}

module.exports = matriculaResolvers