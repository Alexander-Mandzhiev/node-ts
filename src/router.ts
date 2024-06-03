import url from "url";
import userRoutes from "./user/user.routes.js";
import { ServerResponse } from "http";
const router = (req: any, res: ServerResponse) => {
    const { pathname } = url.parse(req.url, true);

    if (pathname === "/users" || pathname?.startsWith("/users/")) {
        userRoutes(req, res)
    } else {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(404);
        res.end(JSON.stringify({ message: `Этот маршрут не существует!` }));
    }
};

export default router