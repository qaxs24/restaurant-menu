import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-filter',
  imports: [CommonModule, MatIconModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string | null = null;
  @Output() categorySelected = new EventEmitter<string | null>();

  private categoryIcons: Record<string, string> = {
    'Перші страви': 'soup_kitchen',
    'Салати': 'eco',
    'Паста': 'ramen_dining',
    'Піца': 'local_pizza',
    'Основні страви': 'dinner_dining',
    'Десерти': 'cake',
    'Напої': 'local_cafe'
  };

  onCategoryClick(category: string | null): void {
    this.categorySelected.emit(category);
  }

  isSelected(category: string | null): boolean {
    return this.selectedCategory === category;
  }

  getCategoryIcon(category: string): string {
    return this.categoryIcons[category] || 'restaurant';
  }
}

