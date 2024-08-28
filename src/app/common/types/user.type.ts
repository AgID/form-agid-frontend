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
  expired: boolean; //per capire se l'utenza è scaduta
  user_policy: UserPolicy[];
};

type UserPolicy = {
  entity: null;
  policy: {
    entity: EntityPolicy[];
  };
  /**
   * @description La stringa è una data nel formato yyyy-MM-dd HH:mm:ss
   */
  valid_from: string;
  /**
   * @description La stringa è una data nel formato yyyy-MM-dd HH:mm:ss
   */
  valid_to: string;
};

export type EntityPolicy = {
  Codice_Categoria: string;
  Codice_IPA: string;
  Denominazione_ente: string;
  email: string;
  isActiveEntity: boolean;
  status: any;
  role: any
  valid_from: string;
  valid_to: null
};