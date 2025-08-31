export interface INavbarData {
  menuId?: number;
  path: string;
  icon: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
}

export const navbarData: INavbarData[] = [
  {
    path: 'users',
    icon: 'groups',
    label: 'Participantes',
    items: [
      {
        path: 'tipoParticipante',
        icon: '',
        label: 'Tipo de participante',
      },
      {
        path: 'tipoIdentificacion',
        icon: 'badge',
        label: 'Tipo de identificación',
      }
    ]
  },
  {
    path: 'catalogos',
    icon: 'list',
    label: 'Catalogos',
    items: [
      
    ]
  },
  {
    path: 'user-roles',
    icon: 'manage_accounts',
    label: 'Rol de usuarios',
  }
];
