import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/features/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public form: FormGroup;
  countries$: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {
    this.productService.fetchCountries();

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      state: [''],
      agreeTerms: [false, Validators.requiredTrue]
    });

    this.countries$ = this.productService.countries$;
   }

  ngOnInit(): void {
    //i'm counscious i would have been able to simplify this by simply setting a required validator without passing through a custom validator
    //but i choosed to show of custom validators
    this.form.get('country')?.valueChanges.subscribe((value) => {
      this.form.get('state')?.setValidators(
        this.customStateValidation('country', 'United States')
      );
      this.form.get('state')?.updateValueAndValidity()
    })
  }

  onSubmit(){
    this.productService.checkout(this.form.value);
    if(this.form.valid) {
      this.router.navigate(['/success']);
    }
  }

  private customStateValidation(otherField: string, expectedValue: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const otherFieldValue = control.parent?.get(otherField)?.value;
      if (otherFieldValue === expectedValue) {
        if (!control.value) {
          return { fieldRequired: true };
        }
      }
      return null;
    };
  }
}
