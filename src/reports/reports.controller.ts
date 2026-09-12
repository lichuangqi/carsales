import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { CurrentUser } from '../users/decorators/current-user.decorators.js';
import { User } from '../users/user.entity.js';
import { ReportDto } from './dtos/report.dto.js';
import { Serialize } from '../interceptor/serialize.interceptor.js';
import { ApproveReportDto } from './dtos/approve-report.dto.js';
@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(id, body.approved);
  }
}
