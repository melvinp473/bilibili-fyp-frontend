import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestConnectionComponent } from './test-connection/test-connection.component';
import { HomeComponent } from './components/home/home.component';
import { DatasetComponent } from './components/dataset/dataset.component';
import { PreprocessingComponent } from './components/preprocessing/preprocessing.component';
import { MachineLearningComponent } from './components/machine-learning/machine-learning.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dataset', component: DatasetComponent },
  { path: 'preprocessing', component: PreprocessingComponent },
  { path: 'machine-learning', component: MachineLearningComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'test-connection-component', component: TestConnectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
