import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [RouterOutlet, SkeletonModule, TableModule]
})
export class DashboardComponent implements OnInit {
  public products: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
