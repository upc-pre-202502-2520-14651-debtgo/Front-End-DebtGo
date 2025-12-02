import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService } from '../../../services/consultants.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-profile-view',
    templateUrl: './profile-view.html',
    styleUrls: ['./profile-view.css'],
    imports: [CommonModule]
})
export class ProfileViewComponent implements OnInit {

    consultant: any = null;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private service: ConsultantService
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.service.getConsultantById(id).subscribe({
            next: data => {
                this.consultant = data;
                this.loading = false;
            },
            error: err => {
                this.loading = false;
                console.error('Error al cargar consultor', err);
            }
        });
    }
}