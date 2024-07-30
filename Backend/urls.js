const port = 3000;
const uri = `http://localhost:${port}`;
const route = {
    user: "/user",
    signup: "/signup",
    login: "/login",
    allusers: "/allusers",
    logadd: "/logadd",
    allspendinglogs: "/allspendinglogs",
    spendingLog: "/spendinglog",
};
const usersUri = `${uri}${route.users}`;
const signupUri = `${uri}${route.signup}`;
const loginUri = `${uri}${route.login}`;
const allusersUri = `${uri}${route.allusers}`;
const logaddUri = `${uri}${route.logadd}`;
const allspendinglogsUri = `${uri}${route.allspendinglogs}`;
const spendingLogUri = `${uri}${route.spendingLog}`;

module.exports = {
    uri,
    route,
    usersUri,
    signupUri,
    loginUri,
    allusersUri,
    logaddUri,
    allspendinglogsUri,
    spendingLogUri,
};
