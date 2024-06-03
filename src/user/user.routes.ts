import url from "url";
import { createUser, getAllUsers, getOneUser, updateUser, deleteUser } from "./user.controller.js";

const userRoutes = (req: any, res: any) => {
    const { pathname } = url.parse(req.url, true);
    const method = req.method;

    res.setHeader("Content-Type", "application/json");

    if (pathname === "/users" && method === "POST") {
        createUser(req, res)
    } else if (pathname === "/users" && method === "GET") {
        getAllUsers(res)
    } else if (pathname?.startsWith(`/users/`) && method === "GET") {
        getOneUser(req, res)
    } else if (pathname?.startsWith(`/users/`) && method === "PUT") {
        updateUser(req, res);
    } else if (pathname?.startsWith(`/users/`) && method === "DELETE") {
        deleteUser(req, res)
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: `Маршрут не существует!` }));
    }
};

export default userRoutes;
