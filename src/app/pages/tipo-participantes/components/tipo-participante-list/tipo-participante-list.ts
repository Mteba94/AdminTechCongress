import { Component, inject } from '@angular/core';
import { TipoParticipante } from '../../services/tipo-participante';
import { componentTipoParticipanteSetting } from './tipo-participante-list-config';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MatIcon } from '@angular/material/icon';
import { SearchBoxComponent } from '@shared/components/reusables/search-box/search-box.component';
import { FilterMenuStatesComponent } from '@shared/components/reusables/filter-menu-states/filter-menu-states.component';
import { ExportExcel } from '@shared/components/reusables/export-excel/export-excel';
import { GenericButtonComponent } from '@shared/components/reusables/generic-button/generic-button.component';
import { SplitButtonComponent } from '@shared/components/reusables/split-button/split-button.component';
import { RowClick } from '@shared/models/reusables/rowclick-interface';
import { CatalogoResponse } from '@app/pages/tipo-participantes/models/catalogo-response.interface';
import { SearchBox } from '@shared/models/reusables/search-options.interface';
import { Actions } from '@shared/models/reusables/split-button.interface';
import { scaleIn400ms } from '@shared/animations/scale-in.animation';
import { fadeInRight400ms } from '@shared/animations/fade-in-right.animation';

@Component({
  selector: 'app-tipo-participante-list',
  imports: [
    ListTableComponent,
    MatIcon,
    SearchBoxComponent,
    FilterMenuStatesComponent,
    SplitButtonComponent,
    GenericButtonComponent,
    ExportExcel
  ],
  templateUrl: './tipo-participante-list.html',
  styleUrl: './tipo-participante-list.scss',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class TipoParticipanteList {
  public tipoParticipanteService = inject(TipoParticipante)
  public readonly componentTipoParticipante$ = componentTipoParticipanteSetting;

  iconUser$ = 'groups';
  resetChecks: boolean = false;

  rowClick(event: RowClick<CatalogoResponse>) {
    console.log('event ', event);
  }

  search(data: SearchBox) {
    this.componentTipoParticipante$.filters.numFilter = data.searchValue;
    this.componentTipoParticipante$.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = '';

    if (this.componentTipoParticipante$.filters.textFilter != null) {
      str += `&numFilter=${this.componentTipoParticipante$.filters.numFilter}&textFilter=${this.componentTipoParticipante$.filters.textFilter}`;
    }

    if (this.componentTipoParticipante$.filters.stateFilter != null) {
      str += `&stateFilter=${this.componentTipoParticipante$.filters.stateFilter}`;
    }

    if (this.componentTipoParticipante$.filters.refresh == true) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.componentTipoParticipante$.filters.refresh = false;
    }

    this.componentTipoParticipante$.getInputs = str;
  }

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.componentTipoParticipante$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.initFilterReset();
        this.resetChecks = !this.resetChecks;
        break;
    }
  }

  initFilterReset() {
    this.componentTipoParticipante$.filters = { ...this.componentTipoParticipante$.initFilters }; // Asignando un nuevo objeto a la propiedad
    this.formatGetInputs();
  }

  // Método que configura el filtro de estados basado en el array de datos recibido
  setDataFilterStates(data: []) {
    // Si el array tiene elementos...
    if (data.length) {
      // Une los elementos del array en un solo string separados por guiones y lo asigna al filtro de estado
      this.componentTipoParticipante$.filters.stateFilter = data.join('-');
    } else {
      // Si el array está vacío, asigna por defecto '1' al filtro de estado
      this.componentTipoParticipante$.filters.stateFilter = '1';
    }

    // Llama a un método para aplicar o actualizar los filtros con el nuevo estado configurado
    this.formatGetInputs();
  }

  newUser() {
    // this.dialog
    //   .open(UserManagement, {
    //     disableClose: true,
    //     width: '450px',
    //     enterAnimationDuration: 250,
    //     exitAnimationDuration: 250,
    //     data: { mode: 'create' },
    //   })
    //   .afterClosed()
    //   .subscribe((res) => {
    //     if (res) {
    //       this.setGetInputsUser(true);
    //     }
    //   });
  }

  setGetInputsUser(refresh: boolean) {
    this.componentTipoParticipante$.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return 'User/Excel';
  }

}
