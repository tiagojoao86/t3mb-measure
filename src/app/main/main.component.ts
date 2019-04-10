import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { BreadCrumb } from '../auth/breadcrumb';
import { SysFunction } from '../auth/sysfunction';
import { UsersService } from '../registration/users/users.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Role } from '../auth/role';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //mainMenu: Array<SysFunction>;
  menu: MenuItem[] = [];
  items: MenuItem[] = [];
  home: MenuItem = {icon: 'pi pi-home'};
  
  urls: Array<BreadCrumb> = new Array<BreadCrumb>();
  nextUrl: string = '';
  

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.createMenu();    
    
    this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        //this.urls = new Array<BreadCrumb>();
        this.items = [];
        this.nextUrl = '';      
        this.fillBreadCrumb(this.activatedRoute);
      })
  }

  createSubItems(sysFunctions: Array<SysFunction>): MenuItem[] {
    let items: MenuItem[] = [];
    sysFunctions.forEach(sysFunction => {
      items.push(
        {
          label: sysFunction.name,
          routerLink: sysFunction.url
        }
      );
    });

    return items;
  }

  createItems(sysFunctions: Array<SysFunction>): MenuItem[] {
    let items: MenuItem[] = [];
    sysFunctions.forEach(sysFunction => {
      items.push(
        {
          label: sysFunction.name,
          items: this.createSubItems(sysFunction.subFunctions)          
        }
      );
    });
    return items;
  }

  createMenu() {
    let allFunctions: Array<SysFunction> = new Array<SysFunction>();
    this.authService.getLoggedUser().roles.forEach(role => {
      role.sysFunctions.forEach(sysFunction => {
        allFunctions.push(sysFunction);
      });      
    });
    this.menu = [
      {
        label: 'Menu',
        items: [this.createItems(allFunctions)]
      }
    ];
    this.menu.push(
      {
        label: '', icon: 'pi pi-user', 
        items: [
          [
            {
              label: 'Opções',
              items: [{
                label: 'Sair',
                command: () => this.onLogout()
              }]
              
            }
          ]
        ]
    });

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
    });    
    
    breadcrumb.url = this.nextUrl;
    this.items.push({label:breadcrumb.label, routerLink: breadcrumb.url});
    //this.urls.push(breadcrumb);
    if (activatedRoute.children.length > 0 ) {      
      this.fillBreadCrumb(activatedRoute.children[0]);
    }
  }

  onLogout() {    
    this.authService.loggedUser = null;
    this.router.navigate(['/login']);
  }
}
