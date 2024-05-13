import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { register } from 'swiper/element/bundle';
register();
import { AppComponent } from './app.component';
import { HeaderComponent } from './mainpage/header/header.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './mainpage/footer/footer.component';
import { MainComponent } from './main/main.component';
import { ExploreComponent } from './explore/explore.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './mainpage/home/home.component';
import { LoginComponent } from './account/login/login.component';

import { MerchantloginComponent } from './account/merchantlogin/merchantlogin.component';
import { PenangComponent } from './penang/penang.component';
import { AddproductComponent } from './merchantpage/addproduct/addproduct.component';
import { ListproductComponent } from './merchantpage/listproduct/listproduct.component';
import { RegistermerchantComponent } from './account/registermerchant/registermerchant.component';
import { OfficerComponent } from './officer/officer.component';
import { BuyproductComponent } from './buyproduct/buyproduct.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receiptlist/receiptlist.component';
import { KlComponent } from './kl/kl.component';
import { CameronComponent } from './cameron/cameron.component';
import { ReviewComponent } from './review/review.component';
import { ReviewlistComponent } from './reviewlist/reviewlist.component';
import { OfficerstatisticComponent } from './officer/officerstatistic/officerstatistic.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { ProductinfoComponent } from './mainpage/product/productinfo/productinfo.component';
import { UserregistrationComponent } from './account/userregistration/userregistration.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MerchantpageComponent } from './merchantpage/merchantpage.component';
import { ShowproductComponent } from './mainpage/product/showproduct/showproduct.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './mainpage/product/product.component';
import { CustomerorderComponent } from './customerorder/customerorder.component';
import { CustomerorderlistComponent } from './customerorder/customerorderlist/customerorderlist.component';
import { CustorderinfoComponent } from './customerorder/custorderinfo/custorderinfo.component';
import { NavlinkComponent } from './navlink/navlink.component';
import { CheckmerchantComponent } from './officer/checkmerchant/checkmerchant.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    MainComponent,
    ExploreComponent,
    NotfoundComponent,
    HomeComponent,
    LoginComponent,
    MerchantloginComponent,
    PenangComponent,
    AddproductComponent,
    ListproductComponent,
    RegistermerchantComponent,
    OfficerComponent,
    BuyproductComponent,
    ReceiptComponent,
    ReceiptListComponent,
    KlComponent,
    CameronComponent,
    ReviewComponent,
    CheckmerchantComponent,
    ReviewlistComponent,
    OfficerstatisticComponent,
    CustomerLoginComponent,
    UserregistrationComponent,
    MainpageComponent,
    MerchantpageComponent,
    ShowproductComponent,
    AccountComponent,
    ProductComponent,
    CustomerorderComponent,
    CustomerorderlistComponent,
    CustorderinfoComponent,
    ProductinfoComponent,
    NavlinkComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    //ImageModule,
   // ScrollingModule,

    //NgChartsModule,
    BrowserAnimationsModule,
    NgxPayPalModule,
    HttpClientModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    //NgxPaginationModule,
    LightboxModule,

  ],
  providers: [
    DatePipe,

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
