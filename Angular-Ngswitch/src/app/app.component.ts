import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-Ngswitch';

   tab:string="";
   onInfoClick(){
    this.tab="info";
   }
   onServiceClick(){
    this.tab="service";
   }

   onPrivacyClick(){
    this.tab="priavcy";
   }

   onUserClick(){
    this.tab="user";
   }



}
