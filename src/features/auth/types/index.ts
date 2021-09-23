interface UserProfile {
  fullName: string;
  dateOfBirth: string;
  avatar: string;
  male: boolean;
  address: string;
}

interface UserPermission {
  _id?: string;
  name: string;
  type: string;
}

export interface AuthUser {
  _id?: string;
  email: string;
  phoneNumber: string;
  profile: UserProfile;
  createdAt: string;
  permission: UserPermission;
}

export interface UserResponse {
  token: string;
  staff: AuthUser;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  values: UserResponse;
  errors?: any;
  user: AuthUser;
}

export interface Cities {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export interface District extends Cities {
  province_code: number;
  wards: Ward[];
}

export interface Ward extends Cities {
  district_code: number;
}
