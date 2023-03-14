import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export type Role = "landlord" | "student";

export const role = ["landlord", "student"] as const;

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  updateClerkUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        token: z.string(),
        publicMetadata: z.enum(role),
      }),
    )
    .mutation(({ input }) => {
      const { id, publicMetadata } = input;

      const CLERK_SECRET = process.env.CLERK_SECRET_KEY;

      if (!CLERK_SECRET) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No Clerk secret found, check .env",
        });
      }

      const updateUser = async () => {
        try {
          const data = await (
            await fetch(`https://api.clerk.dev/v1/users/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${CLERK_SECRET}`,
              },
              body: JSON.stringify({
                public_metadata: {
                  role: publicMetadata,
                },
              }),
            })
          ).json();

          return data as { id: string; public_metadata: { role: Role } };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
      };

      return updateUser();
    }),

  createPrismaUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        name: z.string(),
        role: z.enum(role),
      }),
    )
    .mutation(({ ctx, input }) => {
      // TODO: Create student or landlord depending on role
    }),
});
