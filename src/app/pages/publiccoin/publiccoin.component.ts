import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Params } from '@angular/router';

// models
import { CoinView } from '../../models/Crypto';

// services
import { srvServerData } from "../../shared/services/screeninfo.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './publiccoin.component.html',
  styleUrls: ['./publiccoin.component.scss']
})

export class PublicCoinViewComponent implements OnInit {

  public _coinview: CoinView;

  private sub: any;
  private CoinType: string;


  // coin history
  public barChartData: any[];
  public barChartLabels: string[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend: boolean = false;
  public barChartType: string = 'line';


  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private serverdata: srvServerData) {

  }

  ngOnInit() {
    console.log(this.route.params);

    this.sub = this.route.params.subscribe(params => {
      this.CoinType = params['id'];
      console.log(this.CoinType);
      this.GetCoinViewGeneralData();
    });
  }


  GetCoinViewGeneralData() {

    console.log(this.CoinType);

    this.serverdata.PublicCoinviewData(this.CoinType).subscribe(res => {
      this._coinview = res;

      console.log(res);

      let ActualBalance: Number[] = [];
      this.barChartData = [
        { data: [], label: 'Aud Coin Value' }
      ];
      this.barChartLabels = [];

      this._coinview.coinHistory.forEach((element) => {
        ActualBalance.push(element.currentValue);
        this.barChartLabels.push(element.valueDate);
      });

      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = ActualBalance;
      this.barChartData = clone;

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

}

