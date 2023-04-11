import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import {
  InfiniteScrollCustomEvent,
  IonicModule,
  IonicSlides,
  RefresherCustomEvent,
} from '@ionic/angular';
import { MessageComponent } from '../../components/message/message.component';
import { DataService, Message } from '../../services/data.service';
import { TAB_TITLE_DATA } from '../../utils/constant';
import { VirtualListDataComponent } from '../../components/virtual-list-data-component/virtual-list-data.component';

@Component({
  selector: 'app-scroll-tab-data',
  templateUrl: './scroll-tab-data.page.html',
  styleUrls: ['./scroll-tab-data.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ScrollingModule,
    VirtualListDataComponent,
    MessageComponent,
    HammerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ScrollTabDataPage implements OnInit {
  ngOnInit() {}

  swiperModules = [IonicSlides];

  private data = inject(DataService);

  @ViewChildren('appListData')
  public listDataComponent: VirtualListDataComponent[] = [];

  @ViewChild('swipeSlide')
  swipeSlide: ElementRef | undefined;

  public MAX_HEIGHT_ITEM = 90;

  get tabTitleData() {
    return TAB_TITLE_DATA;
  }

  public totalSlideCount = Array.from(
    { length: TAB_TITLE_DATA.length },
    (v, k) => k + 1
  );

  public selectedTab: number = 0;

  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      this.data.loadMore();
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 600);
  }

  segmentChanged(idx: number) {
    this.listDataComponent?.forEach((item) => item.renderViewport());
    this.swipeSlide?.nativeElement?.swiper.slideTo(idx);
  }

  onSlideChange() {
    this.selectedTab = this.swipeSlide?.nativeElement?.swiper?.activeIndex;
  }
}
