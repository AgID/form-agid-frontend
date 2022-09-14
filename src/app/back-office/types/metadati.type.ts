export interface IMetadatiType {
  titolo: string;
  titoloPattern: string;
  descrizione: string;
  stato: string;
  versione: number;
  abilitaStatistiche: boolean;
  sezioniInformative?: {
    home: string;
    faq: string;
  };
  verificaPubblicazione?: {
    abilitata: boolean;
    campoUrlTarget: string;
  };
  acl?: {
    tipo: string;
    valore: string;
  };
  dataInizioValidita?: string;
  dataFineValidita?: string;
}
