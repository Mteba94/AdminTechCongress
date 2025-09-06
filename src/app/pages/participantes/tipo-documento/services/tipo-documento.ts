import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CatalogoResponse } from '@app/pages/tipo-participantes/models/catalogo-response.interface';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { map, Observable } from 'rxjs';
import { environment as env } from '@env/environment.development';
import { endpoint } from '@shared/utils/endpoints.util';
import { getIcon, getStateBadge } from '@shared/utils/functions.util';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumento {
  private readonly httpClient = inject(HttpClient);

  getAll(
    size: number,
    sort: string,
    order: string,
    numPage: number,
    getInputs: string
  ): Observable<BaseApiResponse<CatalogoResponse[]>> {
    const requestUrl = `${env.api}${endpoint.LIST_TIPO_DOCUMENTO}?records=${size}&sort=${sort}&order=${order}&numPage=${numPage + 1
      }${getInputs}`;
    return this.httpClient
      .get<BaseApiResponse<CatalogoResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          resp.data.forEach(function (tipo: CatalogoResponse) {
            tipo.estadoDescripcion = getStateBadge(
              tipo.estadoDescripcion,
              'Estado del tipo documento'
            )
            tipo.icEdit = getIcon('edit', 'Actualizar tipo documento');
            tipo.icDelete = getIcon('delete', 'Eliminar tipo documento');
          })
          return resp;
        })
      );
  }

  getAllTipoDoc(): Observable<BaseApiResponse<CatalogoResponse[]>> {
      const requestUrl = `${env.api}${endpoint.LIST_TIPO_DOCUMENTO}`
  
      return this.httpClient
        .get<BaseApiResponse<CatalogoResponse[]>>(requestUrl)
        .pipe(
          map((resp) => {
            return resp
          })
        )
    }
}
