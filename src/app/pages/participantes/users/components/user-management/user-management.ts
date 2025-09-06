import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputSelect } from '@shared/components/reusables/input-select/input-select';
import { InputText } from '@shared/components/reusables/input-text/input-text';
import { UserResponse } from '../../models/user-response.interface';
import { TipoParticipante } from '@app/pages/tipo-participantes/services/tipo-participante';
import { TipoDocumento } from '@app/pages/participantes/tipo-documento/services/tipo-documento';
import { map, Observable } from 'rxjs';
import { SelectResponse } from '@shared/models/commons/selects-response.interface';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatIconModule,
    InputText,
    InputSelect,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement implements OnInit {
  private readonly fb$ = inject(FormBuilder);
  private readonly tipoParticipanteService = inject(TipoParticipante);
  private readonly tipoDocumentoService = inject(TipoDocumento);

  userForm!: FormGroup;
  mode: 'create' | 'update' | 'read';

  tiposParticipante$!: Observable<SelectResponse[]>;
  tiposDocumento$!: Observable<SelectResponse[]>;

  ngOnInit(): void {
    this.tiposParticipante$ = this.tipoParticipanteService.getAllTipo().pipe(
      map((response) =>
        response.data.map((item) => ({
          code: item.id,
          description: item.nombre,
        }))
      )
    );
    this.tiposDocumento$ = this.tipoDocumentoService.getAllTipoDoc().pipe(
      map((response) =>
        response.data.map((item) => ({
          code: item.id,
          description: item.nombre,
        }))
      )
    );
  }

  initForm(): void {
    this.userForm = this.fb$.group({
      userId: new FormControl(0),
      pnombre: new FormControl(null, [Validators.required]),
      snombre: new FormControl(null),
      papellido: new FormControl(null, [Validators.required]),
      sapellido: new FormControl(null),
      tipoParticipanteId: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefono: new FormControl(null, [Validators.required]),
      fechaNacimiento: new FormControl(null, [Validators.required]),
      tipoIdentificacionId: new FormControl(null, [Validators.required]),
      numeroIdentificacion: new FormControl(null, [Validators.required]),
      nivelAcademico: new FormControl(null),
      semestre: new FormControl(null),
      estado: new FormControl(null),
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'create' | 'update' | 'read';
      usersDetail?: UserResponse;
    }
  ) {
    this.mode = data.mode;
    this.initForm();
    if (this.mode !== 'create' && this.data.usersDetail) {
      this.patchForm(this.data.usersDetail);
    }
  }

    patchForm(user: UserResponse) {
    this.userForm.patchValue({
      userId: user.userId,
      pnombre: user.pnombre,
      snombre: user.snombre,
      papellido: user.papellido,
      sapellido: user.sapellido,
      tipoParticipanteId: user.tipoParticipanteId,
      email: user.email,
      telefono: user.telefono,
      fechaNacimiento: new Date(user.fechaNacimiento),
      tipoIdentificacionId: user.tipoIdentificacionId,
      numeroIdentificacion: user.numeroIdentificacion,
      nivelAcademico: user.nivelAcademico,
      semestre: user.semestre,
      estado: user.estado,
    });
  }

  userSave() {
    if (this.userForm.invalid) {
      return;
    }
    // Save logic here
  }
}
