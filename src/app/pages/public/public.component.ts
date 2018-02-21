import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { RouterModule, Router } from '@angular/router';

import { CoinView } from '../../models/Crypto';
import { CoinViewData, PublicScreen } from '../../models/Crypto';

import { srvServerData } from "../../shared/services/screeninfo.service";
import { SharedService } from "../../shared/services/shared.service";
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})

export class PublicComponent implements OnInit {

  private sService: SharedService;

  public coinlist: PublicScreen[];
  public UpdateDate: string;

  model: any = {};
  loading = false;
  returnUrl: string;

  // coin history
  public _coinview: CoinView;

  sparklineLineData: Array<any> = [];
  sparklineLineData2: Array<any> = [];
  sparklineLineData3: Array<any> = [];
  sparklineLineData4: Array<any> = [];
  sparklineLineData5: Array<any> = [];
  sparklineLineData6: Array<any> = [];
  sparklineLineData7: Array<any> = [];
  sparklineLineData8: Array<any> = [];
  sparklineLineData9: Array<any> = [];
  sparklineLineData10: Array<any> = [];

  sparklineLineOptions: any = {
    type: 'line',
    width: '100%',
    height: 50,
    lineColor: '#fea6a4',
    fillColor: 'rgba(0,0,0,0)',
    lineWidth: 2,
    maxSpotColor: '#ff6b68',
    minSpotColor: '#ff6b68',
    spotColor: '#ff6b68',
    spotRadius: 4,
    highlightSpotColor: '#ff6b68',
    highlightLineColor: '#ff6b68'
  };

  //public barChartData: any[];
  //public barChartLabels: string[] = [];
  //public barChartOptions: any = {
  //  scaleShowVerticalLines: false,
  //  responsive: true
  //};
  //public barChartLegend: boolean = false;
  //public barChartType: string = 'line';


  constructor(
    private sharedService: SharedService,
    private serverdata: srvServerData,
    private router: Router,
    private alertService: AlertService) {
    this.sService = sharedService;
  }

  ngOnInit() {

    this.sService.sidebarVisible = false;

    this.coinlist = [];

    this.serverdata.GetPublicCrypto().subscribe(res => {
      this.coinlist = res;

      this.coinlist.forEach((element) => {

        this.UpdateDate = element.mcap.valueDate;

        if (element.mcap.rank == "1") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData.push(element.currentValue);
          });
        }

        if (element.mcap.rank == "2") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData2.push(element.currentValue);
          });
        }

        if (element.mcap.rank == "3") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData3.push(element.currentValue);
          });
        }

        if (element.mcap.rank == "4") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData4.push(element.currentValue);
          });
        }

        if (element.mcap.rank == "5") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData5.push(element.currentValue);
          });
        }

        if (element.mcap.rank == "6") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData6.push(element.currentValue);
          });
        }
        if (element.mcap.rank == "7") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData7.push(element.currentValue);
          });
        }
        if (element.mcap.rank == "8") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData8.push(element.currentValue);
          });
        }
        if (element.mcap.rank == "9") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData9.push(element.currentValue);
          });
        }
        if (element.mcap.rank == "10") {
          element.coinHistory.forEach((element) => {
            this.sparklineLineData10.push(element.currentValue);
          });
        }

      });


    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

  }

  login() {
    this.router.navigate(['/login']);

  }
  
  GotToCoinView(cointype: string) {
    this.router.navigate(['publiccoin', cointype]);
  }
}
