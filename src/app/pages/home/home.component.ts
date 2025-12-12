import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private cartService = inject(CartService);

  popularDishes: MenuItem[] = [
    {
      id: 1,
      name: 'Борщ український',
      description: 'Традиційний червоний борщ зі сметаною та пампушками',
      price: 120,
      category: 'Перші страви',
      imageUrl: 'https://images.unian.net/photos/2020_04/thumb_files/1000_545_1588081977-7108.jpg'
    },
    {
      id: 4,
      name: 'Салат Цезар',
      description: 'Класичний салат з куркою, пармезаном та сухариками',
      price: 150,
      category: 'Салати',
      imageUrl: 'https://images.unian.net/photos/2019_12/thumb_files/1200_0_1577182092-7643.jpg'
    },
    {
      id: 8,
      name: 'Карбонара',
      description: 'Класична італійська паста з беконом, яйцем та пармезаном',
      price: 180,
      category: 'Паста',
      imageUrl: 'https://myastoriya.com.ua/upload/iblock/153/m7tqlwgeqe40p1v6v1zjpb59ztce5843.jpg'
    },
    {
      id: 14,
      name: 'Стейк Рібай',
      description: 'Соковитий стейк з мармурової яловичини з овочами гриль',
      price: 420,
      category: 'Основні страви',
      imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800'
    }
  ];

  addToCart(dish: MenuItem) {
    this.cartService.addToCart(dish);
  }
}

