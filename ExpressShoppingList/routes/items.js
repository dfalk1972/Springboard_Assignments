const express = require("express");
const router = express.Router();
const items = require("../fakeDb");



router.get("/", function(req, res){
    return res.json(items)
})

router.post("/", function(req, res, next){
    try {
       if(! req.body || !req.body.name){
        return res.status(400).json({error: "Name is required"})
       }
        const newItem = { name: req.body.name, price: req.body.price};
       items.push(newItem);
       return res.status(201).json({added: newItem})
    } catch (error) {
        return next (error)
    }
   
})

router.get("/:name", function(req, res, next){
    try { const foundItem = items.find(item => item.name === req.params.name);
        if(!foundItem){
            return res.status(404).json({error: "Item not found"})
        }
        return res.status(200).json(foundItem)
    } catch (error) {
        return next (error)
    }
})

router.patch("/:name", function(req, res,next){
   try {
     if(! req.body){
        return res.status(400).json({error: "Request body is required"})
       }
        const updateItem = items.find(item => item.name === req.params.name);
        if(!updateItem){
            return res.status(404).json({error: "Item not found"})
        }
    if(req.body.name !== undefined) updateItem.name = req.body.name;
    if(req.body.price !== undefined) updateItem.price = req.body.price;
    return res.status(200).json({updated: updateItem})
        }
    catch (error) {
    return next (error)
   }}
)

router.delete("/:name", function(req, res,next){
    try {
        const deleteItem = items.findIndex(item => item.name === req.params.name);
        if(deleteItem === -1) {
            return res.status(404).json({error: "Item not found"})
        }
        items.splice(deleteItem,1)
        return res.status(200).json({message: "Deleted"})
    } catch (error) {
        return next (error)
    }
})


module.exports = router;
