import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  //Create a Category
  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.creatingCategory(createCategoryDTO);
  }

  //Get Categories
  async getCategories(): Promise<Category[]> {
    return await this.gettingCategories();
  }

  //Get a Category
  async getACategory(_id: string): Promise<Category> {
    return await this.gettingACategory(_id);
  }

  //Update a Category
  async updateACategory(
    category: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<void> {
    await this.updattingACategory(category, updateCategoryDTO);
  }

  /********************************************************************************************/

  //Creating a Category
  private async creatingCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const categoryToFind = await this.categoryModel.findOne({
      category: createCategoryDTO.category,
    });
    if (categoryToFind) {
      throw new BadRequestException('this category is already createn');
    }

    const newCategory = new this.categoryModel(createCategoryDTO);
    newCategory.save();
    return newCategory;
  }

  //Getting categories
  private async gettingCategories(): Promise<Category[]> {
    return await this.categoryModel.find({});
  }

  //Getting a category by category
  private async gettingACategory(category: string): Promise<Category> {
    const categoryToFind = await this.categoryModel.findOne({
      category: category,
    });
    if (!categoryToFind) {
      throw new NotFoundException('this category does not exist');
    }
    return categoryToFind;
  }

  //Updatting a category
  private async updattingACategory(
    category: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<void> {
    const categoryToCheck = await this.categoryModel.findOne({
      category: category,
    });
    if (!category) {
      throw new NotFoundException(
        `this category ${categoryToCheck}does not exist`,
      );
    }
    await this.categoryModel.findOneAndUpdate(
      { category: category },{$set:updateCategoryDTO}
      
    );
    // await this.categoryModel.findOneAndUpdate(
    //   { category: category },
    //   {$set : updateCategoryDTO}
    // ).exec();
  }
}
