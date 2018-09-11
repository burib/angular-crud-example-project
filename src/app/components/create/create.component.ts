import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

 title = 'Add item';
 angForm: FormGroup;

  constructor(private itemService: ItemService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
   }

   createForm() {
    this.angForm = this.formBuilder.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ]
   });
  }

  addItem(name, price) {
      this.itemService.addItem(name, price).subscribe(res => {
        this.router.navigate(['']);
      });
  }

  ngOnInit() {
  }

}
