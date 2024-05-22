import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error-span',
  templateUrl: './form-error-span.component.html',
  styleUrl: './form-error-span.component.css',
})
export class FormErrorSpanComponent {
  @Input() templateOutletContext!: {
    validation: string;
    message: string;
    control: any;
  };
}
