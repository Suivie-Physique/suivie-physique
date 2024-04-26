import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component({
    selector: "app-auth-user",
    templateUrl: "./auth-user.component.html",
    standalone: true,
    imports: [RouterOutlet]
})
export class AuthUserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}