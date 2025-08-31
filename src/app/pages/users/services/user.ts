import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '@env/environment.development';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { Alert } from '@shared/services/alert';
import { endpoint } from '@shared/utils/endpoints.util';
import { getIcon, getStateBadge } from '@shared/utils/functions.util';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { UserResponse } from '../models/user-response.interface';
import { TipoParticipante } from '@shared/services/tipo-participante';
import { CatalogoResponse } from '@shared/models/commons/catalogo-response.interface';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly httpClient = inject(HttpClient);
  private readonly alertService = inject(Alert);
  private readonly tipoParticipanteService = inject(TipoParticipante);

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
      tipos: this.tipoParticipanteService.getAllTiposParticipante(),
    }).pipe(
      map(({ users, tipos }) => {
        const tiposMap = new Map<number, string>();
        tipos.data.forEach((tipo: CatalogoResponse) => {
          tiposMap.set(tipo.id, tipo.nombre);
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
          user.icEdit = getIcon('edit', 'Actualizar usuario'); // Ícono de editar
          user.icDelete = getIcon('delete', 'Eliminar usuario'); // Ícono de eliminar
          user.tipoParticipanteNombre = tiposMap.get(user.tipoParticipanteId);
        });

        return users;
      })
    );
  }
}