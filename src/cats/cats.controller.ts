import {
  Controller,
  Get,
  Query,
  Headers,
  Post,
  Redirect,
  Param,
  Body,
  Res,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    throw new UnauthorizedException('This is a custom message');
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    this.catsService.create(createCatDto);
  }

  @Get('ab*cd')
  find(): string {
    return 'This route uses a wildcard';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    console.log(id);
    return this.catsService.findOne(id);
  }
}
