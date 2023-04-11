import {
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { DataService, Message } from '../../services/data.service';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { MessageComponent } from '../message/message.component';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'virtual-list-data',
  templateUrl: './virtual-list-data.component.html',
  styleUrls: ['./virtual-list-data.component.scss'],
  imports: [ScrollingModule, MessageComponent, CommonModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VirtualListDataComponent implements OnInit {
  public static MIN_HEIGHT_ITEM = 90;

  @ViewChild('cdkView')
  public cdkView: any;
  @ContentChild(TemplateRef)
  templateRef!: TemplateRef<any>;
  @Input() data: any[] = [];
  @Input() rowHeightPx: number = VirtualListDataComponent.MIN_HEIGHT_ITEM;
  @Output() onInfinite = new EventEmitter();

  public MIN_BUFFER_PX = this.rowHeightPx * 10;
  public MAX_BUFFER_PX = this.rowHeightPx * 20;
  public CACHE_SIZE = 30;

  constructor(private sanitizer: DomSanitizer) {}

  private hammer: any = null;

  ngOnInit() {}

  ngAfterContentChecked(): void {
    this.renderViewport();
  }

  public renderViewport() {
    (this.cdkView as CdkVirtualScrollViewport)?.checkViewportSize();
    if (!this.hammer && this.cdkView?.elementRef?.nativeElement) {
      this.hammer = new Hammer(
        this.cdkView?.elementRef?.nativeElement as HTMLElement,
        {}
      );
    }
  }

  onIonInfinite(ev: any) {
    this.onInfinite.emit(ev);
  }
}
