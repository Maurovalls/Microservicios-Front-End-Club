import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CuotasComponent } from './components/cuotas/cuotas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { LayoutModule } from './layout/layout.module';
import { ClientesFormComponent } from './components/clientes/clientes-form.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CuotasFormComponent } from './components/cuotas/cuotas-form.component';
import { ActividadesFormComponent } from './components/actividades/actividades-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AsignarCuotasComponent } from './components/clientes/asignar-cuotas.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsignarActividadesComponent } from './components/clientes/asignar-actividades.component';

@NgModule({
  declarations: [
    AppComponent,
    CuotasComponent,
    ClientesComponent,
    ActividadesComponent,
    ClientesFormComponent,
    CuotasFormComponent,
    ActividadesFormComponent,
    AsignarCuotasComponent,
    AsignarActividadesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
