interface UserProfile {
  fullName: string;
  dateOfBirth: string;
  address: UserAddress;
}

interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
  lat: string;
  lng: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  createdAt: string;
  phoneNumber: string;
  profile: UserProfile;
}

export interface UserResponse {
  token: string;
  user: AuthUser;
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
