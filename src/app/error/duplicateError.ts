import { TErrorResponse, TErrorSource } from "../Interface/errorType"
import httpStatus from "http-status"

const duplicateError = (err: any): TErrorResponse => {
    // Determine the duplicated field and value
    const match = err.message.match(/"([^"]*)"/);
    const duplicatedValue = match && match[1] ? match[1] : 'Unknown';
    
    // Extract the field name if possible (from err.keyValue or err.keyPattern)
    let duplicatedField = 'Field';
    if (err.keyValue) {
        duplicatedField = Object.keys(err.keyValue)[0];
    } else if (err.keyPattern) {
        duplicatedField = Object.keys(err.keyPattern)[0];
    }

    const message = `${duplicatedField} '${duplicatedValue}' already exists.`;

    const errorSource: TErrorSource = [
        {
            path: duplicatedField,
            message: message
        }
    ]

    const statusCode = httpStatus.BAD_REQUEST;
    return {
        statusCode,
        message: message,
        errorSource
    }
}

export default duplicateError;