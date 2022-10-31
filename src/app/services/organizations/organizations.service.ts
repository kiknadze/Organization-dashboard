import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrganization } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  organization: IOrganization = {
    id: 1,
    title: 'Organization Name',
    logo: 'https://banner2.cleanpng.com/20180405/yiq/kisspng-logo-hand-organization-individual-responsibility-cliparts-5ac5f97dcd7e77.2226842915229239018417.jpg',
    link: 'https://www.cleanpng.com/'
  };
  organizations: IOrganization[] = [
    {
      id: 1,
      title: 'Organization Name',
      logo: 'https://banner2.cleanpng.com/20180405/yiq/kisspng-logo-hand-organization-individual-responsibility-cliparts-5ac5f97dcd7e77.2226842915229239018417.jpg',
      link: 'https://www.cleanpng.com/'
    },
    {
      id: 2,
      title: 'Organization Name',
      logo: 'https://banner2.cleanpng.com/20180405/yiq/kisspng-logo-hand-organization-individual-responsibility-cliparts-5ac5f97dcd7e77.2226842915229239018417.jpg',
      link: 'https://www.cleanpng.com/'
    },
    {
      id: 3,
      title: 'Organization Name',
      logo: 'https://banner2.cleanpng.com/20180405/yiq/kisspng-logo-hand-organization-individual-responsibility-cliparts-5ac5f97dcd7e77.2226842915229239018417.jpg',
      link: 'https://www.cleanpng.com/'
    },
  ];
  private _organizations: BehaviorSubject<IOrganization[]> = new BehaviorSubject<IOrganization[]>(this.organizations);
  organizations$ = this._organizations.asObservable();

  constructor() { }

  searchOrganizations(search: string): void {
    const filteredOrganizations = [...search ? this.organizations.filter(org => org.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) 
                                             : this.organizations];
    this._organizations.next(filteredOrganizations);
  }

  addOrganization(): void {
    this.organizations.push({ ...this.organization, id: this.organizations.length ? this.organizations.at(-1)!.id + 1 : 1 });
    this._organizations.next(this.organizations);
  }

  deleteOrganization(id: number): void {
    const index = this.organizations.findIndex(org => org.id === id);
    this.organizations.splice(index, 1);
    this._organizations.next(this.organizations);
  }
}
