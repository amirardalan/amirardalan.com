const config = {
  schema: './src/db/schema.ts',
  out: './src/db/out',
  connectionString: process.env.DB_URL!,
};

export default config;
