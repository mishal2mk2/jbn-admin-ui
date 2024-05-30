import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../helpers/service/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isHaveRoleAccess = false;

  constructor(private _CommonService: CommonService) {}

  ngOnInit(): void {
    this.roleBaseAccess();
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
}
