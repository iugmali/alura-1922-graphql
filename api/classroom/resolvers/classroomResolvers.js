const { GraphQLScalarType } = require('graphql')

const classroomResolvers = {
  Query: {
    classes: (_, __, { dataSources }) => dataSources.classroomAPI.getClasses(),
    classroom: (_, { id }, { dataSources }) => dataSources.classroomAPI.getClassroom(id)
  }
}

module.exports = classroomResolvers
