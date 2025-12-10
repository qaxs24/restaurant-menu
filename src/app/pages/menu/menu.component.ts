import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { MenuItemCardComponent } from '../../components/menu-item-card/menu-item-card.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { CartService } from '../../services/cart.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule, 
    FormsModule,
    MenuItemCardComponent, 
    CategoryFilterComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private route = inject(ActivatedRoute);
  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Борщ український',
      description: 'Традиційний червоний борщ зі сметаною та пампушками',
      price: 120,
      category: 'Перші страви',
      imageUrl: 'https://images.unian.net/photos/2020_04/thumb_files/1000_545_1588081977-7108.jpg'
    },
    {
      id: 2,
      name: 'Вареники з картоплею',
      description: 'Домашні вареники з картоплею та смаженою цибулею',
      price: 95,
      category: 'Основні страви',
      imageUrl: 'https://loft1.te.ua/wp-content/uploads/2023/04/dsc08949-min-scaled-e1681774675369.jpg'
    },
    {
      id: 3,
      name: 'Салат Цезар',
      description: 'Класичний салат з куркою, пармезаном та сухариками',
      price: 150,
      category: 'Салати',
      imageUrl: 'https://images.unian.net/photos/2019_12/thumb_files/1200_0_1577182092-7643.jpg'
    },
    {
      id: 4,
      name: 'Стейк Рібай',
      description: 'Соковитий стейк з яловичини преміум класу',
      price: 450,
      category: 'Основні страви',
      imageUrl: 'https://static.tildacdn.com/tild3438-3565-4664-b739-633639313432/rib.jpg'
    },
    {
      id: 5,
      name: 'Чізкейк',
      description: 'Ніжний десерт з вершкового сиру',
      price: 85,
      category: 'Десерти',
      imageUrl: 'https://la-torta.ua/content/uploads/images/12-cake.jpg'
    },
    {
      id: 6,
      name: 'Узвар',
      description: 'Традиційний напій із сухофруктів',
      price: 30,
      category: 'Напої',
      imageUrl: 'https://vechirniy.kyiv.ua/uploads/2022/01/06/uzvar_4.jpg'
    }
  ];

  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  searchQuery = signal('');
  selectedCategory = signal<string | null>(null);

  categories = computed(() => {
    const cats = [...new Set(this.menuItems.map(item => item.category))];
    return cats.sort();
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.selectedCategory.set(category);
      }
    });
  }

  filteredItems = computed(() => {
    let items = this.menuItems;
    
    const category = this.selectedCategory();
    if (category) {
      items = items.filter(item => item.category === category);
    }
    
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    return items;
  });

  onCategorySelected(category: string | null): void {
    this.selectedCategory.set(category);
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  onAddToCart(item: MenuItem): void {
    this.cartService.addToCart(item);
    this.snackBar.open(`${item.name} додано до кошика`, 'Ок', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}

