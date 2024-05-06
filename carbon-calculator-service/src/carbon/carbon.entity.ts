import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carbon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sessionId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  commuteDistance: number;

  @Column()
  commuteWeeklyFrequency: number;

  @Column()
  commuteMode: string;

  @Column('decimal', { precision: 10, scale: 2 })
  commuteEmissions: number;

  @Column()
  flightsPerYear: number;

  @Column()
  averageFlightDurationHours: number;

  @Column('decimal', { precision: 10, scale: 2 })
  airTravelEmissions: number;

  @Column()
  numPeopleLiving: number;

  @Column('decimal', { precision: 10, scale: 2 })
  electricityConsumption: number;

  @Column('decimal', { precision: 10, scale: 2 })
  electricityEmissions: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
