import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
    console.log("PostgreSQL Connected");
});

pool.on("error", (err) => {
    console.error(`PostgreSQL connection error: ${err}`);
    process.exit(1);
});

export default pool;  // Export the pool instance directly
