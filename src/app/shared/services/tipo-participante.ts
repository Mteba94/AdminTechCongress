import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { CatalogoResponse } from '@shared/models/commons/catalogo-response.interface';
import { endpoint } from '@shared/utils/endpoints.util';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoParticipante {
  private readonly httpClient = inject(HttpClient);

  getAllTiposParticipante(): Observable<BaseApiResponse<CatalogoResponse[]>> {
    const requestUrl = `${env.api}${endpoint.LIST_TIPO_PARTICIPANTE}`;
    return this.httpClient.get<BaseApiResponse<CatalogoResponse[]>>(requestUrl);
  }

  getByIdTipoParticipante(tipoParticipanteID: number): Observable<BaseApiResponse<CatalogoResponse[]>>{
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

