import { Module } from "@nestjs/common";
import { CoingeckoModule } from "src/coingecko";
import { PricesService } from "./prices.service";

@Module({
    imports: [CoingeckoModule],
    providers: [PricesService]
})
export class PricesModule {}