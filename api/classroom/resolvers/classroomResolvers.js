const { GraphQLScalarType } = require('graphql')

const classroomResolvers = {
  DateTime: new GraphQLScalarType({
      name: 'DateTime',
      description: 'string no formato ISO-8601',
      serialize: (value) => new Date(value).toISOString(),
      parseValue: (value) => new Date(value),
      parseLiteral: (ast) => new Date(ast.value).toISOString()
  }),

  Query: {
    classes: (_, __, { dataSources }) => dataSources.classroomAPI.getClasses(),
    classroom: (_, { id }, { dataSources }) => dataSources.classroomAPI.getClassroom(id)
  },

  Mutation: {
      incluiTurma: (_,{classroom}, {dataSources}) => dataSources.classroomAPI.incluiTurma(classroom),
      atualizaTurma: (_, classroom, {dataSources}) => dataSources.classroomAPI.atualizaTurma(novosDados),
      deletaTurma: (_, { id }, { dataSources }) => dataSources.classroomAPI.deletaTurma(id),
  },

    Classroom: {
        matriculas: (parent, _, {dataSources}) => dataSources.matriculasAPI.getMatriculasPorClassroom(parent.id),
        docente: (parent, _, {dataSources}) => dataSources.usersAPI.getUserById(parent.docente_id)
    }
}

module.exports = classroomResolvers
