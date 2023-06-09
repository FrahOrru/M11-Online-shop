import { Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { CartItem } from '../../interfaces/cart.interfece';
import { APP_CONFIG_TOKEN, AppConfig } from 'src/config';
import { LanguageService } from './language.service';

@Injectable()
export class ProductService {
  private allProductsSubject = new BehaviorSubject<Product[][]>([]);

  public cart$: Observable<CartItem[]>;
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  public products$: Observable<Product[]>;
  private productsSubject = new BehaviorSubject<Product[]>([]);

  public loading$: Observable<boolean>;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public currentPage$: Observable<number>;
  private currentPageSubject = new BehaviorSubject<number>(0);

  public activeTab$: Observable<string>;
  private activeTabSubject = new BehaviorSubject<string>('All');

  public pages$: Observable<number>;
  private pagesSubject = new BehaviorSubject(1);

  public categories$: Observable<string[]>;
  private categoriesSubject = new BehaviorSubject<string[]>(['All']);

  public countries$: Observable<any[]>;
  private countiresSubject = new BehaviorSubject<any[]>([]); 

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig,
    private languageService: LanguageService) {

    this.cart$ = this.cartSubject.asObservable();
    this.products$ = this.productsSubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();
    this.currentPage$ = this.currentPageSubject.asObservable();
    this.activeTab$ = this.activeTabSubject.asObservable();
    this.pages$ = this.pagesSubject.asObservable();
    this.categories$ = this.categoriesSubject.asObservable();
    this.countries$ = this.countiresSubject.asObservable();

  }

  getData() {
    this.languageService.language$.subscribe((language) => {
      if(language) {
        this.http.get<Product[]>(this.config.getDataSourceURL(language)).subscribe((products) => {
          if(products) {
            this.categoriesSubject.next(['All'])
            this.getCategories(products);
    
            this.loading();        
            this.allProductsSubject.next(this.divideArray(products));
    
            this.productsSubject.next(this.allProductsSubject.getValue()[this.currentPageSubject.getValue()])
          }
        });
      }
    })
  }

  getCategories(products: Product[]) {
    let cat = [...this.categoriesSubject.getValue()];

    products.map((product) => {
      if(!cat.some((cat) => cat === product.category)) {
        cat.push(product.category);
      }
    })
    this.categoriesSubject.next(cat);
  }

  addToCart(newProduct: Product) {
    const currentCart: CartItem[] =  this.cartSubject.getValue();
    let quantity = (currentCart.find((cart) => cart.product.id === newProduct.id)?.quantity ?? 0) + 1;
    let tmpCart: CartItem[] = [];

    if(!currentCart.some((item) => item.product.id === newProduct.id)) {

      tmpCart = [...this.cartSubject.getValue(),
        { product: newProduct,
          quantity}
      ]

    } else {

      tmpCart = this.cartSubject.getValue().map((item) => {
        if(item.product.id === newProduct.id) {
          return {
            ...item,
            quantity: quantity
          }
        }
          return item;
      })

    }

    this.cartSubject.next(tmpCart);
  }

  deleteFromCart(id: number) {
    let tmpCart: CartItem[] = [...this.cartSubject.getValue()]
    tmpCart = tmpCart.filter(item => item.product.id !== id)
    this.cartSubject.next(tmpCart);
  }

  filterProducts(category?: string, keyword?: string) {

    if(keyword && keyword.length > 3 || !keyword) this.loading()

    if(category) {

      this.activeTabSubject.next(category);
      this.filterByCategory();

    } else if(keyword && keyword.length > 3) {

      this.filterByCategory()

      const regex: RegExp = new RegExp(keyword, "gi");
      this.productsSubject.next(this.productsSubject.getValue().filter((product) => regex.test(product.title)));

    } else if (!category && !keyword) {
      this.filterByCategory();
    }
  }

  divideArray(products: any[]): any[][] {
    this.pagesSubject.next(Math.ceil(products.length / this.config.pageElement));
    let tmp: any[][] = [];

    for (let i = 0; i < products.length; i += this.config.pageElement) {
      tmp.push(products.slice(i, i + this.config.pageElement));
    }
  
    return tmp;
  }

  changePage(newPage:  number) {
    this.currentPageSubject.next(newPage);
    this.filterProducts();
  }

  private loading() {
    this.loadingSubject.next(true);

    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 1000)
  }

  checkout(formValues: any) {}

  fetchCountries() {
    this.http.get<any[]>(this.config.countriesSourceURL).subscribe((countries) => {
      if(countries) {
        this.countiresSubject.next(this.sortAlphabetically(countries.map(x => x.name.common)))
      }
    });
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  private sortAlphabetically(array: string[]): string[] {
    return array.sort((a, b) => a.localeCompare(b));
  }

  private filterByCategory() {
    if(this.activeTabSubject.getValue() === 'All') {

      this.productsSubject.next(this.allProductsSubject.getValue()[this.currentPageSubject.getValue()]);

    } else {

      this.productsSubject.next(
        this.allProductsSubject.getValue()[this.currentPageSubject.getValue()]
          .filter((product) => 
            product.category === this.activeTabSubject.getValue()
            )
        )

    }
  }
}