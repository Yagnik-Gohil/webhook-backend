import { Module } from '@nestjs/common';
import { EventHistoryService } from './event-history.service';
import { EventHistoryController } from './event-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventHistory } from './entities/event-history.entity';
import { Token } from '@modules/token/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventHistory, Token])],
  controllers: [EventHistoryController],
  providers: [EventHistoryService],
})
export class EventHistoryModule {}
