import { Injectable } from '@angular/core';
import { Http}  from '@angular/Http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  public sharedName:string;
  public sharedRiskValue:string;
  
  constructor(public http:Http) {
    console.log("dataservice is running...");
    this.sharedName = "";
    this.sharedRiskValue  = "";
   }

  setSharedName (data) {
    this.sharedName = data;
  }
  getSharedName  () {
    return this.sharedName;
  }

  setSharedRiskValue (data) {
    this.sharedRiskValue = data;
  }
  getSharedRiskValue  () {
    return this.sharedRiskValue;
  }

   getProductsList(){
    return this.http.get('http://localhost:3000/products')
      .map(res => res.json()); 
   }

   getParametersList(){
    return this.http.get('http://localhost:3000/parameters')
      .map(res => res.json()); 
   }
   getKeys(){
    return this.http.get('http://localhost:3000/intTable').map(res => res.json()); 
   }

   postRisk(body){
     return this.http.post('http://localhost:3000/risks',body).map(res => res.json());
   }
}
