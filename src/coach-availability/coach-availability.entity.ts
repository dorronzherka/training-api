import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Session } from '../session/session.entity';

@Entity()
export class CoachAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  day?: string;

  @Column({ nullable: true })
  specificDate?: Date;

  @Column()
  fromTime: string;

  @Column()
  toTime: string;

  @Column('uuid')
  coachId: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  coach: User;

  @OneToOne(() => Session, (session) => session.availability)
  session: Session;
}
