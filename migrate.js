require("dotenv").config('./.env')
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const db = require('./config/db');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  });

async function runMigrations() {
    const umzug = new Umzug({
        migrations: { glob: 'migrations/*.js' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console
    });

    try {
        await umzug.up();
        console.log('Migrations performed successfully');
    } catch (error) {
        console.error('Error running migrations', error);
    } finally {
        await db.end();
    }
}

runMigrations();