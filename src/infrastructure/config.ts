export const postgresConfig = {
    
    DATABASE_URL: process.env.DATABASE_URL
      ? process.env.DATABASE_URL
      : `postgres://` +
        `${process.env.DATABASE_USER}:` +
        `${process.env.DATABASE_PASSWORD}@` +
        `${process.env.DATABASE_HOST}:` +
        `${process.env.DATABASE_PORT}/` +
        `${process.env.DATABASE_NAME}${process.env.DATBASE_SSL ? `?sslmode=${process.env.DATBASE_SSL}` : ''}`,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_TABLE_SCHEMA: process.env.DATABASE_TABLE_SCHEMA,
    DATABASE_CA: process.env.DATABASE_CA,
  };