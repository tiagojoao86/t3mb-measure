import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { BreadCrumb } from '../auth/breadcrumb';
import { SysFunction } from '../auth/sysfunction';
import { UsersService } from '../registration/users/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  mainMenu: Array<SysFunction>;
  
  urls: Array<BreadCrumb> = new Array<BreadCrumb>();
  nextUrl: string = '';
  

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService,
    private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit() {   
    this.mainMenu = new Array<SysFunction>();
    this.authService.getLoggedUser().roles.forEach(role => {
      role.sysFunctions.forEach(sysFunction => {
        this.mainMenu.push(sysFunction);
      })
    });    
    
    this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.urls = new Array<BreadCrumb>();
        this.nextUrl = '';      
        this.fillBreadCrumb(this.activatedRoute);
      })
  }

  fillBreadCrumb(activatedRoute: ActivatedRoute) {
    let breadcrumb: BreadCrumb = new BreadCrumb();
    breadcrumb.label = activatedRoute.snapshot.data.breadcrumb;
    
    activatedRoute.url.forEach(next => {
      if (next[0]) {        
        this.nextUrl += '/'+next[0].path;
      }
      else {        
        this.nextUrl += '';
      }
      
    })
    breadcrumb.url = this.nextUrl;
    this.urls.push(breadcrumb);
    if (activatedRoute.children.length > 0 ) {      
      this.fillBreadCrumb(activatedRoute.children[0]);
    }
  }

  onLogout() {    
    this.authService.loggedUser = null;
    this.router.navigate(['/login']);
  }

  
}
