export type User = {
  sub: string;
  id: string;
  provider: string;
  provider_id: string;
  firstname: string;
  lastname: string;
  email: string;
  email_id: string;
  /**
   * @description La stringa è una data nel formato yyyy-MM-dd HH:mm:ss
   */
  last_access: string;
  user_policy: UserPolicy[];
};

type UserPolicy = {
  entity: any;
  policy: any;
  /**
   * @description La stringa è una data nel formato yyyy-MM-dd HH:mm:ss
   */
  valid_from: string;
  /**
   * @description La stringa è una data nel formato yyyy-MM-dd HH:mm:ss
   */
  valid_to: string;
};
