import { Component, OnInit } from '@angular/core';
import { Item } from './Item';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  items: Array<Item>

 	constructor(private itemService: ItemService) { }
  	ngOnInit() {
  		this.itemService
      		.getItems()
      		.subscribe((data: Array<Item>) => {
        		this.items = data;
        });
    }

    deleteItem(id) {
      this.itemService.deleteItem(id).subscribe(res => {
       this.items.splice(this.items.indexOf(id), 1);
       console.log('Deleted');
     });
    }
}
