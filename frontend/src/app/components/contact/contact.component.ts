import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {Contact} from "../../model/contact.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  model = new Contact();

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
  }

  saveMessage(contactForm: NgForm) {
    this.dashboardService.saveMessage(this.model).subscribe(
      responseData => {
        this.model = <any> responseData.body;
        contactForm.resetForm();
      }, error => {
        console.log(error);
      });

  }

}
