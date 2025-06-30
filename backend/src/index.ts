import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { authMiddleware } from "./auth";
import { setupSocket } from "./socket";

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const prisma = new PrismaClient();
  const io = setupSocket(httpServer, prisma);

  app.use(cors());
  app.use(authMiddleware);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: (req as any).user,
      io,
    }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
})();