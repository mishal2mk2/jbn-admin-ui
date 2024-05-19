import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  // Pagination variables
  currentPage = 1;
  itemsPerPage = 20;
  searchTerm = ''; // Variable to store the search term

  users = [
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'HR',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'MD',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'GM',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'OM',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'PM',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'SV',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'WR',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'CU',
    },
    {
      name: 'Salmanul Fariz',
      username: 'salman',
      phone: '84928492923',
      role: 'US',
    },
  ];

  ngOnInit(): void {}

  // Function to get the current page of users
  getCurrentPageUsers() {
    const filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phone
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }
}
