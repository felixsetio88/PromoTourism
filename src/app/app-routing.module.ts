import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './account/login/login.component';
import { MerchantloginComponent } from './account/merchantlogin/merchantlogin.component';
import { PenangComponent } from './penang/penang.component';
import { AddproductComponent } from './merchantpage/addproduct/addproduct.component';
import { ListproductComponent } from './merchantpage/listproduct/listproduct.component';
import { OfficerComponent } from './officer/officer.component';
import { RegistermerchantComponent } from './account/registermerchant/registermerchant.component';
import { BuyproductComponent } from './buyproduct/buyproduct.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receiptlist/receiptlist.component';
import { HomeComponent } from './mainpage/home/home.component';
import { KlComponent } from './kl/kl.component';
import { CameronComponent } from './cameron/cameron.component';
import { ReviewComponent } from './review/review.component';
import { ReviewlistComponent } from './reviewlist/reviewlist.component';
import { OfficerstatisticComponent } from './officer/officerstatistic/officerstatistic.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { UserregistrationComponent } from './account/userregistration/userregistration.component';
import { MainpageComponent } from './mainpage/mainpage.component';
//import { ProductpageComponent } from './mainpage/productpage/productpage.component';
import { ProductinfoComponent } from './mainpage/product/productinfo/productinfo.component';
import { ShowproductComponent } from './mainpage/product/showproduct/showproduct.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './mainpage/product/product.component';
import { CustomerorderComponent } from './customerorder/customerorder.component';
import { CustomerorderlistComponent } from './customerorder/customerorderlist/customerorderlist.component';
import { CustorderinfoComponent } from './customerorder/custorderinfo/custorderinfo.component';
import { MerchantpageComponent } from './merchantpage/merchantpage.component';
import { MerchantmenuComponent } from './merchantpage/merchantmenu/merchantmenu.component';
import { ModifyproductComponent } from './merchantpage/modifyproduct/modifyproduct.component';
import { MerchantorderComponent } from './merchantpage/merchantorder/merchantorder.component';
import { MerchorderdetailComponent } from './merchantpage/merchorderdetail/merchorderdetail.component';
import { OfficermenuComponent } from './officer/officermenu/officermenu.component';
import { CheckmerchantComponent } from './officer/checkmerchant/checkmerchant.component';
import { DetailcheckComponent } from './officer/detailcheck/detailcheck.component';
import { RoleGuardService } from './service/role-guard.service';
import { MerchantreportComponent } from './merchantpage/merchantreport/merchantreport.component';


const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },

      {
        path: 'product',
        component: ProductComponent,
        children: [
          {
            path: '',
            component: ShowproductComponent,
          },
          {
            path: ':id',
            component: ProductinfoComponent,
          },
        ],
      },
      {
        path: 'order',
        component: CustomerorderComponent,
        children: [
          {
            path: '',
            component: CustomerorderlistComponent,
          },
          {
            path: ':id',
            component: CustorderinfoComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'merchant',
    component: MerchantpageComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'merchant' },
    children: [
      {
        path: '',
        component: MerchantmenuComponent,
      },
      {
        path: 'product',
        component: ListproductComponent,
      },
      {
        path: 'product_update/:productId',
        component: ModifyproductComponent,
      },
      {
        path: 'add-product',
        component: AddproductComponent,
      },
      {
        path: 'order',
        component: MerchantorderComponent,
        children: [
          {
            path: 'detail/:id',
            component: MerchorderdetailComponent,
          },
        ],
      },
      {
        path: 'analytics',
        component: MerchantreportComponent,
      },
    ],
  },
  {
    path: 'officer',
    component: OfficerComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'officer' },
    children: [
      {
        path: '',
        component: OfficermenuComponent,
      },
      {
        path: 'manage',
        component: CheckmerchantComponent,
      },
      {
        path: 'merchant/:id',
        component: DetailcheckComponent,
      },
      {
        path: 'analytic',
        component: OfficerstatisticComponent,
      }

    ],
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: 'login',
        component: MerchantloginComponent,
      },
      {
        path: 'register',
        component: UserregistrationComponent,
      },
      {
        path: 'merchantreg',
        component: RegistermerchantComponent,
      }
    ],
  },


  {path: 'explore', component: ExploreComponent},
  {path: 'kl', component: KlComponent},
  {path: 'cameron', component: CameronComponent},
  {path: 'penang', component: PenangComponent},
  //handle error, in case the user access a site that is not available
  { path: '**', component: NotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
