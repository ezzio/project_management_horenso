import { Component, OnInit } from '@angular/core';
import {SocialLoginService} from '../../../../_services/auth/sociallogin.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navigation-guest',
  templateUrl: './navigation-guest.component.html',
  styleUrls: ['./navigation-guest.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class NavigationGuestComponent implements OnInit {
  menuState = 'out';
  mobile = false;
  constructor(private socialLoginService: SocialLoginService) { }
  ngOnInit(): void {
    if (window.location.href.includes('mobile')){
      this.mobile = true;
    }
  }
  get userName(){
    return this.socialLoginService.getUsernameSocial();
  }
  logout(){
    this.socialLoginService.signOut();
  }
  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
