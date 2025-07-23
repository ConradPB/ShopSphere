import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import healthRoutes from "./routes/health";

const app = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

app.register(healthRoutes);

// Start server
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
