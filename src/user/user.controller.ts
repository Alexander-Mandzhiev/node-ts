import { ClientRequest, ServerResponse } from "http";
import { create, getAll, getOne, update, deleteU } from "./user.service.js"

export const createUser = async (req: ClientRequest, res: ServerResponse) => {
    let body = "";
    req.on("data", (chunc: any) => {
        body += chunc;
    });
    req.on("end", async () => {
        const user = JSON.parse(body)
        const name = user.name;
        const age = +user.age;

        if (name && age) {
            const createUser = await create(user);
            res.writeHead(201);
            res.end(JSON.stringify(createUser));
        } else {
            res.writeHead(400);
            res.end(
                JSON.stringify({ message: `Необходимы имя и возраст пользователя!` })
            );
        }
    });
}

export const getAllUsers = async (res: ServerResponse) => {
    res.writeHead(200);
    res.end(JSON.stringify(await getAll()));
};

export const getOneUser = async (req: Request, res: ServerResponse) => {
    const id = parseInt(req.url.split("/")[2]);
    const user = await getOne(id);
    if (user) {
        res.writeHead(200);
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: `Пользователь не существует!` }));
    }
}

export const updateUser = async (req: any, res: ServerResponse) => {
    const id = parseInt(req.url.split("/")[2]);
    let body = "";
    req.on("data", (chunc: any) => {
        body += chunc;
    });

    req.on("end", async () => {
        const user = JSON.parse(body)
        const updatedUser = await update(id, user);
        if (updatedUser) {
            res.writeHead(201);
            res.end(JSON.stringify(updatedUser));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `Пользователь не существует!` }));
        }
    });
}

export const deleteUser = async (req: Request, res: ServerResponse) => {
    const id = parseInt(req.url.split("/")[2]);
    const success = await deleteU(id);
    if (success) {
        res.writeHead(204);
        console.log(`Пользователь удалён!`);
        res.end(JSON.stringify({ message: `Пользователь удалён!` }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: `Пользователь не существует!` }));
    }
}