import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Function to calculate processing time in milliseconds
const getProcessingTimeInMS = (time: [number, number]): string => {
    return `${((time[0] * 1000 + time[1] / 1e6)).toFixed(2)}ms`;
};

/*
 * Logging format:
 * [id][timestamp] method:url START processing
 * [id][timestamp] method:url response.statusCode END processing
 * 
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */

export default function logger(req: Request, res: Response, next: NextFunction) {
    // Generate a unique identifier
    const id = uuidv4();

    // Get timestamp
    const now = new Date();
    const timestamp = [
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    ].join('-');

    // Extract method and URL from request
    const { method, url } = req;

    // Log start of execution
    const start = process.hrtime();
    const startText = `START:${getProcessingTimeInMS(start)}`;
    const idText = `[${id}]`;
    const timeStampText = `[${timestamp}]`;

    console.log(`${idText}${timeStampText} ${method}:${url} ${startText}`);

    // Log execution time once response is sent
    res.once('finish', () => {
        const end = process.hrtime(start);
        const endText = `END:${getProcessingTimeInMS(end)}`;
        console.log(`${idText}${timeStampText} ${method}:${url} ${res.statusCode} ${endText}`);
    });

    // Proceed to the next middleware
    next();
}
