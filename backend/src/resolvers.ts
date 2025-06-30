import { PrismaClient } from "@prisma/client";
import { generateToken } from "./auth";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    events: async () => {
      return prisma.event.findMany({
        include: { attendees: true },
      });
    },
    me: async (_: any, __: any, context: any) => {
      return context.user || null;
    },
  },
  Mutation: {
    joinEvent: async (_: any, { eventId }: { eventId: string }, context: any) => {
      if (!context.user) throw new Error("Unauthorized");

      const user = await prisma.user.upsert({
        where: { email: context.user.email },
        update: {},
        create: {
          id: context.user.id,
          name: context.user.name,
          email: context.user.email,
        },
      });

      const event = await prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: {
            connect: { id: user.id },
          },
        },
        include: { attendees: true },
      });

      // Notify clients via Socket.io
      context.io.to(eventId).emit("attendeeUpdate", event.attendees);

      return event;
    },
  },
};