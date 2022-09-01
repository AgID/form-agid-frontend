export interface IMetadatiType {
  titolo: string;
  descrizione: string;
  sezioniInformative?: {
    home: string;
    faq: string;
  };
  dataInizioValidita?: string;
  dataFineValidita?: string;
}
