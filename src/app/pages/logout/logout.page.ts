import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor( private router: Router,
               public data: DataLocalService ) { }

  ngOnInit() {
  }

  doLogout() {
    this.data.logeado = false;
    this.router.navigate( ['/'] );
  }
}
