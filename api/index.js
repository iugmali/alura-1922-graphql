const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const path = require('path');

const {userSchema, userResolvers, UsersAPI} = require('./user');
const {classroomSchema, classroomResolvers, ClassroomAPI} = require('./classroom');
const {matriculaSchema, matriculaResolvers, MatriculasAPI} = require('./matricula');

const typeDefs = mergeTypeDefs([userSchema, classroomSchema, matriculaSchema]);
const resolvers = [userResolvers, classroomResolvers, matriculaResolvers];

const dbConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, './data/database.db')
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI(),
      classroomAPI: new ClassroomAPI(dbConfig),
      matriculasAPI: new MatriculasAPI(dbConfig)
    }
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Server running on port ${url}`);
});