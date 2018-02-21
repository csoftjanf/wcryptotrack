import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Params } from '@angular/router';

// models
import { CoinView, CoinSale, CoinStats } from '../../models/Crypto';
import { User, UserAuth } from '../../models/user';


// services
import { srvServerData } from "../../shared/services/screeninfo.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './coinview.component.html',
  styleUrls: ['./coinview.component.scss']
})

export class CoinViewComponent implements OnInit {

  public currentUser: User;
  public _coinview: CoinView;

  private sub: any;
  private HoldingId: string;

  // add sale
  public addcoinflag: boolean;
  public hidecoinflag: boolean;
  public coinsale: CoinSale;
  public errorMessage: string;

  // coin history
  public barChartData: any[];
  public barChartLabels: string[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend: boolean = false;
  public barChartType: string = 'line';

  // stats
  public cstats: CoinStats;


  // value history
  public vbarChartData: any[];
  public vbarChartLabels: string[] = [];
  public vbarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public vbarChartLegend: boolean = false;
  public vbarChartType: string = 'line';

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private serverdata: srvServerData) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.sub = this.route.params.subscribe(params => {
      this.HoldingId = params['id'];
      this.GetCoinViewGeneralData();
    });


    this.coinsale = new CoinSale();
    this.coinsale.sdate = '';
    this.coinsale.price = '';
    this.coinsale.qnt = '';

    this.addcoinflag = false;
    this.hidecoinflag = true;

    //this._coinview.coinviewdata.name = 'Bitcoin';
  }


  GetCoinViewGeneralData() {

    let userid: string;

    if (this.currentUser == null)
      userid = '';
    else
      userid = this.currentUser.tokenString

    this.serverdata.CoinviewData(userid, +this.HoldingId).subscribe(res => {
      this._coinview = res;

      this.CalcCoinStats();

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

      if (this.currentUser != null) {
        let ActualBalance2: Number[] = [];
        this.vbarChartData = [
          { data: [], label: 'Aud Coin Value' }
        ];
        this.vbarChartLabels = [];

        this._coinview.coinPortFolioHistory.forEach((element) => {
          ActualBalance2.push(element.currentValue);
          this.vbarChartLabels.push(element.valueDate);
        });

        let clone2 = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = ActualBalance2;
        this.vbarChartData = clone2;
      }

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

  CalcCoinStats() {
    let hold_qnt: number;
    let org_qnt: number;
    let pprice: number;

    this.cstats = new CoinStats();

    hold_qnt = 0;
    org_qnt = 0;

    this.cstats.hold_qnt = 0;
    this.cstats.sold_qnt = 0;
    this.cstats.hold_val = 0;
    this.cstats.hold_profit = 0;
    this.cstats.hold_profitperc = 0;

    this.cstats.sold_val = 0;
    this.cstats.sold_Purchased = 0;
    this.cstats.sold_profit = 0;
    this.cstats.sold_profitperc = 0;

    this._coinview.transactions.forEach((element) => {
      if (element.buysell == 1) {
        hold_qnt += element.qnty;
        pprice = element.price;
        org_qnt += element.qnty;
      }
      else {
        hold_qnt -= element.qnty;
        this.cstats.sold_qnt += element.qnty;
        this.cstats.sold_val += element.qnty * element.price;
        this.cstats.sold_profit += (element.qnty * element.price) - (element.qnty * pprice)
      }
    });

    this.cstats.hold_qnt = hold_qnt;
    this.cstats.hold_val = hold_qnt * +this._coinview.mcap.price_aud;

    this.cstats.hold_profit = (hold_qnt * +this._coinview.mcap.price_aud) - (hold_qnt * +pprice);
    if ((hold_qnt * +pprice) > 0)
      this.cstats.hold_profitperc = this.cstats.hold_profit / (hold_qnt * +pprice);

    if ((this.cstats.sold_qnt * pprice) > 0)
      this.cstats.sold_profitperc = this.cstats.sold_profit / (this.cstats.sold_qnt * pprice);

    this.cstats.tot_profit = this.cstats.sold_profit + this.cstats.hold_profit;
    if ((org_qnt * pprice) > 0)
      this.cstats.tot_profitperc = this.cstats.tot_profit / (org_qnt * pprice);
  }

  addcoin() {
    this.addcoinflag = true;
    this.hidecoinflag = false;
  }

  savecoin() {

    this.coinsale.holdingId = this.HoldingId;
    this.coinsale.portfolio = "0";

    if (this.coinsale.sdate == '') {
      this.errorMessage = "Please enter a sale date"
      return;
    }


    if (this.coinsale.qnt == '') {
      this.errorMessage = "Please enter a quantity"
      return;
    }

    if (this.coinsale.price == '') {
      this.errorMessage = "Please enter a price"
      return;
    }

    if (isNaN(Number(this.coinsale.qnt))) {
      this.errorMessage = "Quantity is not valid"
      return;
    }

    if (isNaN(Number(this.coinsale.price))) {
      this.errorMessage = "Price is not valid"
      return;
    }

    this.addcoinflag = false;
    this.hidecoinflag = true;

    this.coinsale.tokenstring = this.currentUser.tokenString;

    console.log(this.coinsale);

    this.serverdata.SellCoin(this.coinsale).subscribe(data => {
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {

          this.coinsale.sdate = '';
          this.coinsale.price = '';
          this.coinsale.qnt = '';
        }
      }
    );
  }

  cancelsave() {
    this.addcoinflag = false;
    this.hidecoinflag = true;
  }
}

