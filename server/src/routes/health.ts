import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const health: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/health",
    {
      schema: {
        response: {
          200: Type.Object({ status: Type.String() }),
        },
      },
    },
    async () => ({ status: "ok" })
  );
};

export default health;
