import { Component, OnInit ,OnDestroy} from '@angular/core';
import { SendRecieveService } from '../services/send-recieve.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy{

  public usersList:any =[];
  userListdestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private sendRecieveService:SendRecieveService,
    private router:Router) { }

  ngOnInit() {
    this.getUsersList();
  }


/* Method : Get List of User from API Port 
   Action : Stroing the data from server */

  getUsersList(){
    this.sendRecieveService.getData().pipe(takeUntil(this.userListdestroy$)).subscribe((userData:any)=>{
       this.usersList = userData.data;
    })
  }
/* Method : Navigate method
   Action : Takes us to sepcific user details page */
  navigateToUserDetails(userId){
    this.router.navigate(['user',userId]);
  } 

  ngOnDestroy() {
    this.userListdestroy$.next(true);
    // Unsubscribe from the subject
    this.userListdestroy$.unsubscribe();
  }

}
