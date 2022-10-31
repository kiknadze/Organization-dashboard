import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OrganizationsService } from 'src/app/services';
import { OrgCardComponent } from 'src/app/components';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ArraySortPipe } from 'src/app/pipes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    OrgCardComponent,
    ArraySortPipe,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private searchSubject: Subject<string> = new Subject();

  constructor(public organizationService: OrganizationsService) { }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(500)
      ).subscribe((value: string) => {
        this.organizationService.searchOrganizations(value);
      })
  }

  identify(index: number, item: any): number {
    return item.id;
  }

  onAdd(): void {
    this.organizationService.addOrganization();
  }

  onSearch(evt: any): void {
    this.searchSubject.next(evt.target.value);
  }

}
