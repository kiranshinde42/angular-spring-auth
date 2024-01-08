import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/shared-module/interfaces/menu-item';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideMenuComponent {
  @Input() menu: Menu = [];

  constructor(private router: Router) {}

  isActiveSubMenu(subMenu) {
    let isActive = false;
    for (const iterator of subMenu) {
      if (iterator.link == this.router.url) {
        isActive = true;
      }
    }
    return isActive;
  }
}
