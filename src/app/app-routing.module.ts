import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ClientesFormComponent } from './components/clientes/clientes-form.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuotasComponent } from './components/cuotas/cuotas.component';
import { CuotasFormComponent } from './components/cuotas/cuotas-form.component';
import { ActividadesFormComponent } from './components/actividades/actividades-form.component';
import { AsignarCuotasComponent } from './components/clientes/asignar-cuotas.component';
import { AsignarActividadesComponent } from './components/clientes/asignar-actividades.component';

const routes: Routes = [
  {path: '',pathMatch: 'full', redirectTo: 'clientes'},
  {path: 'cuotas', component:CuotasComponent},
  {path: 'cuotas/form', component:CuotasFormComponent},
  {path: 'cuotas/form/:id', component:CuotasFormComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'clientes/form', component:ClientesFormComponent},
  {path: 'clientes/form/:id', component:ClientesFormComponent},
  {path: 'actividades', component:ActividadesComponent},
  {path: 'actividades/form', component:ActividadesFormComponent},
  {path: 'actividades/form/:id', component:ActividadesFormComponent},
  {path: 'clientes/asignar-cuotas/:id', component:AsignarCuotasComponent},
  {path: 'clientes/asignar-actividades/:id', component:AsignarActividadesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
