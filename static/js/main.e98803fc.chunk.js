(this.webpackJsonpTodolist=this.webpackJsonpTodolist||[]).push([[0],{113:function(t,e,n){t.exports=n(141)},141:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(11),o=n.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s,l,c=n(8),d=n(7),u=n(15),p=n(31),f=n(10),b=n.n(f),m=n(20),h=n(88),g=n.n(h).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"dd304e28-3d68-4d00-a172-a57bb7d47656"}}),v=function(){return g.get("todo-lists")},j=function(t){return g.post("todo-lists",{title:t})},k=function(t,e){return g.put("todo-lists/".concat(t),{title:e})},O=function(t){return g.delete("todo-lists/".concat(t))},x=function(t){return g.get("/todo-lists/".concat(t,"/tasks"))},y=function(t,e){return g.post("/todo-lists/".concat(t,"/tasks"),{title:e})},E=function(t,e,n){return g.put("/todo-lists/".concat(t,"/tasks/").concat(e),n)},w=function(t,e){return g.delete("/todo-lists/".concat(t,"/tasks/").concat(e))},I=function(t){return g.post("auth/login",t)},C=function(){return g.delete("auth/login")},T=function(){return g.get("auth/me")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(s||(s={})),function(t){t[t.low=0]="low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(l||(l={}));var L,S,D,M,z,F,A,V,W,P,H,R,B,U,_,N,q,Z,J,K,$,Y,G=function(t,e){t.messages.length?e(dt({error:t.messages[0]})):e(dt({error:"Sorry. Undefined error have occurred!"})),e(ct({status:"failed"}))},Q=function(t,e){e(dt(t.message?t.message:"Sorry. Undefined error have occurred!")),e(ct({status:"failed"}))},X=n(16),tt=Object(X.b)("auth/login",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(ct({status:"loading"})),t.next=3,I(e);case 3:if(a=t.sent,t.prev=4,0!==a.data.resultCode){t.next=10;break}return n.dispatch(ct({status:"succeeded"})),t.abrupt("return");case 10:return G(a.data,n.dispatch),t.abrupt("return",n.rejectWithValue({errors:a.data.messages,fieldsErrors:a.data.fieldsErrors}));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(4),r=t.t0,Q(r,n.dispatch),t.abrupt("return",n.rejectWithValue({errors:[r.message],fieldsErrors:void 0}));case 19:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e,n){return t.apply(this,arguments)}}()),et=Object(X.b)("auth/logout",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(ct({status:"loading"})),t.prev=1,t.next=4,C();case 4:if(0!==(a=t.sent).data.resultCode){t.next=10;break}return n.dispatch(ct({status:"succeeded"})),t.abrupt("return");case 10:return G(a.data,n.dispatch),t.abrupt("return",n.rejectWithValue({}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),Q(t.t0,n.dispatch),t.abrupt("return",n.rejectWithValue({}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,n){return t.apply(this,arguments)}}()),nt=Object(X.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedIn:function(t,e){t.isLoggedIn=e.payload.value}},extraReducers:function(t){t.addCase(tt.fulfilled,(function(t){t.isLoggedIn=!0})),t.addCase(et.fulfilled,(function(t){t.isLoggedIn=!1}))}}),at=nt.reducer,rt=nt.actions.setIsLoggedIn,it=Object(X.b)("app/initializeApp",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.dispatch,t.next=3,T();case 3:0===t.sent.data.resultCode&&a(rt({value:!0}));case 5:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),ot=Object(X.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatus:function(t,e){t.status=e.payload.status},setAppError:function(t,e){t.error=e.payload.error}},extraReducers:function(t){t.addCase(it.fulfilled,(function(t){t.isInitialized=!0}))}}),st=ot.reducer,lt=ot.actions,ct=lt.setAppStatus,dt=lt.setAppError,ut=Object(X.b)("todolists/fetchToDoLists",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a,r,i;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.dispatch,r=n.rejectWithValue,a(ct({status:"loading"})),t.next=4,v();case 4:return i=t.sent,t.prev=5,a(ct({status:"succeeded"})),t.abrupt("return",{todoLists:i.data});case 10:return t.prev=10,t.t0=t.catch(5),Q(t.t0,a),t.abrupt("return",r(t.t0));case 14:case"end":return t.stop()}}),t,null,[[5,10]])})));return function(e,n){return t.apply(this,arguments)}}()),pt=Object(X.b)("todolists/createToDoList",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a,r,i;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.dispatch,r=n.rejectWithValue,a(ct({status:"loading"})),t.next=4,j(e.title);case 4:return i=t.sent,t.prev=5,a(ct({status:"succeeded"})),t.abrupt("return",{toDoList:i.data.data.item});case 10:return t.prev=10,t.t0=t.catch(5),Q(t.t0,a),t.abrupt("return",r(t.t0));case 14:case"end":return t.stop()}}),t,null,[[5,10]])})));return function(e,n){return t.apply(this,arguments)}}()),ft=Object(X.b)("todolists/deleteToDoList",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=n.dispatch)(ct({status:"loading"})),a(jt({todolistId:e.todolistId,status:"loading"})),t.next=5,O(e.todolistId);case 5:return a(ct({status:"succeeded"})),t.abrupt("return",{todolistId:e.todolistId});case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),bt=Object(X.b)("todolists/updateToDoListTitle",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=n.dispatch)(ct({status:"loading"})),t.next=4,k(e.todolistId,e.title);case 4:return a(ct({status:"succeeded"})),t.abrupt("return",e);case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),mt=Object(X.c)({name:"todolists",initialState:[],reducers:{changeToDoListFilter:function(t,e){var n=t.findIndex((function(t){return t.id===e.payload.todolistId}));t[n].filter=e.payload.filter},changeToDoListEntityStatus:function(t,e){var n=t.findIndex((function(t){return t.id===e.payload.todolistId}));t[n].entityStatus=e.payload.status}},extraReducers:function(t){t.addCase(ut.fulfilled,(function(t,e){return e.payload.todoLists.map((function(t){return Object(p.a)(Object(p.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(pt.fulfilled,(function(t,e){t.unshift(Object(p.a)(Object(p.a)({},e.payload.toDoList),{},{filter:"all",entityStatus:"idle"}))})),t.addCase(ft.fulfilled,(function(t,e){var n=t.findIndex((function(t){return t.id===e.payload.todolistId}));n>-1&&t.splice(n,1)})),t.addCase(bt.fulfilled,(function(t,e){var n=t.findIndex((function(t){return t.id===e.payload.todolistId}));t[n].title=e.payload.title}))}}),ht=mt.reducer,gt=mt.actions,vt=gt.changeToDoListFilter,jt=gt.changeToDoListEntityStatus,kt=Object(X.b)("tasks/fetchTasks",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(ct({status:"loading"})),t.next=3,x(e);case 3:return a=t.sent,r=a.data.items,n.dispatch(ct({status:"succeeded"})),t.abrupt("return",{tasks:r,toDoListId:e});case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),Ot=Object(X.b)("tasks/deleteTask",function(){var t=Object(m.a)(b.a.mark((function t(e,n){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(ct({status:"loading"})),t.prev=1,t.next=4,w(e.toDoListId,e.taskId);case 4:return n.dispatch(ct({status:"succeeded"})),t.abrupt("return",{taskId:e.taskId,toDoListId:e.toDoListId});case 8:return t.prev=8,t.t0=t.catch(1),Q(t.t0,n.dispatch),t.abrupt("return",n.rejectWithValue(t.t0));case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e,n){return t.apply(this,arguments)}}()),xt=Object(X.b)("tasks/createTask",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a,r,i,o;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.dispatch,r=n.rejectWithValue,a(ct({status:"loading"})),t.next=4,y(e.todolistId,e.title);case 4:if(i=t.sent,t.prev=5,0!==i.data.resultCode){t.next=12;break}return o=i.data.data.item,a(ct({status:"succeeded"})),t.abrupt("return",{newTask:o});case 12:return G(i.data,a),t.abrupt("return",r(null));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(5),Q(t.t0,a),t.abrupt("return",r(null));case 20:case"end":return t.stop()}}),t,null,[[5,16]])})));return function(e,n){return t.apply(this,arguments)}}()),yt=Object(X.b)("tasks/updateTaskTC",function(){var t=Object(m.a)(b.a.mark((function t(e,n){var a,r,i,o,s,l,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=n.dispatch,r=n.getState,i=n.rejectWithValue,a(ct({status:"loading"})),a(It({taskId:e.taskId,todolistId:e.todolistId,status:"loading"})),o=r(),s=o.tasks[e.todolistId].find((function(t){return t.id===e.taskId}))){t.next=9;break}throw a(ct({status:"failed"})),a(It({taskId:e.taskId,todolistId:e.todolistId,status:"failed"})),new Error("Task not found in the state");case 9:return l=Object(p.a)({title:s.title,description:s.description,status:s.status,priority:s.priority,startDate:s.startDate,deadline:s.deadline},e.model),t.next=12,E(e.todolistId,e.taskId,l);case 12:if(c=t.sent,t.prev=13,0!==c.data.resultCode){t.next=20;break}return a(ct({status:"succeeded"})),a(It({taskId:e.taskId,todolistId:e.todolistId,status:"succeeded"})),t.abrupt("return",e);case 20:return G(c.data,a),t.abrupt("return",i(null));case 22:t.next=28;break;case 24:return t.prev=24,t.t0=t.catch(13),Q(t.t0,a),t.abrupt("return",i(null));case 28:case"end":return t.stop()}}),t,null,[[13,24]])})));return function(e,n){return t.apply(this,arguments)}}()),Et=Object(X.c)({name:"tasks",initialState:{},reducers:{setTaskEntityStatus:function(t,e){var n=t[e.payload.todolistId],a=n.findIndex((function(t){return t.id===e.payload.taskId}));a>-1&&(n[a]=Object(p.a)(Object(p.a)({},n[a]),{},{entityStatus:e.payload.status}))}},extraReducers:function(t){t.addCase(pt.fulfilled,(function(t,e){t[e.payload.toDoList.id]=[]})),t.addCase(ft.fulfilled,(function(t,e){delete t[e.payload.todolistId]})),t.addCase(ut.fulfilled,(function(t,e){e.payload.todoLists.forEach((function(e){t[e.id]=[]}))})),t.addCase(kt.fulfilled,(function(t,e){t[e.payload.toDoListId]=e.payload.tasks})),t.addCase(Ot.fulfilled,(function(t,e){var n=t[e.payload.toDoListId],a=n.findIndex((function(t){return t.id===e.payload.taskId}));a>-1&&n.splice(a,1)})),t.addCase(xt.fulfilled,(function(t,e){t[e.payload.newTask.todoListId].unshift(e.payload.newTask)})),t.addCase(yt.fulfilled,(function(t,e){var n=t[e.payload.todolistId],a=n.findIndex((function(t){return t.id===e.payload.taskId}));a>-1&&(n[a]=Object(p.a)(Object(p.a)({},n[a]),e.payload.model))}))}}),wt=Et.reducer,It=Et.actions.setTaskEntityStatus,Ct=n(65),Tt=n(48),Lt=n(172),St=n(182),Dt=n(173),Mt=r.a.memo((function(t){var e=t.addItem,n=t.disabled,i=void 0!==n&&n,o=Object(Ct.a)(t,["addItem","disabled"]),s=Object(a.useState)(""),l=Object(Tt.a)(s,2),c=l[0],d=l[1],u=Object(a.useState)(null),p=Object(Tt.a)(u,2),f=p[0],b=p[1],m=function(){var t=c.trim();t?(e(t),d("")):b("Title is required!")};return r.a.createElement(zt,null,r.a.createElement(St.a,Object.assign({value:c,onChange:function(t){null!==f&&b(null),b(null),d(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&m()},error:!!f,helperText:f,disabled:i},o)),r.a.createElement(Ft,{onClick:m,color:"primary",disabled:i},r.a.createElement(Lt.a,null)))})),zt=d.b.div(L||(L=Object(c.a)(["\n  position: relative;\n\n  display: flex;\n  align-items: center;\n  width: 100%;\n"]))),Ft=Object(d.b)(Dt.a)(S||(S=Object(c.a)(["\n  margin-left: 10px;\n"]))),At=r.a.memo((function(t){var e=Object(a.useState)(!1),n=Object(Tt.a)(e,2),i=n[0],o=n[1],s=Object(a.useState)(t.title),l=Object(Tt.a)(s,2),c=l[0],d=l[1];return i?r.a.createElement(Vt,{onBlur:function(){o(!1),c.trim()&&t.changeTitle(c.trim())},onChange:function(t){return d(t.currentTarget.value)},variant:"standard",value:c,autoFocus:!0,disabled:t.disabled}):r.a.createElement("span",{onDoubleClick:function(){t.disabled||o(!0)}},t.title)})),Vt=Object(d.b)(St.a)(D||(D=Object(c.a)(["\n  position: relative;\n\n  & .MuiInputBase-input {\n    padding: 0;\n    font-size: 14px;\n  }\n\n  & .MuiInput-underline:before {\n    position: absolute;\n    top: 20px;\n  }\n\n  & .MuiInput-underline:after {\n    position: absolute;\n    top: 20px;\n  }\n"]))),Wt=n(174),Pt=n(175),Ht=n(176),Rt=n(185),Bt=r.a.memo((function(t){var e=Object(a.useCallback)((function(){t.removeTask(t.task.id,t.toDoListId)}),[]),n=Object(a.useCallback)((function(e){t.changeTaskStatus(t.task.id,e.currentTarget.checked?s.Completed:s.New,t.toDoListId)}),[]),i=Object(a.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.toDoListId)}),[]);return r.a.createElement(Ut,{key:t.task.id},r.a.createElement(Nt,{checked:t.task.status===s.Completed,onChange:n,disabled:"loading"===t.task.entityStatus||"loading"===t.toDoListEntityStatus}),r.a.createElement(_t,{taskStatus:t.task.status},r.a.createElement(At,{title:t.task.title,changeTitle:i,disabled:"loading"===t.task.entityStatus||"loading"===t.toDoListEntityStatus})),r.a.createElement(qt,{onClick:e,disabled:"loading"===t.task.entityStatus||"loading"===t.toDoListEntityStatus},r.a.createElement(Wt.a,null)))})),Ut=d.b.div(M||(M=Object(c.a)(["\n  position: relative;\n\n  display: flex;\n  align-items: center;\n\n  width: 100%;\n"]))),_t=d.b.div(z||(z=Object(c.a)(["\n  width: 80%;\n\n  padding-left: 45px;\n\n  opacity: ",";\n"])),(function(t){return t.taskStatus===s.Completed?.5:1})),Nt=Object(d.b)(Rt.a)(F||(F=Object(c.a)(["\n  position: absolute;\n  z-index: 1;\n  top: -10px;\n\n  opacity: ",";\n  margin-right: 5px;\n"])),(function(t){return t.taskStatus===s.Completed?.5:1})),qt=Object(d.b)(Dt.a)(A||(A=Object(c.a)(["\n  position: absolute;\n  right: 0;\n  top: -15px;\n"]))),Zt=r.a.memo((function(t){var e=t.demoMode,n=void 0!==e&&e,i=Object(Ct.a)(t,["demoMode"]),o=Object(u.b)();Object(a.useEffect)((function(){n||o(kt(i.todolist.id))}),[]);var l=Object(a.useCallback)((function(t){i.addTask(t,i.todolist.id)}),[]),c=Object(a.useCallback)((function(){i.removeTodolist(i.todolist.id)}),[]),d=Object(a.useCallback)((function(t){i.changeTodoListTitle(i.todolist.id,t)}),[]),p=Object(a.useCallback)((function(){i.changeFilter(i.todolist.id,"all")}),[]),f=Object(a.useCallback)((function(){i.changeFilter(i.todolist.id,"active")}),[]),b=Object(a.useCallback)((function(){i.changeFilter(i.todolist.id,"completed")}),[]),m=i.tasks;return"active"===i.todolist.filter&&(m=i.tasks.filter((function(t){return t.status===s.New}))),"completed"===i.todolist.filter&&(m=i.tasks.filter((function(t){return t.status===s.Completed}))),r.a.createElement(Jt,null,r.a.createElement(Kt,null,r.a.createElement($t,null,r.a.createElement(At,{title:i.todolist.title,changeTitle:d,disabled:"loading"===i.todolist.entityStatus})),r.a.createElement(Yt,{onClick:c,disabled:"loading"===i.todolist.entityStatus},r.a.createElement(Wt.a,null))),r.a.createElement(Xt,null,r.a.createElement(Mt,{addItem:l,label:"Add task",disabled:"loading"===i.todolist.entityStatus})),m.map((function(t){return r.a.createElement(te,{key:t.id},r.a.createElement(Bt,{task:t,toDoListId:i.todolist.id,toDoListEntityStatus:i.todolist.entityStatus,changeTaskStatus:i.changeTaskStatus,changeTaskTitle:i.changeTaskTitle,removeTask:i.removeTask}))})),r.a.createElement(Gt,null,r.a.createElement(Qt,{color:"all"===i.todolist.filter?"primary":"default",onClick:p,size:"small",disabled:"loading"===i.todolist.entityStatus},"All"),r.a.createElement(Qt,{color:"active"===i.todolist.filter?"primary":"default",onClick:f,size:"small",disabled:"loading"===i.todolist.entityStatus},"Active"),r.a.createElement(Qt,{color:"completed"===i.todolist.filter?"primary":"default",onClick:b,size:"small",disabled:"loading"===i.todolist.entityStatus},"Completed")))})),Jt=Object(d.b)(Pt.a)(V||(V=Object(c.a)(["\n  position: relative;\n\n  margin-left: 25px;\n  margin-bottom: 25px;\n  padding: 30px;\n\n  width: 380px;\n  height: 100%;\n"]))),Kt=d.b.div(W||(W=Object(c.a)(["\n  display: flex;\n  align-items: flex-start;\n\n  margin-bottom: 20px;\n"]))),$t=d.b.h3(P||(P=Object(c.a)(["\n  width: 80%;\n"]))),Yt=Object(d.b)(Dt.a)(H||(H=Object(c.a)(["\n  position: absolute;\n  top: 15px;\n  right: 30px;\n"]))),Gt=d.b.div(R||(R=Object(c.a)(["\n  display: flex;\n  justify-content: space-between;\n  justify-self: end;\n"]))),Qt=Object(d.b)(Ht.a)(B||(B=Object(c.a)(["\n  padding: 7px 22px;\n"]))),Xt=d.b.div(U||(U=Object(c.a)(["\n  margin-bottom: 20px;\n"]))),te=d.b.div(_||(_=Object(c.a)(["\n  margin-bottom: 20px;\n\n  :last-child {\n    margin-bottom: 30px;\n  }\n"]))),ee=d.b.div(N||(N=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  \n  padding: 0 60px;\n  \n  width: 100%;\n  height: 100%;\n"]))),ne=n(14),ae=function(t){var e=t.demoMode,n=void 0!==e&&e,i=Object(u.b)(),o=Object(u.c)((function(t){return t.todolists})),s=Object(u.c)((function(t){return t.tasks})),l=Object(u.c)((function(t){return t.auth.isLoggedIn}));Object(a.useEffect)((function(){n&&l||i(ut())}),[]);var c=Object(a.useCallback)((function(t){i(pt({title:t}))}),[]),d=Object(a.useCallback)((function(t,e){i(xt({title:t,todolistId:e}))}),[]),p=Object(a.useCallback)((function(t,e,n){i(yt({taskId:t,model:{status:e},todolistId:n}))}),[]),f=Object(a.useCallback)((function(t,e){i(Ot({taskId:t,toDoListId:e}))}),[]),b=Object(a.useCallback)((function(t){i(ft({todolistId:t}))}),[]),m=Object(a.useCallback)((function(t,e){i(vt({todolistId:t,filter:e}))}),[]),h=Object(a.useCallback)((function(t,e,n){i(yt({taskId:t,model:{title:e},todolistId:n}))}),[]),g=Object(a.useCallback)((function(t,e){i(bt({todolistId:t,title:e}))}),[]);return l?r.a.createElement(r.a.Fragment,null,r.a.createElement(re,null,r.a.createElement(ie,null,r.a.createElement(Mt,{addItem:c,label:"Add to do list"}))),r.a.createElement(ee,null,r.a.createElement(oe,null,o.map((function(t){var e=s[t.id];return r.a.createElement(Zt,{demoMode:n,key:t.id,todolist:t,tasks:e,removeTask:f,addTask:d,changeFilter:m,changeTaskStatus:p,removeTodolist:b,changeTaskTitle:h,changeTodoListTitle:g})}))))):r.a.createElement(ne.a,{to:"/login"})},re=d.b.header(q||(q=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  \n  box-shadow: ",";\n\n  margin-bottom: 30px;\n\n  width: 100vw;\n  height: 100px;\n"])),(function(t){return t.theme.shadows[4]})),ie=d.b.div(Z||(Z=Object(c.a)(["\n  width: 30%;\n  min-width: 300px;\n"]))),oe=d.b.div(J||(J=Object(c.a)(["\n  display: flex;\n  flex-wrap: wrap;\n\n  // The margin left is negative to compensate for the positive margin of the ToDoListCard... \n  margin-left: -25px;\n  height: 100%;\n\n  @media (max-width: 2120px) {\n    width: 1620px;\n  }\n  \n  @media (max-width: 1715px) {\n    width: 1215px;\n  }\n  \n  @media (max-width: 1310px) {\n    width: 810px;\n  }\n\n  @media (max-width: 905px) {\n    width: 405px;\n  }\n"]))),se=n(178),le=n(179),ce=n(188),de=n(98),ue=n(27),pe=n(51),fe=Object(ue.c)({todolists:ht,tasks:wt,app:st,auth:at}),be=Object(X.a)({reducer:fe,middleware:function(t){return t().prepend(pe.a)}});window.store=be;var me,he,ge=function(){var t=Object(u.b)(),e=Object(de.a)({validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Email is required",t.password?t.password.length<3&&(e.password="Password must be higher then 3"):e.password="Password is required",e},initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(){var e=Object(m.a)(b.a.mark((function e(n,a){var r,i,o,s,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(tt(n));case 2:r=e.sent,tt.rejected.match(r)&&(null===(i=r.payload)||void 0===i||null===(o=i.fieldsErrors)||void 0===o?void 0:o.length)&&(l=null===(s=r.payload)||void 0===s?void 0:s.fieldsErrors[0],a.setFieldError(l.field,l.error));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()});return r.a.createElement(ve,{onSubmit:e.handleSubmit},r.a.createElement("div",null,r.a.createElement("p",null,"Use my test account credentials to log in:"),r.a.createElement("p",null,"Email: dev000test111@gmail.com"),r.a.createElement("p",null,"Password: react-redux-100%")),r.a.createElement(je,null,r.a.createElement(St.a,Object.assign({label:"Email"},e.getFieldProps("email"))),e.errors.email?r.a.createElement(ke,null,e.errors.email):null),r.a.createElement(je,null,r.a.createElement(St.a,Object.assign({label:"Password"},e.getFieldProps("password"),{type:"password"})),e.errors.password?r.a.createElement(ke,null,e.errors.password):null),r.a.createElement(ce.a,{label:"Remember me",control:r.a.createElement(Rt.a,Object.assign({},e.getFieldProps("rememberMe"),{checked:e.values.rememberMe}))}),r.a.createElement(Ht.a,{variant:"contained",color:"primary",type:"submit"},"Login"))},ve=d.b.form(K||(K=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  flex-basis: 400px;\n"]))),je=d.b.div($||($=Object(c.a)(["\n  position: relative;\n\n  margin-bottom: 35px;\n"]))),ke=d.b.div(Y||(Y=Object(c.a)(["\n  position: absolute;\n  bottom: -23px;\n  color: ",";\n"])),(function(t){return t.theme.palette.error.main})),Oe=function(){return Object(u.c)((function(t){return t.auth.isLoggedIn}))?r.a.createElement(ne.a,{to:"/"}):r.a.createElement(xe,null,r.a.createElement(ee,null,r.a.createElement(ye,null,r.a.createElement(ge,null))))},xe=d.b.div(me||(me=Object(c.a)(["\n  height: calc(100vh - 100px);\n"]))),ye=d.b.div(he||(he=Object(c.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  \n  margin-bottom: 200px;\n"]))),Ee=n(187),we=n(184);function Ie(t){return r.a.createElement(we.a,Object.assign({elevation:6,variant:"filled"},t))}function Ce(){var t=Object(u.c)((function(t){return t.app.error})),e=Object(u.b)(),n=function(t,n){"clickaway"!==n&&e(dt({error:null}))},a=null!==t;return r.a.createElement(Ee.a,{open:a,autoHideDuration:4e3,onClose:n},r.a.createElement(Ie,{onClose:n,severity:"error"},t))}var Te,Le,Se,De,Me,ze,Fe=n(177),Ae=function(){return r.a.createElement(Ve,null,r.a.createElement(Fe.a,null))},Ve=d.b.div(Te||(Te=Object(c.a)(["\n  position: absolute;\n  z-index: 100;\n  \n  display: flex;\n  align-items: center;\n  justify-content: center;\n  \n  width: 100vw;\n  height: 100vh;\n  \n  background-color: ",";\n"])),(function(t){return t.theme.palette.grey[50]})),We=function(t){var e=t.demoMode,n=void 0!==e&&e,i=Object(u.c)((function(t){return t.app.status})),o=Object(u.c)((function(t){return t.app.isInitialized})),s=Object(u.c)((function(t){return t.auth.isLoggedIn})),l=Object(u.b)();Object(a.useEffect)((function(){l(it())}),[]);var c=Object(a.useCallback)((function(){l(et())}),[]);return o?r.a.createElement("div",null,r.a.createElement(Pe,{color:"primary"},"loading"===i&&r.a.createElement(Ue,{color:"secondary"}),r.a.createElement(ee,null,r.a.createElement(He,null,r.a.createElement(Re,null,r.a.createElement(Be,null),r.a.createElement("h1",null,"ToDoList")),s&&r.a.createElement(Ht.a,{variant:"contained",color:"secondary",onClick:c},"Log out")))),r.a.createElement(ne.d,null,r.a.createElement(ne.b,{exact:!0,path:"/",render:function(){return r.a.createElement(ae,{demoMode:n})}}),r.a.createElement(ne.b,{path:"/login",render:function(){return r.a.createElement(Oe,null)}}),r.a.createElement(ne.b,{path:"/404",render:function(){return r.a.createElement("p",null,"Make a 404 page my friend :)")}}),r.a.createElement(ne.a,{from:"*",to:"/404"})),r.a.createElement(Ce,null)):r.a.createElement(Ae,null)},Pe=Object(d.b)(se.a)(Le||(Le=Object(c.a)(["\n  position: relative;\n  z-index: 100;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  \n  width: 100%;\n  height: 100px;\n"]))),He=d.b.div(Se||(Se=Object(c.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  \n  width: 100%;\n"]))),Re=d.b.div(De||(De=Object(c.a)(["\n  display: flex;\n  align-items: center;\n"]))),Be=Object(d.b)((function(t){return a.createElement("svg",Object.assign({id:"to-do-list_svg__Capa_1",height:512,viewBox:"0 0 512 512",width:512,xmlns:"http://www.w3.org/2000/svg"},t),a.createElement("path",{d:"M391 452h60V0H121v61h270z"}),a.createElement("path",{d:"M166 512h195V91H61v316h105zm45-316h105v30H211zm0 75h105v30H211zm0 75h105v30H211zm-94.395-175.605L136 189.789l34.395-34.395 21.211 21.211L136 232.211l-40.605-40.605zm0 75L136 264.789l34.395-34.395 21.211 21.211L136 307.211l-40.605-40.605zM136 382.211l-40.605-40.605 21.211-21.211L136 339.789l34.395-34.395 21.211 21.211z"}),a.createElement("path",{d:"M136 437H84.789L136 488.211z"}))}))(Me||(Me=Object(c.a)(["\n  margin-right: 20px;\n  \n  width: 40px;\n  height: 40px;\n  \n  fill: ",";\n"])),(function(t){return t.theme.palette.grey[50]})),Ue=Object(d.b)(le.a)(ze||(ze=Object(c.a)(["\n  position: absolute;\n  bottom: 0;\n\n  width: 100%;\n"]))),_e=n(183),Ne=n(180),qe=n(50),Ze=n(181),Je=n(99),Ke=Object(Je.a)({palette:{primary:{main:"#e5731b"},secondary:{main:"#4371be"},grey:{50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121"},error:{main:"#ba1212"}},shape:{borderRadius:0},props:{MuiTextField:{fullWidth:!0,variant:"outlined"},MuiCheckbox:{color:"primary"},MuiButton:{variant:"outlined"}}});o.a.render(r.a.createElement(_e.b,{injectFirst:!0},r.a.createElement(Ne.a,{theme:Ke},r.a.createElement(d.a,{theme:Ke},r.a.createElement(Ze.a,null),r.a.createElement(u.a,{store:be},r.a.createElement(qe.a,null,r.a.createElement(We,null)))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[113,1,2]]]);
//# sourceMappingURL=main.e98803fc.chunk.js.map