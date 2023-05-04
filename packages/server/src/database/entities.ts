import {
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Relation,
  Entity,
  Column
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ nullable: false, unique: true })
    recipeName!: string;

  @OneToMany(() => RecipeEntry, recipeEntry => recipeEntry.parentRecipe)
    recipeEntries!: Array<Relation<RecipeEntry>>;
}

@Entity()
export class RecipeEntry {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ nullable: false, type: 'float' })
    recipeAmount!: number;

  @ManyToOne(() => Recipe, recipe => recipe.recipeEntries)
    parentRecipe!: Recipe;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeEntries)
    ingredient!: Relation<Ingredient>;
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ nullable: false, unique: true })
    ingredientName!: string;

  @Column({ nullable: false, type: 'float' })
    purchasePrice!: number;

  @Column({ nullable: false, type: 'float' })
    purchaseAmount!: number;

  @OneToMany(() => RecipeEntry, recipe => recipe.ingredient)
    recipeEntries!: Array<Relation<RecipeEntry>>;
}
