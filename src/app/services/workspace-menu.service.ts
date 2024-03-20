import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class WorkspaceMenuService {
  sidebarIsHidden: boolean = false;


  toggleSidebarService() {
    this.sidebarIsHidden = !this.sidebarIsHidden;
  }
}
