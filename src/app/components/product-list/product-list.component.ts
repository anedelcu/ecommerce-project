import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProducts();
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // check if "id" parameter is avaiable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string and convert string to a number using "+" symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    }
    else {
      // not category id avaiable ... default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe (
      data => {
        this.products = data;
      }
    )
  }
}
