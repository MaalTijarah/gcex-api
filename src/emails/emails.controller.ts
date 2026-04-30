import { Body, Controller, Post } from "@nestjs/common";
import { EmailsService } from "./emails.service";
import { RequestCodeDto } from "./dto";
import { Serialize } from "src/decorators/serialize.decorator";

@Controller('emails')
export class EmailsController {
    constructor(private readonly emailsService: EmailsService){}

    @Post('otp/request')
    @Serialize()
    async requestCode(@Body() payload: RequestCodeDto) {
        return this.emailsService.requestCode(payload.email)
    }
}