export interface ISottomissione {
  idForm?: string;
  versione?: number;
  titolo?: string;
  codiceUtenteInserimento?: string;
  dataInserimento?: Date;
  codiceUtenteModifica?: string;
  dataUltimaModifica?: Date;
  stato?: string;
  verificaPubblicazione?: { abilitata?: boolean; campoUrlTarget?: string };
  idPubblicazione?: string;
  datiPubblicati?: any;
  datiBozza?: any;
  descrizione?: any;
}
