import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FilterMenuStatesComponent } from '@shared/components/reusables/filter-menu-states/filter-menu-states.component';
import { GenericButtonComponent } from '@shared/components/reusables/generic-button/generic-button.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxComponent } from '@shared/components/reusables/search-box/search-box.component';
import { SplitButtonComponent } from '@shared/components/reusables/split-button/split-button.component';
import { TipoDocumento } from '../../services/tipo-documento';
import { componentTipoDocumentoSetting } from './tipo-documento-list-config';
import { RowClick } from '@shared/models/reusables/rowclick-interface';
import { CatalogoResponse } from '@app/pages/tipo-participantes/models/catalogo-response.interface';
import { SearchBox } from '@shared/models/reusables/search-options.interface';
import { Actions } from '@shared/models/reusables/split-button.interface';

@Component({
  selector: 'app-tipo-documento-list',
  imports: [
    ListTableComponent,
    MatIcon,
    SearchBoxComponent,
    FilterMenuStatesComponent,
    SplitButtonComponent,
    GenericButtonComponent
  ],
  templateUrl: './tipo-documento-list.html',
  styleUrl: './tipo-documento-list.scss'
})
export class TipoDocumentoList {
  public tipoDocumentoService = inject(TipoDocumento)
  public readonly componentTipoDocumento$ = componentTipoDocumentoSetting

  icon$ = 'badge';

  resetChecks: boolean = false;

  rowClick(event: RowClick<CatalogoResponse>) {
    console.log('event ', event);
  }

  search(data: SearchBox) {
    this.componentTipoDocumento$.filters.numFilter = data.searchValue;
    this.componentTipoDocumento$.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = '';

    if (this.componentTipoDocumento$.filters.textFilter != null) {
      str += `&numFilter=${this.componentTipoDocumento$.filters.numFilter}&textFilter=${this.componentTipoDocumento$.filters.textFilter}`;
    }

    if (this.componentTipoDocumento$.filters.stateFilter != null) {
      str += `&stateFilter=${this.componentTipoDocumento$.filters.stateFilter}`;
    }

    if (this.componentTipoDocumento$.filters.refresh == true) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.componentTipoDocumento$.filters.refresh = false;
    }

    this.componentTipoDocumento$.getInputs = str;
  }

  setDataFilterStates(data: []) {
    // Si el array tiene elementos...
    if (data.length) {
      // Une los elementos del array en un solo string separados por guiones y lo asigna al filtro de estado
      this.componentTipoDocumento$.filters.stateFilter = data.join('-');
    } else {
      // Si el array está vacío, asigna por defecto '1' al filtro de estado
      this.componentTipoDocumento$.filters.stateFilter = '1';
    }

    // Llama a un método para aplicar o actualizar los filtros con el nuevo estado configurado
    this.formatGetInputs();
  }

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.componentTipoDocumento$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.initFilterReset();
        this.resetChecks = !this.resetChecks;
        break;
    }
  }

  initFilterReset() {
    this.componentTipoDocumento$.filters = { ...this.componentTipoDocumento$.initFilters }; // Asignando un nuevo objeto a la propiedad
    this.formatGetInputs();
  }

  newTipoDocumento(){
    
  }

}
