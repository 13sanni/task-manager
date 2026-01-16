import app from "./app.ts";
const PORT = Number(process.env.PORT);
import { prisma } from "./lib/prisma.ts";
import { initSocket } from "./socket/index.ts";
import http from "http";

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log(" Prisma connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect Prisma to MongoDB");
    console.error(error);
  }
}

// Connect to the database in the background
connectToDatabase();

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});