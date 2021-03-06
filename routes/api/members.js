const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const members = require('../../Members')

//This route gets all members
router.get('/', (req,res) => {
    res.json(members)
})

//Get Single Member
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        res.json(members.filter(member =>  member.id === parseInt(req.params.id)))
    }else {
        res.status(400).json({msg: `Memeber not found of ID ${req.params.id}`})
    }
})

//Create member
router.post('/',(req,res) =>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include name and email'})
    }
    members.push(newMember)
    res.json(members)
    // res.redirect('/')
})

//Update member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        const updatedMember = req.body;
        members.forEach(member=> {
            if(member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name
                member.email = updatedMember.email ? updatedMember.email : member.email

                res.json({msg: 'Member updated', member})
            }
        })
    }else {
        res.status(400).json({msg: `Memeber not found of ID ${req.params.id}`})
    }
})

//Delete Member
router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        res.json({msg: 'Member Delete ',members: members.filter(member =>  member.id !== parseInt(req.params.id))})
    }else {
        res.status(400).json({msg: `Memeber not found of ID ${req.params.id}`})
    }
})

module.exports = router