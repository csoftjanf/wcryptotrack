import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router, Params } from '@angular/router';

// models
import { CryptoPortfolio, CryptoTotals, CryptoStats, CoinPurchase, Select2OptionData, CoinList, CoinStats } from '../../models/Crypto';
import { User, UserAuth } from '../../models/user';

// services
import { srvServerData } from "../../shared/services/screeninfo.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './dashbcrypto.component.html',
  styleUrls: ['./dashbcrypto.component.scss']
})

export class DashbCryptoComponent implements OnInit {


  public portfolio: CryptoPortfolio[];
  public stats: CryptoStats;


  public coinTotals: CryptoTotals[] = [];
  public portfolioTotals = new CryptoTotals();
  public UpdateDate: string;

  public _UserAuth: UserAuth;

  public barChartData: any[];
  public barChartLabels: string[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend: boolean = false;
  public barChartType: string = 'line';

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  public pieChartLabels2: string[] = [];
  public pieChartData2: number[] = [];
  public pieChartType2: string = 'pie';

  public currentUser: User;

  // for Add Coin
  public addcoinflag: boolean;
  public hidecoinflag: boolean;
  public coinPurchase: CoinPurchase;

  public coinlists: CoinList[];
  public selectCoinData: Array<Select2OptionData> = [];
  public errorMessage: string;

  //public portflist: GenEntry[];
  public selectPortfData: Array<Select2OptionData> = [];

  public PortFolioNo: number;

  // stats
  public cstats: CoinStats;

  constructor(
    private sharedService: SharedService,
    private serverdata: srvServerData,
    private router: Router) {

  }

  ngOnInit() {

    this.PortFolioNo = 39;

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //this.serverdata.UpdateCryptoValues().subscribe(res => {
    //},
    //  (err: HttpErrorResponse) => {
    //    if (err.error instanceof Error) {
    //      console.log('An error occurred:', err.error.message);
    //    } else {
    //      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    //    }
    //  }
    //);

    this.GetPricesList(this.currentUser.tokenString);
    this.GetStats(this.currentUser.tokenString);
    this.GetCoinList();

    this.coinPurchase = new CoinPurchase();
    this.coinPurchase.coin = "";
    this.coinPurchase.portfolio = "0";
    this.coinPurchase.pdate = ''
    this.coinPurchase.qnt = "";
    this.coinPurchase.price = '';
    this.coinPurchase.tokenstring = '';

    this.addcoinflag = false;
    this.hidecoinflag = true;
  }


  GetPricesList(tokenstring: string) {
    this.serverdata.GetCrypto(tokenstring).subscribe(res => {

      this.portfolio = [];

      this.portfolio = res;

      this.portfolioTotals.totalpurchasevalue = 0;
      this.portfolioTotals.totalcurrentvalue = 0;
      this.portfolioTotals.totalprofit = 0;
      this.portfolioTotals.totprofitperc = 0;

      for (let genlist of this.portfolio) {
        this.UpdateDate = genlist.latestdate.toString();
        this.portfolioTotals.totalpurchasevalue = this.portfolioTotals.totalpurchasevalue + genlist.purchaseValue;
        this.portfolioTotals.totalcurrentvalue = this.portfolioTotals.totalcurrentvalue + genlist.currentValue;
        this.portfolioTotals.totalprofit = this.portfolioTotals.totalprofit + genlist.profitValue;
        if (this.portfolioTotals.totalpurchasevalue > 0) {
          this.portfolioTotals.totprofitperc = this.portfolioTotals.totalprofit / this.portfolioTotals.totalpurchasevalue;
        }
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



  GetStats(tokenstring: string) {
    //console.log(UserNo);

    //this.portfoliostats();

    this.serverdata.GetCryptoStats(tokenstring).subscribe(res => {
      this.stats = res;


      let ActualBalance: Number[] = [];
      this.barChartData = [
        { data: [], label: 'Portfolio Value' }
      ];
      this.barChartLabels = [];

      this.stats.coinHistory.forEach((element) => {
        ActualBalance.push(element.currentValue);
        this.barChartLabels.push(element.valueDate);
      });

      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = ActualBalance;
      this.barChartData = clone;

      // pie value
      this.pieChartLabels = [];
      this.pieChartData = [];
      this.stats.coinStats.forEach((element) => {
        this.pieChartLabels.push(element.code)
        this.pieChartData.push(element.currentValue);
      });


      // pie qnty
      this.pieChartLabels2 = [];
      this.pieChartData2 = [];
      this.stats.coinStats.forEach((element) => {
        this.pieChartLabels2.push(element.code)
        this.pieChartData2.push(element.qnty);
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


  portfoliostats() {

    this.stats.cstats = new CoinStats();

    this.stats.cstats.hold_qnt = 0;
    this.stats.cstats.sold_qnt = 0;
    this.stats.cstats.hold_val = 0;
    this.stats.cstats.hold_profit = 0;
    this.stats.cstats.hold_profitperc = 0;

    this.stats.cstats.sold_val = 0;
    this.stats.cstats.sold_Purchased = 0;
    this.stats.cstats.sold_profit = 0;
    this.stats.cstats.sold_profitperc = 0

    this.stats.cstats.tot_invested = 0
    this.stats.cstats.tot_profit = 0
    this.stats.cstats.tot_profitperc = 0

  }

  // ************************ add new coin section ********************* 


  addcoin() {
    this.addcoinflag = true;
    this.hidecoinflag = false;
  }

  savecoin() {

    //console.log(">" + this.coinPurchase.coin +"<");

    this.coinPurchase.portfolio = "0";
    //if (this.coinPurchase.portfolio == '') {
    //  this.errorMessage = "Please select a portfolio"
    //  return;
    //}

    if (this.coinPurchase.coin == '') {
      this.errorMessage = "Please select a coin"
      return;
    }

    if (this.coinPurchase.pdate == '') {
      this.errorMessage = "Please enter a purchase date"
      return;
    }


    if (this.coinPurchase.qnt == '') {
      this.errorMessage = "Please enter a quantity"
      return;
    }

    if (this.coinPurchase.price == '') {
      this.errorMessage = "Please enter a price"
      return;
    }

    if (isNaN(Number(this.coinPurchase.qnt))) {
      this.errorMessage = "Quantity is not valid"
      return;
    }

    if (isNaN(Number(this.coinPurchase.price))) {
      this.errorMessage = "Price is not valid"
      return;
    }

    this.addcoinflag = false;
    this.hidecoinflag = true;

    this.coinPurchase.tokenstring = this.currentUser.tokenString;
    this.serverdata.AddCoin(this.coinPurchase).subscribe(data => {
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {

          this.coinPurchase.coin = '';
          this.coinPurchase.pdate = '';
          this.coinPurchase.price = '';
          this.coinPurchase.qnt = '';

          this.GetPricesList(this.currentUser.tokenString);
          this.GetStats(this.currentUser.tokenString);
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  cancelsave() {
    this.addcoinflag = false;
    this.hidecoinflag = true;
  }

  GetCoinList() {
    this.serverdata.CoinList().subscribe(data => {
      this.coinlists = data;
      for (let item of data.coinlist) {
        this.selectCoinData.push({ id: (item.coincode).toString(), text: item.coincode });
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

  typechange(e: any): void {
    if (typeof e.value == "string") {
      this.coinPurchase.coin = e.value;
    }
  }

  GotToCoinView(holdingid: number) {
    this.router.navigate(['coinview', holdingid]);
  }

  //GetPortfolioList() {
  //  this.serverdata.EntityList(this.currentUser.tokenString).subscribe(data => {
  //    this.portflist = data;
  //    this.selectPortfData.push({ id: '', text: '' });
  //    for (let item of this.portflist) {
  //      this.selectPortfData.push({ id: (item.accNo).toString(), text: item.accName });
  //    }
  //  },
  //    (err: HttpErrorResponse) => {
  //      if (err.error instanceof Error) {
  //        console.log('An error occurred:', err.error.message);
  //      } else {
  //        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
  //      }
  //    }
  //  );

  //}

  //portfchange(e: any): void {
  //  if (typeof e.value == "string") {
  //    this.coinPurchase.portfolio = e.value;
  //  }
  //}

  // ************************ add new coin section ********************* 

}
