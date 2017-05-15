import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  template: `
    <h1 document-title i18n>Home page</h1>
    <p i18n>This is test project where you can discover different registers:</p>
    <ul>
      <li>
        <a routerLink="public-associations"
          i18n="Link to the public associations register">Public associations</a>
      </li>
      <li>
        <a routerLink="judgments" i18n="Link to the judgments register">Judgments</a>
      </li>
      <li>
        <a routerLink="notaries" i18n="Link to the notaries register">Notaries</a>
      </li>
    </ul>
  `
})
export class HomeComponent {}
