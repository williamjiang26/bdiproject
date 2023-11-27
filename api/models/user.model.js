import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    feedback: {
      type: String,
      required: true,
      unique: false,
    }
  },
  { timestamps: true }
)

const scoreSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema);
export const Comment = mongoose.model('Comment', commentSchema);
export const Score = mongoose.model('Score', scoreSchema);
export default User;

