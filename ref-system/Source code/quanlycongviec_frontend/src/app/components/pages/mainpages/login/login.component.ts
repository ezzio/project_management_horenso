import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {TasksService} from '../../../../_services/data/tasks.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private taskService: TasksService) { }
  username: string;
  password: string;
  message: string;
  isWarning = false;
  subcription: Subscription;
  isLog: boolean;
  rmsg: any;
  ngOnInit() {
    this.message = 'Some message goes here';
  }

  setClassToMessage(){
    return this.isWarning === true ? 'text-danger text-center' : 'text-success text-center';
  }

  login(){
    const content = {
      user: this.username,
      password: this.password
    };
    // @ts-ignore
    this.taskService.getLogin(content).subscribe((res) => {
      // @ts-ignore
      const r = res.status;
      // @ts-ignore
      const m = res.msg;
      // @ts-ignore
      const userMail = res.data;
      if (r === 1) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('getUser', userMail);
        this.router.navigate(['/api/kpi/board']);
        this.isLog = true;
        this.rmsg = m;
      }
      else {
        this.message = m;
        this.username = '';
        this.password = '';
      }
    });
  }

  // login() {
  //     console.log('aaaaa');
  //     this.checkAccount();
  //     // if (this.isLog !== undefined){
  //     //   console.log('undedsafsdf');
  //     //   if (this.isLog === true) {
  //     //     sessionStorage.setItem('isLoggedIn', 'true');
  //     //     this.router.navigate(['/api/kpi/board']);
  //     //     // localStorage.setItem('isLoggedIn', 'true')
  //     //     console.log(localStorage);
  //     //   }
  //     //   else {
  //     //     // @ts-ignore
  //     //     this.username = '';
  //     //     this.password = '';
  //     //   }
  //     // }
  //     // console.log(this.isLog);
  //     // console.log(this.rmsg);
  // }

  // login(){
  //   if (this.isLogin()){
  //     this.router.navigate(['/api/kpi/board']);
  //   }
  // }


  isNullOrUndifined(val: any){
    if (val == null || val === undefined){
      return true;
    }
    return false;
  }
}
//
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { TasksService } from '../../../../_services/data/tasks.service';
// import { first } from 'rxjs/operators';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   loading = false;
//   username: any;
//   submitted = false;
//   isWarning = false;
//   error = '';
//
//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private taskService: TasksService) { }
//
//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }
//
//   setClassToMessage() {
//     return this.isWarning === true ? 'text-danger text-center' : 'text-success text-center';
//   }
//
//   // checkAccount(){
//   //   const content = {
//   //     user: this.username,
//   //     password: this.password
//   //   };
//   //   console.log(content);
//   //   this.taskService.getLogin(content).subscribe((res) => {
//   //     console.log(res);
//   //     // @ts-ignore
//   //     const r = res.status;
//   //     // @ts-ignore
//   //     const m = res.msg;
//   //     if (r === 1) {
//   //       this.isLog = true;
//   //       this.rmsg = m;
//   //     }
//   //     else {
//   //       this.isLog = false;
//   //       this.rmsg = m;
//   //     }
//   //   });
//   // }
//   get f() { return this.loginForm.controls; }
//
//   onSubmit() {
//     this.submitted = true;
//
//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }
//
//     this.loading = true;
//     this.taskService.getLogin(this.f.username.value, this.f.password.value)
//       .pipe(first())
//       .subscribe(
//         () => {
//           this.router.navigate(['/api/kpi/board']);
//         },
//         error => {
//           this.error = error;
//           this.loading = false;
//         });
//   }
//
//   // checkAccount() {
//   //   throw new Error('Method not implemented.');
//   // }
//
//   // login(){
//   //   if (this.isLogin()){
//   //     this.router.navigate(['/api/kpi/board']);
//   //   }
//   // }
//
//
//   //   isNullOrUndifined(val: any){
//   //     if (val == null || val === undefined){
//   //       return true;
//   //     }
//   //     return false;
//   //   }
// }
