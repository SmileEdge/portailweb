import { Component, OnInit, Input } from '@angular/core';
import User from '../../model/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { forkJoin, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {EditUserComponent} from '../../edit-user/edit-user.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() currentUser: User;
  isAdmin: boolean;
  isEmploye: boolean;
  onModif = false;
  // currentUser: User;

  constructor(private userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit() {
    forkJoin(
      this.userService.isAdmin(),
      this.userService.isEmploye()
    )
      .subscribe(([admin, employe]) => {
        this.isAdmin = admin;
        this.isEmploye = employe;
      });
  }

  isCurrentUser() {
    return (this.user.email === this.currentUser.email);
  }

  modification() {
    this.dialog.open(EditUserComponent);
  }

}
