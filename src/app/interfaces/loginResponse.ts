export interface LoginResponse {
    status: number;
    message: string;
    data: {
      success: string;
      token: string;
      tenantId: string;
    };
  }