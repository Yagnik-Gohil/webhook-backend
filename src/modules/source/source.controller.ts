import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { SourceService } from './source.service';
import { MESSAGE, VALUE } from '@shared/constants/constant';
import { Request, Response } from 'express';
import response from '@shared/response';
import { AuthGuard } from '@shared/guard/auth.guard';

@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('limit') limit: number = VALUE.limit,
    @Query('offset') offset: number = VALUE.offset,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const [list, count] = await this.sourceService.findAllUnSubscribedSource(
      req['user']['id'],
      limit,
      offset,
    );
    return response.successResponseWithPagination(
      {
        message: list.length
          ? MESSAGE.RECORD_FOUND('Sources')
          : MESSAGE.RECORD_NOT_FOUND('Sources'),
        total: count,
        limit: +limit,
        offset: +offset,
        data: list,
      },
      res,
    );
  }

  @Get('subscribed')
  @UseGuards(AuthGuard)
  async findAllSubscribedSource(
    @Query('limit') limit: number = VALUE.limit,
    @Query('offset') offset: number = VALUE.offset,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const [list, count] = await this.sourceService.findAllSubscribedSource(
      req['user']['id'],
      limit,
      offset,
    );
    return response.successResponseWithPagination(
      {
        message: list.length
          ? MESSAGE.RECORD_FOUND('Sources')
          : MESSAGE.RECORD_NOT_FOUND('Sources'),
        total: count,
        limit: +limit,
        offset: +offset,
        data: list,
      },
      res,
    );
  }
}
