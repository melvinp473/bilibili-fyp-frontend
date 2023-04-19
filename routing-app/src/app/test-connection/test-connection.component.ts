import { Component } from '@angular/core';

@Component({
  selector: 'app-test-connection',
  templateUrl: './test-connection.component.html',
  styleUrls: ['./test-connection.component.css']
})
export class TestConnectionComponent {

  connect() {
    alert("connecting")
  }
}
