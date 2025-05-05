import moogose from 'mongoose';

const categorySchema = new moogose.Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
});

const Category = moogose.model('Category', categorySchema);
export default Category;
