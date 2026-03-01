import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  navList = [
    { title: 'Home', href: '/home' },
    { title: 'Projects', href: '/projects' },
    { title: 'About', href: '/about' },
  ];
}
