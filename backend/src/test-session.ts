import { SessionService } from "./sessions/session.service";

const sessionService = new SessionService();

const sessionA = sessionService.createSession();
const sessionB = sessionService.createSession();

console.log(sessionA.id);
console.log(sessionB.id);

console.log(sessionService.getAllSessions().length);
