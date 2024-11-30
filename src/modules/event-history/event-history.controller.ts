import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { EventHistoryService } from './event-history.service';
import { AuthGuard } from '@shared/guard/auth.guard';
import { MESSAGE, VALUE } from '@shared/constants/constant';
import { Request, Response } from 'express';
import response from '@shared/response';

@Controller('event-history')
export class EventHistoryController {
  constructor(private readonly eventHistoryService: EventHistoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('limit') limit: number = VALUE.limit,
    @Query('offset') offset: number = VALUE.offset,
    @Query('source') source: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const [list, count] = await this.eventHistoryService.findAll({
      relations: { subscription: { source: true } },
      where: {
        user: { id: req['user']['id'] },
        subscription: source ? { source: { id: source } } : undefined,
      },
      order: {
        created_at: 'DESC',
      },
      take: +limit,
      skip: +offset,
    });
    return response.successResponseWithPagination(
      {
        message: MESSAGE.RECORD_FOUND('Event History'),
        total: count,
        limit: +limit,
        offset: +offset,
        data: list,
      },
      res,
    );
  }
}
