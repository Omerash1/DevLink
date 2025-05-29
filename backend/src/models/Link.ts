// src/models/Link.ts
import mongoose, { Document, Schema } from 'mongoose';

// Link interface
export interface ILink extends Document {
  title: string;
  url: string;
  description?: string;
  tags: mongoose.Types.ObjectId[];
  isFavorite: boolean;
  user: mongoose.Types.ObjectId;
  lastVisited?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Link schema
const linkSchema = new Schema<ILink>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    isFavorite: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    lastVisited: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Create indices for improved query performance
linkSchema.index({ user: 1, createdAt: -1 });
linkSchema.index({ user: 1, tags: 1 });
linkSchema.index({ user: 1, isFavorite: 1 });
linkSchema.index({ title: 'text', url: 'text', description: 'text' });

// Create and export Link model
const Link = mongoose.model<ILink>('Link', linkSchema);

export default Link;
