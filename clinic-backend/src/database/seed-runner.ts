import { DataSource } from 'typeorm';
import { DatabaseConfig } from './database.config';
import { seedDatabase } from './seeds/seed';
import * as mysql from 'mysql2/promise';

async function runSeed() {
  const dbConfig = new DatabaseConfig().createTypeOrmOptions() as any;

  // Connect to MySQL server without specifying a database
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password,
  });

  // Create the database if it doesn't exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
  await connection.end();

  // Connect to the newly created database and run seeds
  const dataSource = new DataSource({ ...dbConfig, synchronize: true } as any);
  try {
    await dataSource.initialize();
    await seedDatabase(dataSource);
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

runSeed();
