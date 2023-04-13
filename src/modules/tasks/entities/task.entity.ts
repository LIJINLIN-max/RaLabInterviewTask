
import { Base } from '../../../common/common/entity/base.entity';
import { Entity, Column } from 'typeorm';

export enum statusFormat {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

@Entity('task')
export class Task extends Base {

    // Title
    @Column({ name: 'title' })
    title: string;

    //Description
    @Column(
        {
            name: 'description',
            nullable: true
        }
    )
    description: string;

    // Status
    @Column(
        {
            type: "enum",
            enum: statusFormat,
            default: statusFormat.TODO,
            name: "status"
        }
    )
    status: statusFormat;
}
