import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrganization, IOrgDropdownOpt } from 'src/app/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OrganizationsService } from 'src/app/services';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-org-card',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.scss']
})
export class OrgCardComponent implements OnInit {
  @Input() org!: IOrganization;
  menuOptons: IOrgDropdownOpt[] = [
    {
      id: 'edit',
      icon: 'edit',
      name: 'Edit',
      disabled: true
    },
    {
      id: 'link',
      icon: 'link',
      name: 'Go To organization',
      disabled: false
    },
    {
      id: 'delete',
      icon: 'delete',
      name: 'Delete Organization',
      disabled: false
    }
  ];

  constructor(private organizationsService: OrganizationsService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure want to delete Organization?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.organizationsService.deleteOrganization(this.org.id);
        this.snackBar.open('Organization deleted!', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  onAction(id: string): void {
    switch (id) {
      case 'edit':
        // edit card
        break;

      case 'link':
        window.open(this.org.link, '_blank');
        break;

      case 'delete':
        this.openDialog();
        break;
    }
  }

}
