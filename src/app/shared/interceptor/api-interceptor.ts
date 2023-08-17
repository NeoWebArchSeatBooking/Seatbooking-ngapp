import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { getFromSession } from "src/app/auth/auth.guard";
import { UtilityService } from "../service/utility/utility.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private utilityService: UtilityService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.utilityService.showLoader(true);
        const authReq = req.clone({
            headers: req.headers.set('authorization',getFromSession('token'))
        })
        return next.handle(authReq).pipe(catchError(err => {
            //this.utilityService.showErrorAlert(err);
            return throwError(err);
        })).pipe(finalize(() => {
            this.utilityService.showLoader(false);
        }));
    }
}
