import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Report } from './entities/report.entity'; // Ensure this import is correct
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimateDto } from './dto/get-estimate-report.dto';

@Injectable()
export class ReportsService {

  constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

  async createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('report')
      .select('AVG(report.price)', 'price')
      .where('report.make = :make', { make })
      .andWhere('report.model = :model', { model })
      .andWhere('ABS(report.lng - :lng) <= 5', { lng })
      .andWhere('ABS(report.lat - :lat) <= 5', { lat })
      .andWhere('ABS(report.year - :year) <= 3', { year })
      .andWhere('report.approve IS TRUE')
      .groupBy('report.mileage')
      .orderBy('ABS(report.mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();

    return result.price;
  }

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.repo.create(createReportDto)
    report.user = user;
    return this.repo.save(report);
  }

  async approveReport(id: number, approve: boolean) {
    const report = await this.repo.findOneBy({ id })
    if (!report) throw new Error('Report not found');
    report.approve = approve;
    return this.repo.save(report);
  }
}