import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../user.interface';



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
  users :IUser[]=[]

  constructor(private userService: ServiceService, private toastr:ToastrService) { }

  ngOnInit(): void {
    //Load UserList
    this.userService.getUserLIst().subscribe({
      next:(data:{data:IUser[]})=>{
        this.users = data.data;
      },
      error:err=>{
        this.toastr.error(err.error.message,"Error");
      }
    }
    )
  }

  // Function to get the current page of users
  getCurrentPageUsers() {
    const filteredUsers = this.users.filter(
      (user) =>{
        return (user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.mobile.toString().toLowerCase()
        .includes(this.searchTerm.toLowerCase()))
        
    });

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }

  blockUser(id:string){
    this.userService.blockUser(id).subscribe({
      next:(data)=>{
        this.users = this.users.map((user)=>{
          if(user._id===id){
            user.isBlocked=true;
          }
          return user;
        });
        this.toastr.success(`User Blocked`,'Success')
      },
      error:err=>{
        this.toastr.error('Error when blocking user','Failed');
      }
    })
  }
  unBlockUser(id:string){
    this.userService.unBlockUser(id).subscribe({
      next:(data)=>{
        this.users = this.users.map((user)=>{
          if(user._id===id){
            user.isBlocked=false;
          }
          return user;
        });
        this.toastr.success(`User unblocked`,'Success')
        
      },
      error:err=>{
        this.toastr.error('Error when unblocking user','Failed');
      }
    })
  }
  roleChange(event:Event,id:string){
    const target = event.target as HTMLSelectElement;
    const {value} = target;
    this.userService.updateUser(id,value).subscribe({
      next:data => {
        this.users = this.users.map((user)=>{
          if(user._id===id){
            user.role = value;
          }
            return user;
        })
        this.toastr.success(`Successfully changed user role to ${value}`,'Success')
      },
      error:err=>{
        this.toastr.error('Error when changing role','Role not changed')
      }
    })


    
  }
}
