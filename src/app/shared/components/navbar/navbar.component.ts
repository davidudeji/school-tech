import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isScrolled  = signal(false);
  menuOpen    = signal(false);
  activeLink  = signal('');

  navLinks = [
    { label: 'Features',   id: 'features',   href: '#features'   },
    { label: 'Modules',    id: 'modules',    href: '#modules'    },
    { label: 'Pricing',    id: 'pricing',    href: '#pricing'    },
    { label: 'Testimonials', id: 'testimonials', href: '#testimonials' },
    { label: 'FAQ',        id: 'faq',        href: '#faq'        },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  setActive(id: string) { this.activeLink.set(id); }
  toggleMenu()          { this.menuOpen.update((v) => !v); }
  closeMenu()           { this.menuOpen.set(false); }
}
