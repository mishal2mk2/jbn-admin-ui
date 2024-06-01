import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../helpers/service/common.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.css',
})
export class NavHeaderComponent implements OnInit {
  userDropdownOpen: boolean = false;
  isHaveRoleAccess = false;

  userName:string='-';
  userRole:string='-';

  constructor(
    private _AuthService: AuthService,
    private _CommonService: CommonService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.roleBaseAccess();
    this.getUserNameAndRole();
  }

  getUserNameAndRole(){
    const userData = this._CommonService.getAllUserData();
    if(userData){
      const {role,name} = userData;
      this.userName=name;
      this.userRole=role;
    }else{
      this.userName='-';
      this.userRole='-';
    }

  }

  // Set the role base section code
  roleBaseAccess() {
    const userData = this._CommonService.getAllUserData();
    if (userData) {
      const { role } = userData;
      this.isHaveRoleAccess =
        this._CommonService.MainAdminRoleArray.includes(role);
    }
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  navToCreate() {
    this.router.navigate(['/project/create']);
  }

  logout() {
    this._AuthService.clean();
    window.location.reload();
    this.router.navigate(['/auth/login']);
  }
}
