import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.user)
  }

  logout(): void {
    this.authService.signOut();
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
