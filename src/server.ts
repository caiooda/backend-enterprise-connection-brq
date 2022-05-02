import bodyParser from "body-parser"
import cors from "cors"
import express, { Request, Response } from "express"
import { prismaClient } from "./middlewares/connection"

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Server is runing...");
});

app.get('/user', function (request: Request, response: Response) {
    try {
        prismaClient.user.findMany().then(
            (r: any) => response.send(r)
        )
    } catch (error: any) {
        response.status(501).json({ error: error })
    }
})

app.get('/user/name', function (request: Request, response: Response) {
    const name = String(request.query.name)
    try {
        prismaClient.user.findMany({
            where: {name: name}
        }).then(
            (r: any) => response.send(r)
        )
    } catch (error: any) {
        response.status(501).json({ error: error })
    }
})

app.get('/user/email', function (request: Request, response: Response) {
    const email = String(request.query.email)
    try {
        prismaClient.user.findMany({
            where: {email: email}
        }).then(
            (r: any) => response.send(r)
        )
    } catch (error: any) {
        response.status(501).json({ error: error })
    }
})

app.get('/user/cpf', function (request: Request, response: Response) {
    const cpf = String(request.query.cpf)
    try {
        prismaClient.user.findMany({
            where: {cpf: cpf}
        }).then(
            (r: any) => response.send(r)
        )
    } catch (error: any) {
        response.status(501).json({ error: error })
    }
})

app.get('/user/skills', function (request: Request, response: Response) {
    const skills = String(request.query.skills)
    try {
        prismaClient.user.findMany({
            where: {skills: skills}
        }).then(
            (r: any) => response.send(r)
        )
    } catch (error: any) {
        response.status(501).json({ error: error })
    }
})

app.get('/user/certifications', function (request: Request, response: Response) {
    const certifications = String(request.query.certifications)
    try {
        prismaClient.user.findMany({
            where: {certifications: certifications}
        }).then(
            (r: any) => response.send(r)
        )
    } catch (error: any) {
        response.status(501).json({ error: error })
    }
})

app.post('/user', function (request: Request, response: Response) {
    const { email, phone, gender, skills, birthday, cpf, certifications, name } = request.body
    console.log(request.body)
    prismaClient.user.create({
        data: {
            email: email,
            phone: phone,
            gender: gender,
            skills: skills,
            name: name,
            certifications: certifications,
            birthday: birthday,
            cpf: cpf
        }
    }).then(
        (r: any) => response.json(r)
    ).catch(
        (r: any) => {
            console.log("ERROR -->", r)
            response.status(501).json({
                error: r
            })
        }
    )
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("🚀 Server ready...")
})