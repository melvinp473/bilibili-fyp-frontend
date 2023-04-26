import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestConnectionComponent } from './test-connection/test-connection.component';
import { HomeComponent } from './home/home.component';
import { DatasetComponent } from './dataset/dataset.component';
import { PreprocessingComponent } from './preprocessing/preprocessing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dataset', component: DatasetComponent },
  { path: 'preprocessing', component: PreprocessingComponent },
  { path: 'test-connection-component', component: TestConnectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
