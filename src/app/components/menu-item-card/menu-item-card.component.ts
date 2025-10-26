import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu-item-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.css'
})
export class MenuItemCardComponent {
  @Input() item!: MenuItem;
  @Output() addToCart = new EventEmitter<MenuItem>();

  onAddToCart(): void {
    this.addToCart.emit(this.item);
  }
}

