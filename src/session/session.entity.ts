import { User } from '../user/user.entity';
import { CoachAvailability } from '../coach-availability/coach-availability.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  clientId: string;

  @Column('uuid')
  availabilityId: string;

  @Column('uuid')
  coachId: string;

  @OneToOne(() => CoachAvailability)
  @JoinColumn()
  availability?: CoachAvailability;

  @Column({ type: 'boolean', default: false })
  approved?: boolean;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  client?: User;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  coach?: User;
}
