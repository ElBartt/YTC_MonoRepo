/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import * as mysql from 'mysql2/promise';
import { SQL_CONF } from '../configs/database.config';

/**
 * The `Database` class provides a singleton instance of a MySQL database connection pool.
 * Use the `getInstance()` method to retrieve the instance.
 */
export class Database {
    private static instance: Database;
    private pool: mysql.Pool;

    /**
     * Creates a new instance of the `Database` class and initializes a MySQL connection pool.
     */
    private constructor() {
        this.pool = mysql.createPool(SQL_CONF);
    }

    /**
     * Returns the singleton instance of the `Database` class.
     * If an instance does not exist, a new instance is created and returned.
     * @returns The singleton instance of the `Database` class.
     */
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    /**
     * Executes a SQL query on the database and returns the result.
     * @param sql The SQL query to execute.
     * @param values An optional array of values to replace placeholders in the SQL query.
     * @returns A Promise that resolves to the result of the SQL query.
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async query<T>(sql: string, values?: any[]): Promise<T> {
        const [rows] = await this.pool.query(sql, values);
        return rows as T;
    }
}
