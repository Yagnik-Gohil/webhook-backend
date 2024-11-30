import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { AuthGuard } from '@shared/guard/auth.guard';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { createSubscriptionSchema } from './schema/create-subscription.schema';
import response from '@shared/response';
import { MESSAGE, VALUE } from '@shared/constants/constant';
import { Request, Response } from 'express';
import { User } from '@modules/user/entities/user.entity';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(createSubscriptionSchema))
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: User = req['user'];
    const data = await this.subscriptionService.create(
      createSubscriptionDto,
      user.id,
    );
    return response.successCreate(
      {
        message: MESSAGE.RECORD_CREATED('Subscription'),
        data,
      },
      res,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('limit') limit: number = VALUE.limit,
    @Query('offset') offset: number = VALUE.offset,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const [list, count] = await this.subscriptionService.findAll({
      relations: { source: true },
      where: { user: { id: req['user']['id'] } },
      take: +limit,
      skip: +offset,
    });
    return response.successResponseWithPagination(
      {
        message: MESSAGE.RECORD_FOUND('Subscription'),
        total: count,
        limit: +limit,
        offset: +offset,
        data: list,
      },
      res,
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: User = req['user'];
    const data = await this.subscriptionService.update(
      id,
      updateSubscriptionDto,
      user.id,
    );
    return response.successResponse(
      {
        message: data.affected
          ? MESSAGE.RECORD_UPDATED('Subscription')
          : MESSAGE.RECORD_NOT_FOUND('Subscription'),
        data: {},
      },
      res,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: User = req['user'];
    const data = await this.subscriptionService.remove(id, user.id);
    return response.successResponse(
      {
        message: data.affected
          ? MESSAGE.RECORD_DELETED('Subscription')
          : MESSAGE.RECORD_NOT_FOUND('Subscription'),
        data: {},
      },
      res,
    );
  }
}
