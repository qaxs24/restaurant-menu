import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-category-filter',
  imports: [CommonModule, MatChipsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string | null = null;
  @Output() categorySelected = new EventEmitter<string | null>();

  onCategoryClick(category: string | null): void {
    this.categorySelected.emit(category);
  }

  isSelected(category: string | null): boolean {
    return this.selectedCategory === category;
  }
}

