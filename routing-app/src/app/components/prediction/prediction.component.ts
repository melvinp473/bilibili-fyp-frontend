import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {
  predictionForm: FormGroup;
  predictionResult: any;

  constructor(private fb: FormBuilder, private predictionService: PredictionService) {
    this.predictionForm = this.fb.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      cholesterol: ['', Validators.required],
      bloodPressure: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.predictionForm.valid) {
      this.predictionService.getPrediction(this.predictionForm.value).subscribe(result => {
        this.predictionResult = result;
      });
    }
  }
}
