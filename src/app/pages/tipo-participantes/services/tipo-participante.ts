import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { CatalogoResponse } from '@app/pages/tipo-participantes/models/catalogo-response.interface';
import { endpoint } from '@shared/utils/endpoints.util';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.development';
import { getIcon, getStateBadge } from '@shared/utils/functions.util';

@Injectable({
  providedIn: 'root'
})
export class TipoParticipante {
  private readonly httpClient = inject(HttpClient);

  getAll(
    size: number,
    sort: string,
    order: string,
    numPage: number,
    getInputs: string
  ): Observable<BaseApiResponse<CatalogoResponse[]>> {
    const requestUrl = `${env.api}${endpoint.LIST_TIPO_PARTICIPANTE}?records=${size}&sort=${sort}&order=${order}&numPage=${numPage + 1
      }${getInputs}`;
    return this.httpClient
      .get<BaseApiResponse<CatalogoResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          resp.data.forEach(function (tipo: CatalogoResponse) {
            tipo.estadoDescripcion = getStateBadge(
              tipo.estadoDescripcion,
              'Estado del tipo participante'
            )
            tipo.icEdit = getIcon('edit', 'Actualizar tipo participante');
            tipo.icDelete = getIcon('delete', 'Eliminar tipo participante');
          })
          return resp;
        })
      );
  }

  getAllTipo(): Observable<BaseApiResponse<CatalogoResponse[]>> {
    const requestUrl = `${env.api}${endpoint.LIST_TIPO_PARTICIPANTE}`

    return this.httpClient
      .get<BaseApiResponse<CatalogoResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          return resp
        })
      )
  }

  getByIdTipoParticipante(tipoParticipanteID: number): Observable<BaseApiResponse<CatalogoResponse[]>> {
    const requestUrl = `${env.api}${endpoint.GET_BY_ID_TIPO_PARTICIPANTE}tipoParticipanteID`

    return this.httpClient
      .get<BaseApiResponse<CatalogoResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          return resp
        })
      )
  }
}

