import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item.model';
import { MenuItemCardComponent } from '../../components/menu-item-card/menu-item-card.component';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, MenuItemCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
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

  onAddToCart(item: MenuItem): void {
    console.log('Added to cart:', item);
    // Тут буде логіка додавання в кошик
  }
}

