import { Controller, Get, Query } from '@nestjs/common';
import { LitService } from './lit.service';

@Controller('lit')
export class LitController {
  constructor(private readonly litService: LitService) {}

  @Get('register')
  register(@Query('username') username: string) {
    return this.litService.register(username);
  }
}
