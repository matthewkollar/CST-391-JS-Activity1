import { createPool, Pool } from 'mysql2';

let pool: Pool | null = null;

// Function to initialize the MySQL connection pool
const initializeMySqlConnector = () => {
    try {
        pool = createPool({
            connectionLimit:
                process.env.MY_SQL_DB_CONNECTION_LIMIT !== undefined
                    ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT)
                    : 10,
            port:
                process.env.MY_SQL_DB_PORT !== undefined
                    ? parseInt(process.env.MY_SQL_DB_PORT)
                    : 3306,
            host: process.env.MY_SQL_DB_HOST,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            database: process.env.MY_SQL_DB_DATABASE,
        });

        console.debug('MySQL2 Adapter Pool generated successfully');
        console.log('Using database:', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error: MySQL2 failed to connect');
                throw new Error('Not able to connect to database');
            } else {
                console.log('Connection made');
                connection.release();
            }
        });
    } catch (error) {
        console.error('[mysql.connector][initializeMySqlConnector][Error]:', error);
        throw new Error('Failed to initialize pool');
    }
};

// Function to execute MySQL queries safely
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if (!pool) {
            initializeMySqlConnector();
        }

        return new Promise<T>((resolve, reject) => {
            pool!.query(query, params, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results as T);
            });
        });
    } catch (error) {
        console.error('[mysql.connector][execute][Error]:', error);
        throw new Error('Failed to execute MySQL query');
    }
};

export { pool, initializeMySqlConnector };
