export interface IForm {
  titolo?: string;
  titoloPattern?: string;
  descrizione?: string;
  sezioniInformative?: ISezioniInformative;
  stato?: string;
  versione?: number;
  codiceUtenteInserimento?: string;
  dataInserimento?: Date;
  codiceUtenteModifica?: string;
  dataUltimaModifica?: Date;
  acl?: IAcl;
  dataInizioValidita?: Date;
  dataFineValidita?: Date;
  scheduling?: IScheduling;
  verificaPubblicazione?: IVerificaPubblicazione;
  abilitaStatistiche?: boolean;
  components?: Array<any>;
  _id?: string;
}

export interface ISezioniInformative {
  home?: string;
  faq?: string;
}

export interface IAcl {
  tipo?: string;
  valore?: string;
}

export interface IScheduling {
  giorni_attesa: number;
  dataInizio: Date;
  dataFine: Date;
}

export interface IVerificaPubblicazione {
  abilitata?: boolean;
  campoUrlTarget?: string;
}
