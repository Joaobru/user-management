import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nome: string;

  @Column('int')
  idade: number;

  @Column('varchar')
  estadoCivil: string;

  @Column('varchar')
  cpf: string;

  @Column('varchar')
  cidade: string;

  @Column('varchar')
  estado: string;
}

export default User
