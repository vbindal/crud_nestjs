import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm'

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id :string

    @Column({type:'varchar',length:100})
    name : string

    @Column({type:'varchar',length:100})
    email : string

    @Column({type:'varchar',length:100})
    password : string

    @Column({type:'varchar',length:100})
    mobile : string

    @Column({type:'varchar',length:100})
    gender : string

    @Column({type:'varchar',length:100})
    date_of_birth: Date


}