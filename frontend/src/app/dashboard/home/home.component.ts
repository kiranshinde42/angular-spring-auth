import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Menu } from 'src/app/shared-module/interfaces/menu-item';
import { DashboardService } from '../services/dashboard.service';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';

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
    public oidcSecurityService: OidcSecurityService,
    private dashboardService: DashboardService,
    private snackBarService: SnackBarService
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

    this.getMenus();
  }

  getMenu(title, color, path, icon) {
    return {
      title: title,
      color: color,
      link: path,
      icon: icon,
    };
  }

  getMenus() {
    this.dashboardService.getMenus().subscribe({
      next: (menus) => {
        this.menu = [];
        for (const menu of menus as []) {
          if (!menu['subTitle']) {
            this.menu.push(
              this.getMenu(
                menu['title'],
                menu['color'],
                menu['path'],
                menu['icon']
              )
            );
          } else {
            let isMenuCreatedAlreday = false;
            for (let final of this.menu) {
              if (final['title'] == menu['title']) {
                isMenuCreatedAlreday = true;
                final['subMenu'].push(
                  this.getMenu(
                    menu['subTitle'],
                    menu['subColor'],
                    menu['subLink'],
                    menu['subIcon']
                  )
                );
                break;
              }
            }
            if (!isMenuCreatedAlreday) {
              this.menu.push({
                title: menu['title'],
                color: menu['color'],
                link: menu['path'],
                icon: menu['icon'],
                subMenu: [
                  this.getMenu(
                    menu['subTitle'],
                    menu['subColor'],
                    menu['subLink'],
                    menu['subIcon']
                  ),
                ],
              });
            }
          }
        }
      },
      error: (err) => {
        this.snackBarService.openSnackBar(
          err?.error?.title + ': ' + err?.error?.detail
        );
      },
    });
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}
