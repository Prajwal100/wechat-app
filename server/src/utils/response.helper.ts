import { HttpException, HttpStatus } from "@nestjs/common";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: HttpStatus;
}
export function CustomResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  status?: HttpStatus,
): ApiResponse<T> {
  if (success) {
    return {
      success,
      message,
      data,
      statusCode: status,
    };
  } else {
    throw new HttpException(
      {
        success,
        message,
        data,
      },
      status || HttpStatus.BAD_REQUEST,
    );
  }
}
