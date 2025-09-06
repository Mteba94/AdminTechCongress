import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout/layout';

const childrenRoutes: Routes = [
  {
    path: '',
    redirectTo: 'usersList',
    pathMatch: 'full',
  },
  {
    path: 'usersList',
    loadComponent: () =>
      import('./pages/participantes/users/components/user-list/user-list').then(
        (c) => c.UserList
      ),
  },
  {
    path: 'tipoParticipante',
    loadComponent: () =>
      import('./pages/tipo-participantes/components/tipo-participante-list/tipo-participante-list').then(
        (c) => c.TipoParticipanteList
      ),
  },
  {
    path: 'tipoIdentificacion',
    loadComponent: () =>
      import('./pages/participantes/tipo-documento/components/tipo-documento-list/tipo-documento-list').then(
        (c) => c.TipoDocumentoList
      ),
  }
];

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: childrenRoutes,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/components/login/login').then((c) => c.Login),
  },
];