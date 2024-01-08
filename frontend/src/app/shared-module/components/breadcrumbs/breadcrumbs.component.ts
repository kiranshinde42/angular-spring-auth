import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  menuItems = [];
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Breadcrumb
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
        },
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '#',
    breadcrumbs = []
  ) {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label =
        child.snapshot.data[BreadcrumbsComponent.ROUTE_DATA_BREADCRUMB];
      if (typeof label !== 'undefined' && label !== null) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
