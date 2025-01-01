
import { Component } from '@angular/core';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';  // <-- Import filter operator

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project Management App';
  isHomeCollapsed = false;
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.collapsedSubject.asObservable();
  pathTitle: string = '';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Accessing the route title initially
    this.updateTitle();

    // Listen for route changes and update the title dynamically
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });
  }
  updateTitle(): void {
    // Traverse to the activated route to get the title data
    const routeData = this.activatedRoute.snapshot.firstChild?.data;
    if (routeData && routeData['title']) {
      this.pathTitle = routeData['title'];
    }
  }
  navigateTo(route: string): void {
    this.isHomeCollapsed=!this.isHomeCollapsed
    this.router.navigate([route]);

  }
  goBackToHome() {
    this.isHomeCollapsed=!this.isHomeCollapsed
    this.router.navigate(['/']); // Navigates back to the home page
  }
}
