import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from "@angular/common/http";
//import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Observable } from "rxjs/Observable";

import { GenAccType, AccountType, Entity, Select2OptionData, Select2TemplateFunction } from '../../models/GenList'
import { CoinPurchase, coinparam,CoinSale } from '../../models/Crypto';
import { ProfileGoal } from '../../models/GoalsDashboard'
import { mdlProfile } from "../../models/Profile";
import { AppConfig } from '../../app.config';
import { User } from '../../models/user';
//import { GenEntry } from '../../models/GenEntry'

@Injectable()
export class srvServerData {

  private sURL: string; //= 'http://localhost:65314' ;//'http://wtservices202.azurewebsites.net'

  constructor(private http: HttpClient, private config: AppConfig) {
    this.sURL = this.config.apiUrl;
  }


  // ************************************ login and auth ***********************************

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.config.apiUrl + '/api/crypto/authenticate', { username: username, password: password })
  }

  ValToken(sToken: string): Observable<any> {
    return this.http.post(this.config.apiUrl + '/api/crypto/ValidateToken', { tokenstring: sToken })
  }

  createUser(user: User) {
    return this.http.post(this.config.apiUrl + '/api/crypto/Register', user);
  }


  GetProfile(tokenstring: string): Observable<any> {
    const params = new HttpParams().set('tokenstring', tokenstring);
    return this.http.get(this.sURL + '/api/crypto/GetById', { params });
  }

  UpdateProfile(profile: mdlProfile) {

    return this.http.post(this.config.apiUrl + '/api/crypto/UpdateProfile', profile); //mdlProfile);
  }

  AccountValues(UserNo: number): Observable<any> {
    const params = new HttpParams().set('UserNo', UserNo.toString());
    return this.http.get(this.sURL + '/api/PortFolio/AccountValues', { params });
  }

  // ************************************ coin stuff ***********************************


  UpdateCryptoValues(): Observable<any> {
    return this.http.get(this.sURL + '/api/Crypto/UpdateCryptoValues');
  }

  GetCrypto(tokenstring: string): Observable<any> {
    const params = new HttpParams().set('tokenstring', tokenstring);
    return this.http.get(this.sURL + '/api/Crypto/CryptoValues', { params });
  }

  GetPublicCrypto(): Observable<any> {
    return this.http.get(this.sURL + '/api/Crypto/PublicCryptoValues');
  }

  PublicCoinviewData(coin: string): Observable<any> {
    const params = new HttpParams().set('coin', coin);
    return this.http.get(this.sURL + '/api/Crypto/PublicCoinView', { params });
  }

  GetCryptoStats(tokenstring: string): Observable<any> {
    const params = new HttpParams().set('tokenstring', tokenstring);
    return this.http.get(this.sURL + '/api/Crypto/CryptoStats', { params });
  }

  CoinviewData(tokenstring: string, holdingid: number): Observable<any> {
    var Coinparam: coinparam;
    Coinparam = new coinparam();
    Coinparam.tokenstring = tokenstring;
    Coinparam.holdingid = holdingid;
    return this.http.post(this.sURL + '/api/Crypto/GetCoinView', Coinparam);
  }

 
  CoinList(): Observable<any> {
    return this.http.get(this.config.apiUrl + '/api/crypto/CoinList');
  }

  AddCoin(purchase: CoinPurchase): Observable<any> {
    return this.http.post(this.config.apiUrl + '/api/crypto/AddCoin', purchase);//, coin: purchase })
  }

  SellCoin(sell: CoinSale): Observable<any> {
    return this.http.post(this.config.apiUrl + '/api/crypto/SellCoin', sell);//, coin: purchase })
  }
  //GetScreenInfo(ScreenNo: number): Observable<any> {
  //  const params = new HttpParams().set('ScreenId', ScreenNo.toString());
  //  return this.http.get(this.sURL + '/api/GenPage/GenScreenInfo', { params });
  //}

  //// ProfileGoal
  //GetGoalsDashboard(UserNo: number): Observable<any> {
  //  const params = new HttpParams().set('UserNo', UserNo.toString());
  //  return this.http.get(this.sURL + '/api/Goals/GetProfileGoals', { params });
  //}

  ////GenAccType[]
  //AccountTypeList(UserNo: number): Observable<any> {
  //  const params = new HttpParams().set('UserNo', UserNo.toString());
  //  return this.http.get(this.sURL + '/api/GenList/AccountTypeList', { params });
  //}

  ////GenAccType[]
  //EntityList(tokenstring: string): Observable<any> {
  //  const params = new HttpParams().set('tokenstring', tokenstring);
  //  return this.http.get(this.sURL + '/api/CryptoPortfolio/EntityList', { params });
  //}

  //UpdateEntities(genacctype: GenEntry): Observable<any> {
  //  return this.http.post(this.config.apiUrl + '/api/CryptoPortfolio/UpdateAccountType', genacctype);
  //}

  //AddEntities(genacctype: GenEntry): Observable<any> {
  //  return this.http.post(this.config.apiUrl + '/api/CryptoPortfolio/AddAccountType', genacctype);
  //}
}
