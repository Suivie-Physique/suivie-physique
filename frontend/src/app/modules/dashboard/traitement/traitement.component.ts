import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-traitement',
    templateUrl: './traitement.component.html',
    standalone: true,
    imports: [CommonModule, RouterOutlet]
})
export class TraitementComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        // Initialization code here
    }

}