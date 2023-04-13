import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './tasks.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Task, statusFormat } from './entities/task.entity'
import { TaskController } from './tasks.controller'
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn()
})

const taskDB = [
    {id:1, title:"OP", describe:"OP", status:statusFormat.COMPLETED}
]


describe('TaskService', () => {
    let service: TaskService;
    let tasksRepository: MockRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TaskService, {
                provide: getRepositoryToken(Task),
                useValue: createMockRepository(),
            }],
            controllers: [TaskController]
        }).compile()

        service = module.get<TaskService>(TaskService);
        tasksRepository = module.get<MockRepository>(getRepositoryToken(Task));
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('taskRepository should be defined', () => {
        expect(tasksRepository).toBeDefined();
    });

    describe('createTask', () => {
        it('should create a new task', async () => {
            const expectedCreate = {
                title: "Play Monster Honter World",
                description: "Through PC",
                status: statusFormat.TODO,
            };
            await service.create(expectedCreate);
        });
    });

    describe('findTask', () => {
        describe('when task with id exists', () => {
            it('should return the task', async () => {
                const id = 1;
                const expectedTask = {};
                tasksRepository.findOne.mockReturnValue(expectedTask);
                const task = await service.findOne(id + '');
                expect(task).toEqual(expectedTask);
            });
        });
        describe('otherwise', ()=>{
            it('should trow the Not Found Exception', async () => {
                const id = 1;
                tasksRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.findOne(id +'');
                }catch(err){
                    expect(err).toBeInstanceOf(NotFoundException);
                }
            });
        });
    });

    describe('delete Task', ()=>{
        describe('when we need to delete task', () =>{
            it('should delete the things', async () => {
                tasksRepository.delete.mockResolvedValue(1+'');
                expect(tasksRepository.delete).not.toHaveBeenCalled();
                await service.dElete(1+'');
                expect(tasksRepository.delete).toHaveBeenCalledWith(1+'');
            });
        });
    });


});