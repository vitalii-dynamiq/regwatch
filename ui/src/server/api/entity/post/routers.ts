import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';

let routers = {
  id: 1,
  name: 'Hello World',
};

export const postRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  create: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ input }) => {
    routers = { id: routers.id + 1, name: input.name };
    return routers;
  }),

  getLatest: protectedProcedure.query(() => {
    return routers;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
