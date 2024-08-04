import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { Products } from './products.model';

@Injectable()
export class ProductsService {
  private products: Products[] = [];

  insertProduct(title: string, description: string, price: number) {
    const id = new Date().toString();
    const desc = description;
    const newProduct = new Products(id, title, desc, price);
    this.products.push(newProduct);
    return { desc };
  }

  getProducts() {
    return [...this.products];
  }
}
