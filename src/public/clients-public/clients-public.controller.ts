import { Controller, Get } from '@nestjs/common';
import { ClientsPublicService } from './clients-public.service';

@Controller('public/clients-public')
export class ClientsPublicController {
  constructor(private readonly clientsPublicService: ClientsPublicService) {}

  @Get()
  findAll() {
    return this.clientsPublicService.findAll();
  }
}
