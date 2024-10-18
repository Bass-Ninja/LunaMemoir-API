import { Test, TestingModule } from '@nestjs/testing';
import { DreamService } from './dream.service';
import { UsersRepository } from '../auth/users.repository';
import { DreamRepository } from './dream.repository';
import { SymbolService } from '../symbol/symbol.service';
import { DreamCategoryService } from '../dream-category/dream-category.service';
import { MoodService } from '../mood/mood.service';
import { CreateDreamDto } from './dto/create-dream.dto';
import { Dream } from './dream.entity';
import { User } from '../auth/user.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DreamDto } from './dto/dream.dto';
import { DreamFilterDto } from './dto/dream-filter.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { EntityManager } from 'typeorm';

describe('DreamService', () => {
  let dreamService: DreamService;
  let usersRepository: UsersRepository;
  let dreamRepository: DreamRepository;
  let symbolService: SymbolService;
  let dreamCategoryService: DreamCategoryService;
  let moodService: MoodService;
  let entityManager: EntityManager;

  const mockUser: User = { id: '1', email: 'user@example.com' } as User;
  const mockDream: Dream = {
    id: '1',
    title: 'Test Dream',
    description: 'This is a test dream',
    user: mockUser,
    category: { id: 'cat1', name: 'Test Category' },
    mood: { id: 'mood1', name: 'Happy' },
    symbols: [],
  } as Dream;

  const mockDreams: Dream[] = [mockDream];

  const mockDreamRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockUsersRepository = {
    findOne: jest.fn(),
  };

  const mockSymbolService = {
    getOrCreateSymbols: jest.fn(),
  };

  const mockDreamCategoryService = {
    getOrCreateDreamCategory: jest.fn(),
  };

  const mockMoodService = {
    getOrCreateMood: jest.fn(),
  };
  const mockEntityManager = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DreamService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: DreamRepository,
          useValue: mockDreamRepository,
        },
        {
          provide: SymbolService,
          useValue: mockSymbolService,
        },
        {
          provide: DreamCategoryService,
          useValue: mockDreamCategoryService,
        },
        {
          provide: MoodService,
          useValue: mockMoodService,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    dreamService = module.get<DreamService>(DreamService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    dreamRepository = module.get<DreamRepository>(DreamRepository);
    symbolService = module.get<SymbolService>(SymbolService);
    dreamCategoryService =
      module.get<DreamCategoryService>(DreamCategoryService);
    moodService = module.get<MoodService>(MoodService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('getDreams', () => {
    it('should return paginated dreams', async () => {
      const filterDto: DreamFilterDto = {
        page: 1,
        pageSize: 10,
        search: 'test',
      };
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(mockDreams.length),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDreams),
      };

      mockDreamRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await dreamService.getDreams(filterDto, mockUser);
      expect(result).toEqual(
        new PaginatedResponseDto(mockDreams, mockDreams.length, 1, 10),
      );
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(mockQueryBuilder.getCount).toHaveBeenCalled();
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('should filter by search term', async () => {
      const filterDto: DreamFilterDto = {
        page: 1,
        pageSize: 10,
        search: 'test',
      };
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(mockDreams.length),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDreams),
      };

      mockDreamRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await dreamService.getDreams(filterDto, mockUser);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        '(LOWER(dream.title) LIKE LOWER(:search) OR LOWER(dream.description) LIKE LOWER(:search))',
        { search: '%test%' },
      );
    });

    it('should filter by mood', async () => {
      const filterDto: DreamFilterDto = {
        page: 1,
        pageSize: 10,
        mood: 'mood1',
        search: 'test',
      };
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(mockDreams.length),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDreams),
      };

      mockDreamRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await dreamService.getDreams(filterDto, mockUser);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'dream.mood = :mood',
        { mood: 'mood1' },
      );
    });

    it('should filter by category', async () => {
      const filterDto: DreamFilterDto = {
        page: 1,
        pageSize: 10,
        category: 'cat1',
        search: 'test',
      };
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(mockDreams.length),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDreams),
      };

      mockDreamRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await dreamService.getDreams(filterDto, mockUser);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'dream.category = :category',
        { category: 'cat1' },
      );
    });
  });

  describe('getDreamById', () => {
    it('should return a dream by ID', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      mockDreamRepository.findOne.mockResolvedValue(mockDream);

      const result = await dreamService.getDreamById('1', mockUser);
      expect(result).toEqual(plainToInstance(DreamDto, mockDream));
      expect(mockDreamRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1', user: { id: mockUser.id } },
        relations: ['category', 'symbols', 'mood'],
      });
    });

    it('should throw NotFoundException if dream not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      mockDreamRepository.findOne.mockResolvedValue(null);

      await expect(dreamService.getDreamById('1', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createDream', () => {
    it('should create a dream and return it', async () => {
      const createDreamDto: CreateDreamDto = {
        title: 'New Dream',
        description: 'This is a new dream',
        category: { name: 'Test Category' },
        mood: { name: 'Happy' },
        symbols: [],
      };

      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      mockSymbolService.getOrCreateSymbols.mockResolvedValue([]);
      mockDreamCategoryService.getOrCreateDreamCategory.mockResolvedValue({
        id: 'cat1',
        name: 'Test Category',
      });
      mockMoodService.getOrCreateMood.mockResolvedValue({
        id: 'mood1',
        name: 'Happy',
      });
      mockDreamRepository.create.mockReturnValue(mockDream);
      mockDreamRepository.save.mockResolvedValue(mockDream);

      const result = await dreamService.createDream(createDreamDto, mockUser);
      expect(result).toEqual(plainToInstance(DreamDto, mockDream));
      expect(mockDreamRepository.create).toHaveBeenCalledWith({
        title: createDreamDto.title,
        description: createDreamDto.description,
        mood: expect.anything(),
        category: expect.anything(),
        symbols: expect.anything(),
        user: expect.anything(),
      });
    });
  });

  describe('updateDream', () => {
    it('should update and return a dream', async () => {
      const updateDreamDto: CreateDreamDto = {
        title: 'Updated Dream',
        description: 'This is an updated dream',
        category: { name: 'Another Category' },
        mood: { name: 'Sad' },
        symbols: [],
      };

      mockDreamRepository.findOne.mockResolvedValue(mockDream);
      mockDreamCategoryService.getOrCreateDreamCategory.mockResolvedValue({
        id: 'cat2',
        name: 'Another Category',
      });
      mockMoodService.getOrCreateMood.mockResolvedValue({
        id: 'mood2',
        name: 'Sad',
      });
      mockSymbolService.getOrCreateSymbols.mockResolvedValue([]);

      const result = await dreamService.updateDream('1', updateDreamDto);
      expect(result).toEqual(
        plainToInstance(DreamDto, { ...mockDream, ...updateDreamDto }),
      );
      expect(mockDreamRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['category', 'symbols', 'mood'],
      });
      expect(mockDreamRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(updateDreamDto),
      );
    });

    it('should throw an error if the dream is not found', async () => {
      mockDreamRepository.findOne.mockResolvedValue(null);
      await expect(
        dreamService.updateDream('1', {} as CreateDreamDto),
      ).rejects.toThrow(Error);
    });
  });

  describe('getDreamsGroupedByCategory', () => {
    it('should return the count of dreams grouped by category', async () => {
      const mockDreams = [
        { ...mockDream, category: { id: 'cat1', name: 'Category 1' } },
        { ...mockDream, category: { id: 'cat1', name: 'Category 1' } },
        { ...mockDream, category: { id: 'cat2', name: 'Category 2' } },
      ];

      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      mockDreamRepository.find.mockResolvedValue(mockDreams);

      const result = await dreamService.getDreamsGroupedByCategory(mockUser);
      expect(result).toEqual([
        {
          categoryId: 'cat1',
          categoryName: 'Category 1',
          dreamsCount: 2,
          totalCount: 3,
        },
        {
          categoryId: 'cat2',
          categoryName: 'Category 2',
          dreamsCount: 1,
          totalCount: 3,
        },
      ]);
    });
  });
});
