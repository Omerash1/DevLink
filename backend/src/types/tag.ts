// src/models/Tag.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  color: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: [true, 'Please add a tag name'],
    trim: true,
    minlength: [1, 'Tag name must be at least 1 character'],
    maxlength: [30, 'Tag name cannot exceed 30 characters']
  },
  color: {
    type: String,
    required: [true, 'Please add a color'],
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please add a valid hex color'],
    default: '#3B82F6'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique tag names per user
tagSchema.index({ name: 1, user: 1 }, { unique: true });

export default mongoose.model<ITag>('Tag', tagSchema);