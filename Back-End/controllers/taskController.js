const express = require('express');

const db = require("../database/connection");

const Response = require('../utils/formatResponse');

const router = express.Router();

router.get("/" , async ( req , res ) =>{

    const resp = new Response(res);

    let sql = "select * from tasks";

    try{

        const [tasks] = await db.query(sql);

        console.log(tasks);

        resp.code(200).ok(tasks)

    }catch(err){

        resp.code(500).error("error ocurred while retreiving tasks")

    }


})

router.post("/", async (req , res)=>{

    const resp = new Response(res);

    let sql = "insert into tasks(title,description,status) values ( ? , ? , ? )";

    try{

        await db.execute(sql , [ req.body.title , req.body.description , req.body.status  ]);

        resp.code(200).ok("task created")

    }catch(err){

        resp.code(500).error(" error ocurred while creating task")
    }

})

router.put("/:taskId" , async (req,res)=>{

    const resp = new Response(res)

    let taskId = req.params.taskId || null;

    if( isNaN(taskId) ){


        resp.code(400).error("Wrong Task Id")

        return;
    }


    let sql = "update tasks set title = ? , description = ? , status = ? where id = ?"

    try{

        await db.execute(sql , [ req.body.title , req.body.description , req.body.status , taskId ]);

        resp.code(200).ok("task updated")

    }catch(err){

        resp.code(500).error(" error ocurred while updating task")
    }


} )


router.delete("/:taskId" , async (req,res)=>{

    const resp = new Response(res)

    let taskId = req.params.taskId || null;

    if( isNaN(taskId) ){


        resp.code(400).error("Wrong Task Id")

        return;
    }

    let sql = "delete from tasks where id = ?";

    try{

        await db.execute(sql,[taskId]);

        resp.code(200).ok("task deleted")

    }catch(err){

        resp.code(500).error(" error ocurred while deleting task")
    }
})


module.exports = router;