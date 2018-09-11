import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ItemService } from '../../item.service';
import { Item } from '../index/Item';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    item: any = {};
    angForm: FormGroup;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: ItemService,
                private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
      this.angForm = this.fb.group({
         	name: ['', Validators.required ],
          price: ['', Validators.required ]
   		});
  	}

    updateItem(name, price) {
      this.route.params.subscribe(params => {
       this.service.updateItem(name, price, params['id']).subscribe(res => {
         console.log('item updated');
         this.router.navigate(['']);
       });
      });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
     		this.service.getItem(params['id']).subscribe(res => {
        		this.item = res;
      	});
    });
  }
}
