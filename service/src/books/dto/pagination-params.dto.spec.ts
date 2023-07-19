import { plainToInstance } from 'class-transformer';
import { PaginationParamsDto } from './pagination-params.dto';
import { validate } from 'class-validator';

it('should throw when page is not a number', async () => {
  const params = { page: 'asdf' };
  const paramsInstance = plainToInstance(PaginationParamsDto, params);
  const errors = await validate(paramsInstance);

  expect(errors.length).not.toBe(0);
});

it('should throw when limit is not a number', async () => {
  const params = { limit: 'asdf' };
  const paramsInstance = plainToInstance(PaginationParamsDto, params);
  const errors = await validate(paramsInstance);

  expect(errors.length).not.toBe(0);
});

it('should throw when page is less than 1', async () => {
  const params = { page: -1 };
  const paramsInstance = plainToInstance(PaginationParamsDto, params);
  const errors = await validate(paramsInstance);

  expect(errors.length).not.toBe(0);
});

it('should throw when limit is less than 1', async () => {
  const params = { limit: -1 };
  const paramsInstance = plainToInstance(PaginationParamsDto, params);
  const errors = await validate(paramsInstance);

  expect(errors.length).not.toBe(0);
});

it('should throw when limit is greater than 100', async () => {
  const params = { limit: 101 };
  const paramsInstance = plainToInstance(PaginationParamsDto, params);
  const errors = await validate(paramsInstance);

  expect(errors.length).not.toBe(0);
});
