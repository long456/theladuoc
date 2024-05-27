export interface UserData {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  organizationId: number;
  permissions: string[];
}

export interface UserPasswordData {
  oldPassword: string,
  password: string,
  confirmPassword: string
}
