import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import healthRoutes from "./routes/health";

const app = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

app.register(healthRoutes);

export default app;
