import { ApiTypes } from "@types";

export class ApiError {
  private errorData: ApiTypes.ApiError;
  constructor(errorData: ApiTypes.ApiError) {
    this.errorData = errorData;
  }
}
