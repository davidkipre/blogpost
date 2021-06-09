import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BlogpostService } from '../blogpost.service';


@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {
  
  //permet la gestion du formulaie
  creationForm: FormGroup;
  
  //ElementRef permet la gestion de l'image
  constructor(private fb: FormBuilder, private blogpostService: BlogpostService, private el: ElementRef) { }
  
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.creationForm = this.fb.group({
      title: '',
      subTitle: '',
      content: '',
      image: ''
    });
  }

  upload() {
    //retrieve file upload HTML tag il gere l'image
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files.length;
    // make sure a file was selected.
    if (fileCount > 0) { 
      let formData = new FormData();
      //append the key name 'image' with the first file in the element
      formData.append('image', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(data => console.log(data), error => console.error(error));
      };
  }

// le # c'est un template string
  createBlogpost(formDirective: FormGroupDirective) {
    if(this.creationForm.valid) {
      console.log(this.creationForm);
      this.blogpostService
        .createBlogpost(this.creationForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    }
  }

//grace a Reset quand on soumet le formulaire il se refresh mais aussi avec resetform la validation du formulaire aussi est refresh
  handleSuccess(data, formDirective) {
    console.log('OK handleSuccess - blog post created', data);
    this.creationForm.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data._id);
  }

  handleError(error) {
    console.log('KO handleError - blog post NOT created', error);
  }
}