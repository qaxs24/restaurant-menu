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
    // Перші страви
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
      name: 'Мінестроне',
      description: 'Італійський овочевий суп з пастою та пармезаном',
      price: 110,
      category: 'Перші страви',
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'
    },
    {
      id: 3,
      name: 'Крем-суп з грибів',
      description: 'Ніжний крем-суп із шампіньйонів з вершками та трюфельною олією',
      price: 130,
      category: 'Перші страви',
      imageUrl: 'https://zelenasadyba.com.ua/wp-content/uploads/2023/03/krem-sup-z-grybamy-10.jpg'
    },

    // Салати
    {
      id: 4,
      name: 'Салат Цезар',
      description: 'Класичний салат з куркою, пармезаном та сухариками',
      price: 150,
      category: 'Салати',
      imageUrl: 'https://images.unian.net/photos/2019_12/thumb_files/1200_0_1577182092-7643.jpg'
    },
    {
      id: 5,
      name: 'Капрезе',
      description: 'Італійський салат з томатами, моцарелою та базиліком',
      price: 140,
      category: 'Салати',
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800'
    },
    {
      id: 6,
      name: 'Грецький салат',
      description: 'Свіжі овочі з сиром фета та оливками',
      price: 120,
      category: 'Салати',
      imageUrl: 'https://images.unian.net/photos/2019_12/thumb_files/1200_0_1577273929-5877.jpg'
    },
    {
      id: 7,
      name: 'Салат з тунцем',
      description: 'Мікс салатів з тунцем, яйцем та оливками',
      price: 180,
      category: 'Салати',
      imageUrl: 'https://images.unian.net/photos/2023_02/thumb_files/1200_0_1677438237-1356.jpg'
    },

    // Паста
    {
      id: 8,
      name: 'Карбонара',
      description: 'Класична італійська паста з беконом, яйцем та пармезаном',
      price: 180,
      category: 'Паста',
      imageUrl: 'https://myastoriya.com.ua/upload/iblock/153/m7tqlwgeqe40p1v6v1zjpb59ztce5843.jpg'
    },
    {
      id: 9,
      name: 'Болоньєзе',
      description: 'Спагеті з м\'ясним соусом за традиційним рецептом',
      price: 170,
      category: 'Паста',
      imageUrl: 'https://i.obozrevatel.com/food/recipemain/2018/12/29/item4162.jpg?size=636x424'
    },
    {
      id: 10,
      name: 'Феттучіні Альфредо',
      description: 'Паста у вершковому соусі з пармезаном та куркою',
      price: 190,
      category: 'Паста',
      imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800'
    },
    {
      id: 11,
      name: 'Песто Дженовезе',
      description: 'Паста з домашнім соусом песто, кедровими горіхами та пармезаном',
      price: 175,
      category: 'Паста',
      imageUrl: 'https://static.tildacdn.com/tild3865-3535-4262-a535-613838616633/_13.png'
    },
    {
      id: 12,
      name: 'Лазанья класична',
      description: 'Шарова паста з м\'ясним рагу, бешамелем та моцарелою',
      price: 210,
      category: 'Паста',
      imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800'
    },

    // Піца
    {
      id: 13,
      name: 'Маргарита',
      description: 'Класична піца з томатним соусом, моцарелою та базиліком',
      price: 160,
      category: 'Піца',
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800'
    },
    {
      id: 14,
      name: 'Пепероні',
      description: 'Піца з гострою салямі пепероні та моцарелою',
      price: 190,
      category: 'Піца',
      imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800'
    },
    {
      id: 15,
      name: 'Кватро Формаджі',
      description: 'Піца чотири сири: моцарела, горгонзола, пармезан, таледжіо',
      price: 220,
      category: 'Піца',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
    },
    {
      id: 16,
      name: 'Прошуто е Рукола',
      description: 'Піца з прошуто, руколою та пармезаном',
      price: 230,
      category: 'Піца',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800'
    },

    // Основні страви
    {
      id: 17,
      name: 'Стейк Рібай',
      description: 'Соковитий стейк з яловичини преміум класу 300г',
      price: 450,
      category: 'Основні страви',
      imageUrl: 'https://static.tildacdn.com/tild3438-3565-4664-b739-633639313432/rib.jpg'
    },
    {
      id: 18,
      name: 'Вареники з картоплею',
      description: 'Домашні вареники з картоплею та смаженою цибулею',
      price: 95,
      category: 'Основні страви',
      imageUrl: 'https://loft1.te.ua/wp-content/uploads/2023/04/dsc08949-min-scaled-e1681774675369.jpg'
    },
    {
      id: 19,
      name: 'Оссобуко',
      description: 'Тушкована телятина по-мілански з гремолатою',
      price: 380,
      category: 'Основні страви',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800'
    },
    {
      id: 20,
      name: 'Різото з грибами',
      description: 'Кремове різото з білими грибами та пармезаном',
      price: 195,
      category: 'Основні страви',
      imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800'
    },
    {
      id: 21,
      name: 'Лосось на грилі',
      description: 'Філе лосося з овочами на грилі та лимонним соусом',
      price: 320,
      category: 'Основні страви',
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800'
    },
    {
      id: 22,
      name: 'Курка Парміджана',
      description: 'Куряче філе в паніровці з томатним соусом та моцарелою',
      price: 240,
      category: 'Основні страви',
      imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800'
    },

    // Десерти
    {
      id: 23,
      name: 'Тірамісу',
      description: 'Класичний італійський десерт з маскарпоне та кавою',
      price: 95,
      category: 'Десерти',
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800'
    },
    {
      id: 24,
      name: 'Чізкейк',
      description: 'Ніжний десерт з вершкового сиру з ягідним соусом',
      price: 85,
      category: 'Десерти',
      imageUrl: 'https://la-torta.ua/content/uploads/images/12-cake.jpg'
    },
    {
      id: 25,
      name: 'Панна Котта',
      description: 'Італійський вершковий десерт з ванільним соусом',
      price: 80,
      category: 'Десерти',
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800'
    },
    {
      id: 26,
      name: 'Канолі',
      description: 'Сицилійські трубочки з рікотою та шоколадом',
      price: 75,
      category: 'Десерти',
      imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800'
    },
    {
      id: 27,
      name: 'Джелато',
      description: 'Італійське морозиво: ванільне, шоколадне, фісташкове (3 кульки)',
      price: 70,
      category: 'Десерти',
      imageUrl: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=800'
    },

    // Напої
    {
      id: 28,
      name: 'Узвар',
      description: 'Традиційний напій із сухофруктів',
      price: 30,
      category: 'Напої',
      imageUrl: 'https://vechirniy.kyiv.ua/uploads/2022/01/06/uzvar_4.jpg'
    },
    {
      id: 29,
      name: 'Еспресо',
      description: 'Класична італійська кава',
      price: 40,
      category: 'Напої',
      imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800'
    },
    {
      id: 30,
      name: 'Капучіно',
      description: 'Еспресо з молочною пінкою',
      price: 55,
      category: 'Напої',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg'
    },
    {
      id: 31,
      name: 'Лимонад домашній',
      description: 'Свіжий лимонад з м\'ятою та лаймом',
      price: 50,
      category: 'Напої',
      imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800'
    },
    {
      id: 32,
      name: 'Апероль Шпріц',
      description: 'Класичний італійський коктейль з Aperol та просеко',
      price: 120,
      category: 'Напої',
      imageUrl: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800'
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

