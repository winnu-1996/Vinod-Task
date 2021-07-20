import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SendRecieveService } from '../services/send-recieve.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public usersList:any =[];
  public userId:string;
  userListdestroy$: Subject<boolean> = new Subject<boolean>();
  public userDetails={};

  constructor(private sendRecieveService:SendRecieveService,
    private activatedRoute:ActivatedRoute) {
    this.getUsersList();
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  
  }

  /* Method : Get List of User from API Port 
   Action : Stroing the data from server */

   getUsersList(){
    this.sendRecieveService.getData().pipe(takeUntil(this.userListdestroy$)).subscribe((userData:any)=>{
       this.usersList = userData.data;
       this.getUserData();
    })
  }

  getUserData(){
  this.userDetails =  this.usersList.find(x=>
     x.id === Number(this.userId)
  );
  }

}
