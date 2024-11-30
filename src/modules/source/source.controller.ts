import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { SourceService } from './source.service';
import { MESSAGE, VALUE } from '@shared/constants/constant';
import { Response } from 'express';
import response from '@shared/response';
import { AuthGuard } from '@shared/guard/auth.guard';
import { DefaultStatus } from '@shared/constants/enum';

@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('limit') limit: number = VALUE.limit,
    @Query('offset') offset: number = VALUE.offset,
    @Res() res: Response,
  ) {
    const [list, count] = await this.sourceService.findAll({
      where: { status: DefaultStatus.ACTIVE },
      take: +limit,
      skip: +offset,
    });
    return response.successResponseWithPagination(
      {
        message: MESSAGE.RECORD_FOUND('Sources'),
        total: count,
        limit: +limit,
        offset: +offset,
        data: list,
      },
      res,
    );
  }
}
