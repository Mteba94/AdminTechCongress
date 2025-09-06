import { CatalogoResponse } from "@app/pages/tipo-participantes/models/catalogo-response.interface";
import { MenuFilterTable } from "@shared/models/reusables/filter-menu-states.interface";
import { GenericButton } from "@shared/models/reusables/generic-button.interface";
import { TableColumns } from "@shared/models/reusables/list-table.interface";
import { SplitButton } from "@shared/models/reusables/split-button.interface";
import { GenericValidators } from "@shared/utils/generic-validators.util";

const tableColumns: TableColumns<CatalogoResponse>[] = [
  {
    label: 'Nombre',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'nombre',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'nombre',
    visible: true,
    download: true,
  },
  {
    label: 'Descripcion', // COLUMNA DE MI TABLA USUARIOS
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'descripcion',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'descripcion',
    visible: true,
    download: true,
  },
  {
    label: 'Estado', // COLUMNA DE MI TABLA USUARIOS
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'estadoDescripcion',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'simpleBadge',
    sticky: false,
    sort: true,
    sortProperty: 'estadoDescripcion',
    visible: true,
  },
  {
    label: '',
    cssLabel: ['w-8'],
    property: 'icEdit',
    cssProperty: [],
    type: 'icon',
    sticky: true,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'edit',
  },
  {
    label: '',
    cssLabel: ['w-8'],
    property: 'icDelete',
    cssProperty: [],
    type: 'icon',
    sticky: true,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'delete',
  },
];

const searchOptions = [
  {
    label: 'Nombres',
    value: 1,
    placeholder: 'Buscar por nombres',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
  {
    label: 'Apellidos',
    value: 2,
    placeholder: 'Buscar por apellidos',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
  {
    label: 'Email',
    value: 3,
    placeholder: 'Buscar por email',
    validation: [GenericValidators.emailValidation],
    validation_desc: 'Ingrese un email válido.',
    icon: 'tune',
  },
];

const actionButtonUser: GenericButton = {
  label: 'Crear',
  icon: 'add',
  tooltip: 'Crear nuevo Tipo de Participante',
};

const menuItems: MenuFilterTable = {
  label: 'Estados',
  icon: 'filter_list',
  tooltip: 'Estados',
  menuItems: [
    {
      label: 'Activo',
      icon: 'label',
      cssIcon: ['text-am-new-green'],
      value: 1,
    },
    {
      label: 'Inactivo',
      icon: 'label',
      cssIcon: ['text-am-gray-light'],
      value: 0,
    },
  ],
};

const filterButtons: SplitButton[] = [
  {
    type: 'button',
    icon: 'refresh',
    label: 'Actualizar listado',
    value: 1,
  },
  {
    type: 'action',
    id: 'Pendiente',
    icon: 'restart_alt',
    label: 'Refrescar filtros',
    value: 2,
    classes: {
      icon: 'text-am-main-blue-dark text-md',
    },
  },
];

const initFilters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: '1-0',
  refresh: false,
};

const filters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: '1-0',
  refresh: false,
};

export const componentTipoDocumentoSetting = {
  tableColumns,
  searchOptions,
  menuItems,
  filterButtons,
  actionButtonUser,
  getInputs: '',
  initFilters,
  filters,
  initialSort: 'id',
  initialSortDir: 'desc',
  filename: 'lista-tipo-participante',
};