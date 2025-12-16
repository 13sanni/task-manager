import app from "./app.ts";
const port = Number(process.env.PORT);
import { prisma } from "./lib/prisma.ts";


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

app.listen(port,()=>{
    console.log ("Backend is running")
})