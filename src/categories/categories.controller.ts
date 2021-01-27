import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Param, Put } from '@nestjs/common';
import { CreateCategoryDTO} from './dtos/CreateCategory.dto';
import { Category } from './interfaces/category.interface'
import {CategoriesService} from './categories.service'
import {UpdateCategoryDTO} from './dtos/UpdateCategory.dto'


@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
      @Body()createCategoryDTO: CreateCategoryDTO) : Promise<Category>{
        return await this.categoriesService.createCategory(createCategoryDTO)
      }

  
  @Get()
  async getCategories(): Promise<Category[]>{
    return await this.categoriesService.getCategories()
  }

  @Get('/:category')
  async getACategory(@Param('category') category:string):Promise<Category>{
    return await this.categoriesService.getACategory(category)
  }

  @Put('/:category')
  async updateACategory(@Param('category') category: string, @Body()updateCategoryDTO: UpdateCategoryDTO) : Promise<void>{
    await this.categoriesService.updateACategory(category, updateCategoryDTO)
  }
  
}
