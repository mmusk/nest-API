import { Injectable, NotFoundException } from '@nestjs/common';

import { Products } from './products.model';
import { log } from 'console';

@Injectable()
export class ProductsService {
  private products: Products[] = [];

  insertProduct(title: string, description: string, price: number) {
    const id = Math.random().toString();
    const newProduct = new Products(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(productId: string): [Products, number] {
    const productIndex = this.products.findIndex(
      (prodId) => prodId.id === productId,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find Product');
    }
    return [product, productIndex];
  }
}
