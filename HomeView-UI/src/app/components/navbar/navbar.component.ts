import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { ProfilePhoto } from 'src/app/models/profile-photo/profile-photo.model';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',
  '../../../styles.css'],
})

export class NavbarComponent implements OnInit {
  constructor(
    public accountService: AccountService, 
    private router: Router, 
    private photoService: PhotoService) {}

  photo: ProfilePhoto;

  ngOnInit(): void {
    if(this.accountService.isLoggedIn()){
      this.photoService.get(this.accountService.currentUserValue.userId).subscribe(userPhoto => {
        this.photo = userPhoto;
      });
    }
  }
  
  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
