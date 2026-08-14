import {



  Component,



  OnInit,



  OnDestroy



} from '@angular/core';







import { CommonModule } from '@angular/common';







import {



  ReactiveFormsModule,



  FormBuilder,



  FormGroup,



  Validators



} from '@angular/forms';







import { RouterLink, Router } from '@angular/router';







import { UserService } from '../../services/user.service';







@Component({



  selector: 'app-user-master-login',



  standalone: true,



  imports: [



    CommonModule,



    ReactiveFormsModule,



    RouterLink



  ],



  templateUrl: './user-master-login.component.html',



  styleUrl: './user-master-login.component.scss'



})







export class UserMasterLoginComponent



implements OnInit, OnDestroy {







  sidebarOpen = false;







  mode: 'list' | 'edit' | 'add' = 'list';







  users: any[] = [];







  selectedUser: any = this.initializeForm();







  userForm!: FormGroup;







  showPassword = false;







  searchText = '';







  constructor(



    private fb: FormBuilder,



    private router: Router,



    private userService: UserService



  ) {}



ngOnInit(): void {







  this.userForm = this.fb.group({







    username: ['', Validators.required],







    email: ['', Validators.required],







    team: ['', Validators.required],







    status: ['Active', Validators.required],







    password: ['', Validators.required]







  });







  console.log("User Master Loaded");







  this.getUsers();







}







getUsers(): void {







  this.userService.getUsers().subscribe({







    next: (response: any) => {







      this.users = response;







    },







    error: (error: any) => {







      console.log(error);







    }







  });







}







saveUser(): void {







  console.log(this.userForm.value);







  console.log(this.userForm.get('username')?.value);







  console.log(this.userForm.valid);







  if (this.userForm.invalid) {







    this.userForm.markAllAsTouched();







    alert("Please fill all required fields");







    return;







  }







  const formValue = this.userForm.value;

  const payload = {
    username: formValue.username,
    email: formValue.email,
    team: formValue.team,
    status: formValue.status,
    password: formValue.password || undefined
  };

  const request = this.mode === 'edit' && this.selectedUser?.id
    ? this.userService.updateUser(this.selectedUser.id, payload)
    : this.userService.addUser(payload);

  request.subscribe({
    next: () => {
      alert("User Saved Successfully");
      this.getUsers();
      this.backToList();
    },
    error: (error: any) => {
      console.log(error);
      alert(error?.error?.message || error?.message || "Failed to save user");
    }
  });







}



initializeForm() {



  return {



    id: '',



    username: '',



    email: '',



    team: '',



    status: 'Active',



    password: ''



  };



}



openAdd(): void {



  this.selectedUser = {



    id: 'USR-' + String(this.users.length + 1).padStart(3, '0'),



    username: '',



    email: '',



    team: '',



    status: 'Active',



    password: ''



  };



  this.userForm.reset({



    username: '',



    email: '',



    team: '',



    status: 'Active',



    password: ''



  });



  this.showPassword = false;



  this.mode = 'add';



}



openView(user: any): void {



  this.selectedUser = { ...user };



  this.userForm.patchValue({



    username: user.username,



    email: user.email,



    team: user.team,



    status: user.status,



    password: user.password



  });



  this.showPassword = false;



  this.mode = 'edit';



}



backToList(): void {



  this.selectedUser = this.initializeForm();



  this.userForm.reset({



    username: '',



    email: '',



    team: '',



    status: 'Active',



    password: ''



  });



  this.showPassword = false;



  this.mode = 'list';



}

deleteUser(id: string): void {



  if (!confirm("Are you sure you want to delete this user?")) {
    return;
  }



  this.userService.deleteUser(id).subscribe({



    next: () => {



      this.getUsers();



      alert("User Deleted Successfully");



    },



    error: (error: any) => {



      console.log(error);



    }



  });



}



filteredUsers() {



  if (!this.searchText) {



    return this.users;



  }



  return this.users.filter(user =>



    user.username.toLowerCase().includes(this.searchText.toLowerCase()) ||



    user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||



    user.team.toLowerCase().includes(this.searchText.toLowerCase())



  );



}



searchUser(): void {



  console.log(this.searchText);



}



toggleSidebar(): void {



  this.sidebarOpen = !this.sidebarOpen;



}



closeSidebar(): void {



  this.sidebarOpen = false;



}



toggleShowPassword(): void {



  this.showPassword = !this.showPassword;



}



report(): void {



  window.print();



}



goBackToLogin(): void {



  this.router.navigate(['/login']);



}



ngOnDestroy(): void {



  console.log("Component Destroyed");



}}