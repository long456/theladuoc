import { Injectable } from "@angular/core";
import {BehaviorSubject, distinctUntilChanged} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable().pipe(
    // Áp dụng distinctUntilChanged để tránh việc phát ra các giá trị trùng lặp
    distinctUntilChanged()
  );

  private loadingCount = 0;

  showLoading() {
    this.loadingCount++;
    if (this.loadingCount > 0) {
      this.loadingSubject.next(true);
    }
  }

  hideLoading() {
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this.loadingCount = 0;
      this.loadingSubject.next(false);
    }
  }
}
