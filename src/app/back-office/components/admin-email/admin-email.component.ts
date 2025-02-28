import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminEmailService } from './admin-email.service';
import { Title } from '@angular/platform-browser';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-admin-email',
  templateUrl: './admin-email.component.html',
  styleUrls: ['./admin-email.component.scss'],
})
export class AdminEmailComponent implements OnInit {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  emailForm: FormGroup;
  configForm: FormGroup;
  smtpAccounts: {
    _id: string;
    hostname: string;
    port: number;
    username: string;
    password: string;
    // authType: 'Plain' | 'OAuth2';
    // clientId?: string;
    // clientSecret?: string;
    // refreshToken?: string;
    isActive: boolean;
  }[];
  isEditing: boolean = false;
  accordionOpen: boolean = false;
  editSmtpId: string | null = null;
  startConfig = {
    hostname: '',
    port: '',
    username: '',
    password: '',
    isActive: false,
  };

  startEmail: {
    configuration: any;
    subject: string;
    recipient: string;
    message: string;
  } = {
    configuration: null,
    subject: '',
    recipient: '',
    message: '',
  };

  constructor(
    private form: FormBuilder,
    private adminEmailService: AdminEmailService,
    private titleService: Title
  ) {
    this.emailForm = this.form.group({
      configuration: ['', Validators.required],
      subject: ['', Validators.required],
      recipient: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    this.configForm = this.form.group({
      hostname: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      // authType: ['Plain', Validators.required],
      password: ['', Validators.required],
      // clientId: [''],
      // clientSecret: [''],
      // refreshToken: [''],
      isActive: [false],
    });

    // this.configForm.get('authType')?.valueChanges.subscribe((authType) => {
    //   if (authType === 'Plain') {
    //     this.configForm.get('password')?.setValidators(Validators.required);
    //     this.configForm.get('clientId')?.clearValidators();
    //     this.configForm.get('clientSecret')?.clearValidators();
    //     this.configForm.get('refreshToken')?.clearValidators();
    //   } else if (authType === 'OAuth2') {
    //     this.configForm.get('password')?.clearValidators();
    //     this.configForm.get('clientId')?.setValidators(Validators.required);
    //     this.configForm.get('clientSecret')?.setValidators(Validators.required);
    //     this.configForm.get('refreshToken')?.setValidators(Validators.required);
    //   }

    //   this.configForm.get('password')?.updateValueAndValidity();
    //   this.configForm.get('clientId')?.updateValueAndValidity();
    //   this.configForm.get('clientSecret')?.updateValueAndValidity();
    //   this.configForm.get('refreshToken')?.updateValueAndValidity();
    // });
  }

  ngOnInit(): void {
    this.titleService.setTitle('AGID Form | Servizio SMTP');
    this.emailForm.reset(this.startEmail);
    this.configForm.reset(this.startConfig);
    this.adminEmailService.getSmtpAccounts().subscribe({
      next: (response) => (this.smtpAccounts = response),
    });
  }

  sendEmail() {
    this.adminEmailService
      .sendEmail(this.emailForm.value)
      .pipe(timeout(10000))
      .subscribe({
        next: (res) => {
          this.emailForm.reset(this.startEmail);
          this.errorMessage = null;
          this.successMessage = "L'email è stata inviata";
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (err) => {
          this.successMessage = null;
          this.errorMessage = "Non è stato possibile inviare l'email";
          console.log(err);
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        },
      });
  }

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }

  cancelEditing() {
    this.isEditing = false;
    this.accordionOpen = false;
    this.editSmtpId = null;
    this.configForm.reset(this.startConfig);
  }

  addSmtpAccount() {
    if (this.configForm.invalid) {
      return;
    }

    if (this.isEditing) {
      this.adminEmailService
        .updateSmtpAccount(this.editSmtpId, this.configForm.value)
        .subscribe({
          next: (response) => {
            this.configForm.reset(this.startConfig);
            this.emailForm.reset(this.startEmail);
            this.ngOnInit();
          },
        });
      this.isEditing = false;
      this.accordionOpen = false;
    } else {
      this.adminEmailService.addSmtpAccount(this.configForm.value).subscribe({
        next: (response) => {
          this.configForm.reset(this.startConfig);
          this.emailForm.reset(this.startEmail);
          this.ngOnInit();
        },
      });
    }
  }

  modifySmtpAccount(index: number) {
    let smtpToEdit = this.smtpAccounts[index];

    this.configForm.patchValue({
      hostname: smtpToEdit.hostname,
      port: smtpToEdit.port,
      username: smtpToEdit.username,
      password: smtpToEdit.password,
      // authType: smtpToEdit.authType,
      // password: smtpToEdit.authType === 'Plain' ? smtpToEdit.password : '',
      // clientId: smtpToEdit.authType === 'OAuth2' ? smtpToEdit.clientId : '',
      // clientSecret:
      //   smtpToEdit.authType === 'OAuth2' ? smtpToEdit.clientSecret : '',
      // refreshToken:
      //   smtpToEdit.authType === 'OAuth2' ? smtpToEdit.refreshToken : '',
      isActive: smtpToEdit.isActive,
    });
    this.accordionOpen = true;
    this.isEditing = true;
    this.editSmtpId = smtpToEdit._id;
  }

  deleteSmtpAccount(index: number) {
    this.cancelEditing();
    let smtpToDelete = this.smtpAccounts[index];
    console.log(smtpToDelete);
    this.adminEmailService.deleteSmtpAccounts(smtpToDelete._id).subscribe({
      next: (response) => {
        this.emailForm.reset(this.startEmail);
        this.ngOnInit();
      },
    });
  }

  get hasActiveConfig(): boolean {
    return this.smtpAccounts?.some((config) => config.isActive) ?? false;
  }
}
