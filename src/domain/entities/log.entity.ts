
//Defines an enumeration named LogSeverityLevel to represent different levels of severity for logs.
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

//Defines an interface named LogEntityOptions to specify the properties required to create a LogEntity object.
export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

//Defines a class named LogEntity to represent individual log entries.
export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    //Initializes a new LogEntity object with the provided options.
    constructor(options: LogEntityOptions) {

        const { level, message, origin, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;

    }

    /*  Parses the JSON string using JSON.parse().
        Extracts the necessary properties (message, level, createdAt, origin) from the parsed object.
        Creates and returns a new LogEntity object with those properties.
        Sets the origin to 'log.entity.ts' for logs created from JSON.
    */

    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;

        const { message, level, createdAt, origin } = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            createdAt: new Date(createdAt),
            origin,
        });

        return log;
    };


    /**
        Creates a LogEntity object from a plain JavaScript object.
        Extracts the necessary properties from the object using destructuring.
        Creates and returns a new LogEntity object with those properties.
     */

    static fromObject = (object: { [key: string]: any }): LogEntity => {

        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }

}