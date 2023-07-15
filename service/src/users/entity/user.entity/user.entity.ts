import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    @Column({nullable:false})
    role: number
}
