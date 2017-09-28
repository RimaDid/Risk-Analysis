import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {
  name:string;
  risk:string;
  constructor(private datservice:DataService, private router:Router) {
    this.name = this.datservice.getSharedName();
    this.risk = this.datservice.getSharedRiskValue();
    if((this.name =="")&&(this.risk == "")){
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
  }

}
