import { Component, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { BarcodeResult } from './barcode-result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barcode2';

  showScanner = true;

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue = '';
  lat = 0;
  long = 0;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: BarcodeResult) {
    this.barcodeValue = result.codeResult.code;
    this.showScanner = false;
    window.alert(result.codeResult.code);
  }

  onStarted(started: boolean) {
    console.log('onStarted', started);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        // this.callApi(longitude, latitude);
        this.lat = latitude;
        this.long = longitude;
      });
    } else {
      console.log("No support for geolocation");
    }
  }
}
