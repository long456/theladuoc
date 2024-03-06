export interface BaseResponse {
  success: boolean;
  errorMessages?: string;
  messages?: string;
  data?: [any];
}
