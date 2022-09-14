export interface UserProfile {
  sub?: string;
  nonce?: string;
  at_hash?: string;
  sid?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  provider?: string;
  provider_id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  email_id?: string;
  last_access?: string;
  user_policy?: UserPolicy[];
}

export interface UserPolicy {
  entity?: any;
  policy?: any;
  valid_from?: any;
  valid_to?: any;
}
