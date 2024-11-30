import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Token } from '@modules/token/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Source, Token])],
  controllers: [SourceController],
  providers: [SourceService],
})
export class SourceModule {}
