import { HttpModuleOptions, HttpModuleOptionsFactory } from "@nestjs/axios/dist/interfaces/http-module.interface";
import { ConfigGetOptions, ConfigService } from "@nestjs/config/dist/config.service";
import { MarvelVariables } from "./interfaces/marvelVariables.interface";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

@Injectable()
export class MarvelApiConfig implements HttpModuleOptionsFactory {
    constructor(private configService: ConfigService<MarvelVariables>) { }
    private getOptions: ConfigGetOptions = { infer: true }

    createHttpOptions(): HttpModuleOptions {
        return {
            baseURL: this.configService.get('base_url', this.getOptions),
            params: new URLSearchParams(
                {
                    ts: this.configService.get('ts', this.getOptions),
                    apikey: this.configService.get('public_key', this.getOptions),
                    hash: this.configService.get('hash', this.getOptions),
                }
            )
        };
    }
}