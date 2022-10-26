// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { Clipboard } from '@angular/cdk/clipboard';

// import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
// import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
// import { BaseListComponent } from 'app/classes/baselistcomponent';
// import { APIENUM } from 'app/classes/enum';
// import APISERVICE from 'app/classes/service';
// import { ConfigurationService } from 'app/service';
// import { BehaviorSubject } from 'rxjs';

// @Component({
//   selector: 'app-mail-log',
//   templateUrl: './mail-log.component.html',
//   styleUrls: ['./mail-log.component.scss'],
// })
// export class MailLogComponent extends BaseListComponent implements OnInit {
//   public selectedOption: any;
//   bills: Array<any> = [];
//   public ColumnMode = ColumnMode;
//   public sidebarToggleRef = false;
//   public value: BehaviorSubject<any>;
//   isNewOn = false;
//   @ViewChild(DatatableComponent) table: DatatableComponent;
//   public contentHeader: object;
//   tempData: any;

//   constructor(
//     private api: ConfigurationService,
//     private _coreSidebarService: CoreSidebarService,
//     private clipboard: Clipboard,

//     private router: Router
//   ) {
//     super(api, APIENUM.emailLog, APISERVICE.getmessaging);
//     this.init(null, '/getpaged');
//   }

//   ngOnInit(): void {
//     this.contentHeader = {
//       headerTitle: 'Mail Log',
//       actionButton: true,
//       breadcrumb: {
//         type: '',
//         links: [
//           {
//             name: 'Home',
//             isLink: true,
//             link: '/',
//           },
//           {
//             name: 'Log',
//             isLink: true,
//             link: '/',
//           },
//           {
//             name: 'Mail Log',
//             isLink: false,
//           },
//         ],
//       },
//     };
//   }

//   toggle(id): void {
//     this.router.navigate(['log/mail-log/mail-details'], {
//       queryParams: { type: 'edit', id },
//     });
//   }
//   copyText(textToCopy: string) {
//     this.clipboard.copy(textToCopy);
//   }
//   transform(value: string, limit: number): string {
//     return value.length < limit ? value : value.slice(0, limit) + '...';
//   }
//   // toggleSidebar(): void {
//   //   this.router.navigate(['log/mail-log/details'], {
//   //     queryParams: { type: 'create' },
//   //   });
//   // }

//   switch(id) {
//     this.toggleStatus(APISERVICE.postmessaging, APIENUM.emailLog, id, '');
//   }

//   reload(value) {
//     if (value) {
//       this.init(null, '/getpaged');
//     }
//   }
// }
