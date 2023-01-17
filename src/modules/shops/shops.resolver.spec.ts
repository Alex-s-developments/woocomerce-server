import { Test, TestingModule } from '@nestjs/testing';
import { ShopsResolver } from './shops.resolver';
import { ShopsService } from './shops.service';

describe('ShopsResolver', () => {
  let resolver: ShopsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsResolver, ShopsService],
    }).compile();

    resolver = module.get<ShopsResolver>(ShopsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
