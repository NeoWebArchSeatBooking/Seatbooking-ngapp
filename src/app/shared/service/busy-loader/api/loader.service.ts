import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = 0;
  constructor() { }

  showLoader(flag: boolean) {
    setTimeout(() => {
      if (flag) {
        ++this.isLoading;
      } else if (this.isLoading > 0) {
        --this.isLoading;
      }
    });
  }

  clearLoader() {
    setTimeout(() => {
      this.isLoading = 0;
    });
  }

  isLoaderBusy() {
    return this.isLoading > 0;
  }
}
