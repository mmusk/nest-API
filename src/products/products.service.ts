import { Injectable, NotFoundException } from '@nestjs/common';

import { Products } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Products>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const res = await newProduct.save();
    return res.id as string;
  }

  async getProducts() {
    const product = await this.productModel.find();
    return product.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const res = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (res.deletedCount === 0) {
      throw new NotFoundException('Could not find Product');
    }
  }

  private async findProduct(productId: string): Promise<Products> {
    let product;
    try {
      product = await this.productModel.findById(productId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Product');
    }
    if (!product) {
      throw new NotFoundException('Could not find Product');
    }
    return product;
  }
}
