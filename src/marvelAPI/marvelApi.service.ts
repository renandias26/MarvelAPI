import { AxiosError } from "axios";
import { map } from "rxjs/internal/operators/map";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { HttpService } from "@nestjs/axios/dist/http.service";
import { Logger } from "@nestjs/common/services/logger.service";
import { catchError } from "rxjs/internal/operators/catchError";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

@Injectable()
export class MarvelAPIService {
    constructor(private readonly httpService: HttpService) { }
    private readonly logger = new Logger();

    get<T>(url: string) {
        return firstValueFrom(
            this.httpService.get<T>(url)
                .pipe(map(item => item.data))
                .pipe(catchError((error: AxiosError) => {
                    console.log(error)
                    throw 'An error happened!';
                })
                )
        )
    }
}
