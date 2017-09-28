import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-analysis',
  templateUrl: './product-analysis.component.html',
  styleUrls: ['./product-analysis.component.css']
})
export class ProductAnalysisComponent implements OnInit {
  myform: FormGroup;
  name:string;
  id:number;
  products:Products[];
  parameters:Parameters[];
  prodCriteras:Parameters[];
  jointkeys:Keys[];
  responseBody:Risk;
  report:any = {};

  @ViewChild('criteria_table') criteria_table;
  @ViewChild('riskReport') riskVal;

  constructor( private datservice:DataService, private router:Router ) {
    console.log('user running...');

  }

  ngOnInit() {
    console.log('ngOnInit running...');
    this.name = "";
    this.id = 0;

    this.myform = new FormGroup({

      maturitydate: new FormControl(),
      strike: new FormControl('', Validators.pattern(/^[0-9]+/)),
      barrier: new FormControl('', Validators.pattern(/^[0-9]+/)),
      underlying: new FormControl(),
      participation: new FormControl('', Validators.pattern(/^[0-9]+/)),
      cap: new FormControl('', Validators.pattern(/^[0-9]+/)),
      price: new FormControl('', Validators.pattern(/^[0-9]+/))
  });

    this.datservice.getProductsList().subscribe((products) =>{
     // console.log(products);
     this.products = products;
    });

    this.datservice.getParametersList().subscribe((parameters) =>{
      this.parameters = parameters;
     });

    this.datservice.getKeys().subscribe((jointkeys) =>{
      this.jointkeys = jointkeys;
     });


  }

  spacelessWord(word,inter){

      let x:string[];
      x = word.split(" ");
      if(x.length >1){
        for(let j=0;j<x.length;j++){
          inter=inter.concat(x[j]);
        }
      }else{
        inter = x[0];
      }
      return inter.toLowerCase();

  }

  changeProd(prod){
   this.criteria_table.nativeElement.style.display = "";
   let inter:string="" ;
   let param_prod_array = [];
   let cri = [];
    console.log(prod );
    for(let i = 0;i<this.products.length;i++){
      if( this.products[i].id == prod){
        this.name = this.products[i].productName ;
        this.id = prod;
      }
    }

    for(let i = 0;i<this.jointkeys.length;i++){
      if( this.jointkeys[i].prod_key == prod){
        param_prod_array.push(this.jointkeys[i]) ;
      }
    }
    for(let j=0;j<param_prod_array.length;j++){
      for( let i=0;i<this.parameters.length;i++){
        if(this.parameters[i].key == param_prod_array[j].param_key){
          cri.push(this.parameters[j]);
        }
      }
    }

    for(let i=0;i<cri.length;i++){
      if(cri[i].type == "decimal"){
        cri[i].type = "number";
      }
      cri[i].newName = this.spacelessWord(cri[i].displayName,inter);
    }
    this.prodCriteras = cri;
  }


  onSubmit(){
    let prod:any = {};
    let param:any = [];
    let interWord ="";
    let val:string ="";
    //setting the product object
    prod.prod_id = this.id;
    prod.productName = this.name;
    this.report.products = prod;

    //setting the parameters object
    this.prodCriteras.forEach(element => {

      param.push({
        "key":element.key,
        "name":element.displayName,
        "value":this.myform.get(this.spacelessWord(element.displayName,interWord)).value
      });

   });

   this.report.parameters = param;

   console.log(this.report);
   // post request
   this.datservice.postRisk(this.report).subscribe((responseBody) =>{
    this.datservice.setSharedRiskValue(responseBody.risk_value);
    this.datservice.setSharedName(this.name);

     this.router.navigate(['/risk']);
   });

  }
}


interface Products{
id:any,
productName:string
}

interface Parameters{
  key:any,
  displayName:string,
  type:string
  }

interface Keys{
    prod_key:number,
    param_key:string,
    composed_key:any
  }

interface Risk{
     risk_value:number
  }
