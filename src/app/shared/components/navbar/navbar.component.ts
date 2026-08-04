// navbar.component.ts
import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    // Track whether the page has been scrolled down
    isScrolled = signal(false);

    // Tracks active state for links (defaults to empty string or a default route)
    activeLink = signal('products');

    // Simple array to keep template DRY
    navLinks = [
        { label: 'Products', id: 'products' },
        { label: 'Pricing', id: 'pricing' },
        { label: 'Contacts', id: 'contacts' },
        { label: 'Blog', id: 'blog' },
        { label: 'Community', id: 'community' }
    ];

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // If user scrolls past 20px, apply the glassmorphic state
        this.isScrolled.set(window.scrollY > 20);
    }

    setActive(id: string) {
        this.activeLink.set(id);
    }
}
