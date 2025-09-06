import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment as env } from '@env/environment.development';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { Alert } from '@shared/services/alert';
import { endpoint } from '@shared/utils/endpoints.util';
import { getIcon, getStateBadge } from '@shared/utils/functions.util';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { UserResponse } from '../models/user-response.interface';
import { TipoParticipante } from '@app/pages/tipo-participantes/services/tipo-participante';
import { CatalogoResponse } from '@app/pages/tipo-participantes/models/catalogo-response.interface';
import { TipoDocumento } from '../../tipo-documento/services/tipo-documento';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly httpClient = inject(HttpClient);
  private readonly alertService = inject(Alert);
  private readonly tipoParticipanteService = inject(TipoParticipante);
  private readonly tipoDocumentoService = inject(TipoDocumento);



  /**
   * Obtiene una lista de usuarios paginados y ordenados desde el backend
   */
  getAll(
    size: number, // Cantidad de registros por página
    sort: string, // Campo por el cual ordenar
    order: string, // Dirección del orden ('asc' o 'desc')
    numPage: number, // Página actual (índice desde 0)
    getInputs: string // Parámetros adicionales en formato de query string (por ejemplo: &name=juan)
  ): Observable<BaseApiResponse<UserResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_USERS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return forkJoin({
      users: this.httpClient.get<BaseApiResponse<UserResponse[]>>(requestUrl),
      tipos: this.tipoParticipanteService.getAllTipo(),
      tiposDocumento: this.tipoDocumentoService.getAllTipoDoc(),
    }).pipe(
      map(({ users, tipos, tiposDocumento }) => {
        const tiposMap = new Map<number, string>();
        tipos.data.forEach((tipo: CatalogoResponse) => {
          tiposMap.set(tipo.id, tipo.nombre);
        });

        const tiposDocMap = new Map<number, string>();
        tiposDocumento.data.forEach((tipo: CatalogoResponse) => {
          tiposDocMap.set(tipo.id, tipo.nombre);
        });


        users.data.forEach(function (user: UserResponse) {
          user.nombreCompleto =
            user.pnombre +
            ' ' +
            user.snombre +
            ' ' +
            user.papellido +
            ' ' +
            user.sapellido; // Combina nombre y apellido
          user.estadoDescripcion = getStateBadge(
            user.estadoDescripcion,
            'Estado del usuario'
          ); // Transforma el estado en un badge visual
          user.icView = getIcon('visibility', 'Ver usuario'); // Ícono de ver
          user.icEdit = getIcon('edit', 'Actualizar usuario'); // Ícono de editar
          user.icDelete = getIcon('delete', 'Eliminar usuario'); // Ícono de eliminar
          user.tipoParticipanteNombre = tiposMap.get(user.tipoParticipanteId);
          user.tipoIdentificacionNombre = tiposDocMap.get(user.tipoIdentificacionId);
        });

        return users;
      })
    );
  }

  private readonly userByIdSignal = signal<UserResponse | null>(null);

  userById(userId: number): void{
    const requestUrl = `${env.api}${endpoint.USER_BY_ID}${userId}`;

    this.httpClient
      .get<BaseApiResponse<UserResponse>>(requestUrl)
      .pipe(map((resp) => resp.data))
      .subscribe((data) => {
        console.log(data);
        this.userByIdSignal.set(data);
      });
  }

  getUserByIdSignal = this.userByIdSignal.asReadonly();
}