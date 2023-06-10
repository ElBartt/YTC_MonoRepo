/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { ApiAnalytic } from '@ytc/shared/models/util';
import { OkPacket } from 'mysql2';
import { ParsedQs } from 'qs';
import { Database } from '../database/database';

interface ParameterCount {
    parameter: string;
    count: number;
}

interface ApiKeyCount {
    apiKey: string;
    count: number;
}

interface RouteCount {
    route: string;
    count: number;
}

interface CountWithKey {
    [key: string]: number;
}

/**
 * Service for managing API analytics data.
 */
export class ApiAnalyticService {
    private db: Database;

    /**
     * Creates an instance of ApiAnalyticService.
     * Initializes the database instance.
     */
    constructor() {
        this.db = Database.getInstance();
    }

    async GetMostAccessedRoutes(): Promise<string[]> {
        const rows = await this.db.query<RouteCount[]>(
            'SELECT route, COUNT(*) AS count FROM apianalytics WHERE route != "" GROUP BY route ORDER BY count DESC LIMIT 10',
        );
        return rows.map(row => row.route);
    }

    async GetMostUsedParameters(): Promise<ParameterCount[]> {
        const parameters = await this.db.query<string[]>('SELECT parameters FROM apianalytics');

        // for each rows, split the parameters string by '&' and filter out empty strings
        parameters.filter((param: string) => param !== '').flatMap((param: string) => param.split('&'));

        // for each parameter, split the parameter string by '=' and filter out empty strings
        const counts = parameters.reduce((acc: CountWithKey, param: string) => {
            const [key] = param.split('=');
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as CountWithKey);

        // convert and return the counts object to an array of parameterCount objects
        return Object.keys(counts).map(key => ({ parameter: key, count: counts[key] }));
    }

    async GetErrorCount(): Promise<number> {
        return await this.db.query<number>('SELECT COUNT(*) AS count FROM apianalytics WHERE status_code >= 400');
    }

    async GetAverageResponseTime(): Promise<number> {
        return await this.db.query<number>('SELECT AVG(response_time) AS avg_response_time FROM apianalytics');
    }

    async GetApiKeyUsage(): Promise<ApiKeyCount[]> {
        const apiKeys = await this.db.query<string[]>('SELECT api_key FROM apianalytics');
        const counts = apiKeys.reduce((acc: CountWithKey, apiKey: string | number) => {
            acc[apiKey] = (acc[apiKey] || 0) + 1;
            return acc;
        }, {} as CountWithKey);
        return Object.keys(counts).map(key => ({ apiKey: key, count: counts[key] }));
    }

    /**
     * Inserts a new API analytic record into the database.
     * @param analytic The API analytic object to insert.
     * @returns The number of affected rows in the database.
     */
    async InsertAnalytic(analytic: ApiAnalytic): Promise<number> {
        const columns = Object.keys(analytic) as Array<keyof ApiAnalytic>;
        const sql = `INSERT INTO apianalytics (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;

        const values = columns.map(column => analytic[column]);

        const result = await this.db.query<OkPacket>(sql, values);
        return result.affectedRows;
    }

    /**
     * Converts a ParsedQs object to a query string.
     * @param params The ParsedQs object to convert.
     * @returns The query string representation of the ParsedQs object.
     */
    StringifyQueryParams(params: ParsedQs): string {
        if (typeof params === 'undefined') {
            return '';
        }

        const queryString = Object.keys(params)
            .map(key => {
                const value = params[key];
                return `${encodeURIComponent(key)}=${encodeURIComponent(value?.toString() || '')}`;
            })
            .join('&');

        return queryString;
    }
}
