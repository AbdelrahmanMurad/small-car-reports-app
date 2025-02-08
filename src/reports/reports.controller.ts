import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
// import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate-report.dto';
import { updateReport } from './dto/updateReport';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Get()
  estimateReport(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard) // The @UseGuards(AuthGuard) decorator ensures that only authenticated users can access this route.
  @Serialize(ReportDto) // The @Serialize(ReportDto) decorator ensures that the response data is serialized according to the ReportDto structure before being sent to the client.
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateReport(@Param('id') id: string, @Body() body: updateReport) {
    return this.reportsService.updateReport(+id, body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  removeReport(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
