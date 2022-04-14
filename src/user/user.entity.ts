import { Session } from '../session/session.entity';
import { CoachAvailability } from '../coach-availability/coach-availability.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @Column({ default: true })
  isActive?: boolean;

  @OneToMany(() => Session, (session) => session.client)
  clientSessions: Session[];

  @OneToMany(() => Session, (session) => session.availability)
  coachSessions: Session[];

  @OneToMany(
    () => CoachAvailability,
    (coachAvailability) => coachAvailability.coach,
  )
  coachAvailabilities: CoachAvailability[];
}
