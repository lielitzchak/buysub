const Group = require('../Models/Group');
const User = require('../Models/User');

let getGroups = async (req,res) => {
   await Group.find({}).then((data) => {
        res.send(data)
})};

let getGroupById = async (req,res) => {
   await Group.findOne(req.params.id).then((data) => {
        res.send(data)
})};


let addGroup = async (req,res) => {

  const user = await User.findOne({_id : req.params.id});
  console.log(user);
  
  const newGroup = await Group.create(req.body);
  newGroup.members.push(user._id);
  user.groupName = newGroup.groupName;
  
  await newGroup.save();
  await user.save();
  
  res.send({message :'The Group added and Linked Sucessfully',newGroup})  
};



let updateGroup = async (req,res) => {
   await Group.findByIdAndUpdate({_id : req.params.id},req.body).then(() => {
        Group.findOne({_id : req.params.id}).then((data) => {
            res.send(data)
        })
    })
};
// let updateGroup = async (req,res) => {
//    await Group.findByIdAndUpdate({_id : req.params.id},req.body).then(() => {
//         Group.findOne({_id : req.params.id}).then((data) => {
//             res.send(data)
//         })
// })};

let deleteGroup = async (req,res) => {
   await Group.findByIdAndRemove({_id : req.params.id}).then((data) => {
        res.send(data)
})};



module.exports = {
    getGroups,
    getGroupById,
    addGroup,
    updateGroup,
    deleteGroup
};

