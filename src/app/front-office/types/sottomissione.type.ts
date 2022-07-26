export interface ISottomissione {
  idForm?: string;
  versione?: number;
  codiceUtenteInserimento?: string;
  dataInserimento?: Date;
  codiceUtenteModifica?: string;
  dataUltimaModifica?: Date;
  stato?: string;
  verificaPubblicazione?: { abilitata?: boolean; campoUrlTarget?: string };
  idPubblicazione?: string;
  dati_pubblicati?: any;
  dati_bozza?: any;
  descrizione?: any;
}
