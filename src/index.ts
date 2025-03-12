import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Configure CORS middleware
app.use(
  "*",
  cors({
    origin: "https://ip-demo-nine.vercel.app/",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 3600,
    credentials: true,
  })
);

app.get("/", (c) => {
  const ip =
    c.req.header("x-forwarded-for") ||
    c.req.raw.headers.get("x-real-ip") ||
    "unknown";
  return c.json({ ip });
});

export default app;
