import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { CambioEnteService } from './cambio-ente.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

interface Entity {
  Codice_Categoria: string;
  Codice_IPA: string;
  Denominazione_ente: string;
  email: string;
  isActiveEntity: boolean;
  status: "Active" | "Pending" | "Disabled";
  role: "RTD" | "AMMINISTRATORE_DELEGATO" | "DIRIGENTE_SCOLATISCO" | "ADMIN" | "SUPER_ADMIN";
  valid_from: string;
  valid_to: null
}

@Component({
  selector: 'app-cambio-ente',
  templateUrl: './cambio-ente.component.html',
  styleUrls: ['./cambio-ente.component.scss'],
})
export class CambioEnteComponent implements OnInit {
  entities: Entity[] = [];
  enteAssociatoUtente: string;
  alertMessages: any[] = [];
  user_id: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private cambioEnteService: CambioEnteService,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Lista amministrazioni');
    this.fetchEntities();
    this.updateEnteAssociatoUtente();
  }

  private fetchEntities() {
    if (this.authService.userInfo?.user_policy?.length) {
      let allEntities = this.authService.userInfo.user_policy.find(userPolicy => userPolicy.entity === null)?.policy.entity;
      this.entities = allEntities ? allEntities.filter(entity => entity.status == "Active") : [];
    }
  }

  private async updateEnteAssociatoUtente() {
    let ente = '-';
    const activeEntity = this.entities.find(entity => entity.isActiveEntity);
    if (activeEntity) {
      ente = activeEntity.Denominazione_ente ?? '-';
    }
    await this.authService.getUserInfo()
    this.enteAssociatoUtente = this.translate
      .instant('AG_RTD_Associato')
      .replace('{{ente}}', `<b>${ente}</b>`);
    this.alertMessages.push({ htmlContent: this.enteAssociatoUtente });
  }

  public goBack(): void {
    this.router.navigate(['/elenco-form']);
  }

  public async onAccediClick(selectedEntity: Entity) {
    const entities = this.entities.map(entity => {
      if (entity === selectedEntity) {
        return { ...entity, isActiveEntity: true };
      } else {
        return { ...entity, isActiveEntity: false };
      }
    });

    this.cambioEnteService.updateActiveEntity(entities).subscribe({
      next: async () => {
        this.entities = entities;
        this.updateEnteAssociatoUtente();
      },
      error: (e) => {
        console.error(e);
        throw new Error('updateActiveEntity fallito');
      },
    }
    );
  }

}