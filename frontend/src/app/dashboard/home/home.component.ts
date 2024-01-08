import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Menu } from 'src/app/shared-module/interfaces/menu-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  menu: Menu = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      link: '/main/dashboard',
      color: '#3f51b5c7',
    },
    {
      title: 'Admin',
      icon: 'admin_panel_settings',
      color: '#ff4081',
      subMenu: [
        {
          title: 'Users',
          icon: 'group',
          link: '/main/admin/user',
          color: '#ff7f0e',
        },
        {
          title: 'Payment',
          icon: 'payments',
          color: '#ff7f0e',
          link: '/main/admin/payment',
        },
      ],
    },
    {
      title: 'Teams',
      icon: 'bar_chart',
      link: '/main/teams',
      color: '#ff7f0e',
    },
  ];
  username = JSON.parse(localStorage.getItem('user')).username;
  opened: boolean;
  private breakpointObserver = inject(BreakpointObserver);
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 60,
  });

  constructor(
    private _formBuilder: FormBuilder,
    public oidcSecurityService: OidcSecurityService
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.isHandset$.subscribe((res) => {
      this.opened = !res;
    });
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}
