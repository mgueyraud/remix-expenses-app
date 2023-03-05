import type { ActionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/models/auth.server";

export async function action({request}: ActionArgs){
    return await destroyUserSession(request, "/auth");
}