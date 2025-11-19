const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll.js');
const { protect }=  require('../middleware/authMiddleware.js');
// protect will run first, if token is valid only then continue
//create
router.post('/', protect, async (req, res) =>{
    const {question, options} = req.body;
    if(!question || !options || options.length < 2){
        return res.status(400).json({
            message: 'Please provide a question and at least two options.'
        })
    }
    const pollOptions = options.map((optionsText) => ({text: optionsText, votes: 0}));
    try{
        const poll = new Poll({
            question, 
            options: pollOptions,
            user: req.user._id,
        });
        const createdPoll = await poll.save();
        res.status(201).json(createdPoll);
    } 
    catch(error){
        console.error(error);
        res.status(500).json({message:'Server error while creeating poll'});
    }
});
router.get('/', async (req, res) =>{
    try{
        const polls = await Poll.find()
        .sort({createdAt: -1})
        .populate('user', 'username');  
        res.status(200).json(polls);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'Server error whie fetching polls!'})
    }
});

//voting
router.post('/:id/vote', protect, async (req, res) => {
  console.log("Incoming Vote Request!");  
  const { optionIndex } = req.body; 
  const userId = req.user._id;
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    if (poll.votedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already voted on this poll' });
    }
    if (optionIndex === undefined || optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option index' });
    }
    poll.options[optionIndex].votes += 1;
    poll.votedBy.push(userId);
    await poll.save();
    res.status(200).json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while voting' });
  }
});

// delete a pol, only creator can delete
router.delete('/:id', protect, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    if (poll.user.toString() !== req.user._id.toString() && req.user.username.toLowerCase() !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this poll' });
    }
    await poll.deleteOne();
    res.status(200).json({ message: 'Poll deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting poll' });
  }
});

module.exports=router;