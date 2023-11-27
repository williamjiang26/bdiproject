import User from '../models/user.model.js';
import { Comment, Score } from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
}

// update feedback
export const submitFeedback = async (req, res, next) => {
  const newFeedback = new Comment(req.body);
  try {
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback created successfully' });
  } catch (error) {
    next(error);
  }
}

// post score
export const submitScore = async (req, res, next) => {
  const data = await Score.find({username: 'willwonder31@gmail.com'})
  const newScore = new Score(req.body);
  try {
    await newScore.save();
    res.status(201).json({ message: 'Score created successfully' });
  } catch (error) {
    next(error);
  }
}

//get scores 
export const getScore = async (req, res, next) => {
  
  const data = await Score.find(req.body)
  // console.log(data)
  try {
    res.status(201).json({data: data});
  } catch (error) {
    next(error);
  }
}
