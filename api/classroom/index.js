const classroomSchema = require('./schema/classroom.graphql')
const classroomResolvers = require('./resolvers/classroomResolvers')
const ClassroomAPI = require('./datasource/classroom')

module.exports = {
    classroomSchema,
    classroomResolvers,
    ClassroomAPI
}