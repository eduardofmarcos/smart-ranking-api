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
import { PlayersService } from './../players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  //Create a Category
  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.creatingCategory(createCategoryDTO);
  }

  //Assign a Player on a Category
  async assignPlayerOnCategory(params: string[]): Promise<void> {
    return await this.assigningAPlayerOnACategory(params);
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

  //Assigning a player on a category
  private async assigningAPlayerOnACategory(params: string[]): Promise<void> {
    const category: string = params['category'];
    const _id: string = params['_id'];

    const playerFound = await this.playersService.getPlayer(_id);

    //check if category exists
    const categoryToAddPlayer: Category = await this.categoryModel
      .findOne({ category: category })
      .exec();

    if (!categoryToAddPlayer) {
      throw new NotFoundException(
        'not possible to attribute the player to this category. Category does not exist.',
      );
    }

    //check if the player found is already register on the category to add
    const isPlayerAlreadyOnCategory = await this.categoryModel
      .find({ category: category })
      .where('players')
      .in(playerFound._id);

    if (isPlayerAlreadyOnCategory.length > 0) {
      throw new BadRequestException('this player is already registred');
    }

    //Add the player on category
    categoryToAddPlayer.players.push(playerFound._id);

    //Update the category
    await this.categoryModel.findOneAndUpdate(
      { category: category },
      { $set: categoryToAddPlayer },
    );
  }

  //Getting categories
  private async gettingCategories(): Promise<Category[]> {
    return await this.categoryModel.find({}).populate('players');
  }

  //Getting a category by category
  private async gettingACategory(category: string): Promise<Category> {
    const categoryToFind = await this.categoryModel
      .findOne({
        category: category,
      })
      .populate('players');
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
      { category: category },
      { $set: updateCategoryDTO },
    );
  }
}
