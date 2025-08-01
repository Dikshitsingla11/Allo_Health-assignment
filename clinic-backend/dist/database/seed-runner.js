"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const database_config_1 = require("./database.config");
const seed_1 = require("./seeds/seed");
const mysql = require("mysql2/promise");
async function runSeed() {
    const dbConfig = new database_config_1.DatabaseConfig().createTypeOrmOptions();
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.username,
        password: dbConfig.password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await connection.end();
    const dataSource = new typeorm_1.DataSource({ ...dbConfig, synchronize: true });
    try {
        await dataSource.initialize();
        await (0, seed_1.seedDatabase)(dataSource);
        await dataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
runSeed();
//# sourceMappingURL=seed-runner.js.map