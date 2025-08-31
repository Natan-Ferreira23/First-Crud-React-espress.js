import express from 'express';
import pkg from "@prisma/client";
import cors from 'cors';

const app = express();
const {PrismaClient} = pkg;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/usuarios", async(req, res)=>{
    let users;
    if(req.query.id){
         users = await prisma.user.findMany(
            {
                where:{
                    id: req.query.id
                }
            }
        );
    }else{
         users = await prisma.user.findMany();
    }    

    return res.status(200).json(users);
});

app.post("/usuarios", async (req,res)=>{
    try{
        const user = await prisma.user.create({
            data:{
                email: req.body.email,
                name: req.body.name,
                age:req.body.age
            }
        })
        return res.status(200).json({mensagem:"Usuario criado com sucesso !",data:user});
    }catch(error){
        return res.status(401).json({mensagem:error});
    }    
});

app.put("/usuario/:id", async (req,res)=>{
     try{
        const user = await prisma.user.update({
            where:{
                id:req.params.id
            },
            data:{
                email: req.body.email,
                name: req.body.name,
                age:req.body.age
            }
        })
        return res.status(200).json({mensagem:"Usuario atualidazo com sucesso !",data:user});
    }catch(error){
        return res.status(401).json({mensagem:error});
    }   
});

app.delete("/usuario/:id", async (req,res)=>{
     try{
        const user = await prisma.user.delete({
            where:{
                id:req.params.id
            }
        })
        return res.status(200).json({mensagem:"Usuario deletado com sucesso !"});
    }catch(error){
        return res.status(401).json({mensagem:error});
    }   
});


app.listen(3000,(err)=>{
    console.log("Servidor rodando");
});