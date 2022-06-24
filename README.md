# Form AGID

Il progetto ha l'obiettivo di implementare una piattaforma _open source_ per la
raccolta di informazioni tramite form.


## Tecnologie utilizzate

Il linguaggio di programmazione utilizzato è
[Typescript](https://www.typescriptlang.org/) (v4.6.x).

### Procedura di installazione e avvio

1. installare [git](https://git-scm.com/downloads)
1. installare [docker](https://docs.docker.com/install/)
1. eseguire i seguenti comandi:

```shell
git clone https://github.com/AgID/form-agid-frontend.gitù
cd form-agid-frontend
docker build -t agid-form-fe:0.0.1 .
docker run -d -p80:80 agid-form-fe:0.0.1
```
