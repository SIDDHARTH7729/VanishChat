class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: string[]; //  to ensure errors are of type string only

    constructor(statusCode: number = 500, message: string = "Something went wrong", errors: string[] = [], stack?: string) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = Array.isArray(errors) ? errors : [errors]; // to ensure it's an array

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
