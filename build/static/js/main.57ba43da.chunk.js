(this["webpackJsonpcbs-pos"]=this["webpackJsonpcbs-pos"]||[]).push([[0],{104:function(e,t,a){e.exports=a(156)},154:function(e,t,a){},156:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),i=a.n(o),l=a(27),c=a.n(l),s=a(39),u=a(24),m=a(204),d=a(206),p=a(49),g=a(92),f=a(12),h=a(190);var v=Object(h.a)((function(e){return{navBar:{width:250,minWidth:250,overflow:"hidden",transition:"margin .4s ease-out",borderRight:"1px solid "+e.palette.divider,marginLeft:-250,"&.opened":{marginLeft:0,overflow:"auto"}}}})),b=function(e){var t=Object(n.useState)(!0),a=Object(u.a)(t,2),o=a[0],i=a[1],l=v();return r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{display:"flex",height:"100vh",overflow:"hidden"},r.a.createElement(d.a,{className:[l.navBar,o?"opened":""].join(" ")},r.a.createElement(e.navbar,e)),r.a.createElement(d.a,{width:"100%"},r.a.createElement(d.a,null,r.a.createElement(e.header,Object.assign({nav:{toggleNav:function(){i(!o)}}},e))),r.a.createElement(d.a,{p:2},e.children))))},y=a(199),E=a(191),w=a(196),k=a(197),j=a(210),x=a(94),O=a(200),C=a(58),S=a.n(C),I=a(31),N=a(192),T=a(193),L=a(159),_=a(194),P=a(91),W=a.n(P);function B(e){return r.a.createElement(W.a,e,e.children)}var M=function(e,t){return{name:e,path:t}},F=[M("Dashboard","/"),M("Inventory","/inventory")];var R=function(e){var t,a=((null===(t=e.history)||void 0===t?void 0:t.location)||{}).pathname;return r.a.createElement(d.a,{display:"flex",flexDirection:"column",height:"100%"},r.a.createElement(E.a,{disableGutters:!0},r.a.createElement("img",{src:"/static/logo.png",height:"70%",style:{padding:5}}),r.a.createElement(p.a,{className:"title"},"CEBU BAKERY SUPPLY")),r.a.createElement(N.a,null),r.a.createElement(d.a,{overflow:"auto",height:"100%",className:"nav-list"},r.a.createElement(B,{autoHide:!0},r.a.createElement(T.a,null,F.map((function(t,n){return r.a.createElement(L.a,{button:!0,key:n,divider:!0,selected:a===t.path,onClick:function(){var a;return null===(a=e.history)||void 0===a?void 0:a.push(t.path)}},r.a.createElement(_.a,{primary:t.name}))}))))))},z=a(205),D=a(198),U=a(160),A=a(209);function H(e){var t=Object(n.useRef)(),a=Object(n.useState)(""),o=Object(u.a)(a,2),i=o[0],l=o[1],c=Object(n.useState)(!1),s=Object(u.a)(c,2),m=s[0],g=s[1],f=Object(n.useMemo)((function(){var e;return null===t||void 0===t||null===(e=t.current)||void 0===e?void 0:e.querySelector("input")}),[t,i]),h=Object(n.useCallback)((function(){l(""),g(!1),f&&(f.value="")}),[t,i]);return r.a.createElement(d.a,{position:"relative",style:e.style,display:"flex",justifyContent:"center"},r.a.createElement(d.a,{position:"relative",display:"flex",justifyContent:"center"},r.a.createElement(z.a,Object.assign({ref:t,type:"text",variant:"outlined"},e,{fullWidth:!0,onChange:function(t){l(t.target.value.toLowerCase()),e.onChange&&e.onChange(t.target.value)},onFocus:function(){g(!0)},onBlur:function(){return!i.length&&g(!1)},inputProps:{style:{height:32}},style:{height:32,background:"#fff",maxWidth:m?"100%":"70%"}})),m&&!!i.length&&r.a.createElement(w.a,{onClick:h,style:{position:"absolute",right:0,top:0,height:"100%"}},r.a.createElement(k.a,null,"close"))),r.a.createElement(D.a,{in:!!i.length},r.a.createElement(d.a,{position:"absolute",width:"150%",bgcolor:"#fff",component:U.a,top:50},r.a.createElement(d.a,{p:1},r.a.createElement(p.a,{className:"title"},"Results")),r.a.createElement(N.a,null),r.a.createElement(T.a,null,new Array(4).fill(1).map((function(e,t){return r.a.createElement(L.a,{button:!0,key:t},r.a.createElement(_.a,{primary:"Product Name",primaryTypographyProps:{style:{color:"#222"}}}))}))))),r.a.createElement(A.a,{onClick:h,open:!!i.length,style:{background:"rgba(0,0,0,0.2)"}}))}var J=a(59),q=a(48),K=a.n(q),G="https://api.cebu-bakery-supply.com",Y={get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return K.a.get(G+e,Object(J.a)({method:"GET",headers:{Authorization:"Bearer "+Y.token},cancelToken:new K.a.CancelToken((function(e){var t=window.location.pathname;window.onclick=function(){t!==window.location.pathname&&e()}}))},t.config)).then((function(e){return e.data}))},post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return K.a.post(G+e,t.body,Object(J.a)({headers:Object(J.a)({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+Y.token},t.headers),onUploadProgress:function(e){return t.onUploadProgress?t.onUploadProgress(e):e},cancelToken:new K.a.CancelToken((function(e){t.cancelToken&&t.cancelToken(e)}))},t.config)).then((function(e){return e.data}))},auth:function(){var e=Object(s.a)(c.a.mark((function e(){var t,a,n,r=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.length>0&&void 0!==r[0]?r[0]:{},!localStorage.auth){e.next=10;break}return a=JSON.parse(localStorage.auth),Y.token=a.token,console.log({body:{token:Y.token}}),e.next=7,Y.post("/users/auth",{body:{token:Y.token}}).catch((function(e){t.fail&&t.fail(e)}));case 7:if(!(null===(n=e.sent)||void 0===n?void 0:n.success)){e.next=10;break}return e.abrupt("return",t.success?t.success(n):n);case 10:localStorage.removeItem("auth"),t.fail&&t.fail(),"/login"!==window.location.pathname&&"/login/"!==window.location.pathname&&(window.location="/login?r="+window.location.pathname);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},$=Y;var Q=Object(I.b)((function(e){return{userInfo:e.userInfo}}))((function(e){var t,a,n=e.userInfo||{},o=n.first_name,i=n.last_name;return r.a.createElement(y.a,{variant:"outlined",position:"sticky",style:{background:"#fff",borderLeft:0,color:"#000"}},r.a.createElement(d.a,{component:E.a,display:"flex",justifyContent:"space-between"},r.a.createElement(d.a,{display:"flex",alignItems:"center",width:150},r.a.createElement(w.a,{onClick:e.nav.toggleNav},r.a.createElement(k.a,null,"menu")),r.a.createElement(p.a,{className:"title"},null===(a=e.history.location.pathname,t=F.find((function(e){return e.path===a})))||void 0===t?void 0:t.name)),r.a.createElement(H,{placeholder:"Search Product"}),r.a.createElement(d.a,{display:"flex",alignItems:"center",minWidth:150},r.a.createElement(j.a,{style:{marginRight:13,width:30,height:30},src:"/",alt:o}),r.a.createElement(p.a,{className:"title-2"},o+" "+i),r.a.createElement(S.a,{variant:"popover",popupId:"add-file-btn"},(function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(w.a,Object(C.bindTrigger)(e),r.a.createElement(k.a,null,"arrow_drop_down")),r.a.createElement(x.a,Object(C.bindMenu)(e),r.a.createElement(O.a,{onClick:function(){window.localStorage.clear(),$.auth(),e.close()}},"Logout")))})))))}));function V(e){return r.a.createElement(d.a,{className:"content",width:"100%"},r.a.createElement(p.a,{className:"primary"},e.primary),r.a.createElement(p.a,{className:"secondary"},e.secondary))}function X(e){return r.a.createElement(d.a,{component:U.a,className:["card",e.color].join(" "),style:{width:e.width}},e.children)}var Z=Object(I.b)((function(e){return{userInfo:e.userInfo}}))((function(e){return r.a.createElement(b,Object.assign({header:Q,navbar:R},e),r.a.createElement(d.a,{display:"flex",width:"100%",overflow:"auto"},r.a.createElement(X,{color:"maroon-yellow"},r.a.createElement(V,{primary:"2000",secondary:"Total Sales"}))))})),ee=a(22),te=a(201),ae=a(208),ne=a(202),re=a(203),oe=a(207),ie=a(152);function le(e){return r.a.createElement(oe.a,Object.assign({elevation:6,variant:"filled"},e))}function ce(e){var t=Object(ee.a)(),a=Object(te.a)(t.breakpoints.down("sm")),o=se(),i=Object(n.useState)(),l=Object(u.a)(i,2),m=l[0],g=l[1],f=Object(n.useState)(),h=Object(u.a)(f,2),v=h[0],b=h[1],y=function(){var t=Object(s.a)(c.a.mark((function t(a){var n,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setLoading(!0),a.preventDefault(),window.login_error=void 0,t.next=5,$.post("/users/login",{body:{username:m,password:v}}).catch((function(e){var t,a=e.response;(null===a||void 0===a||null===(t=a.data)||void 0===t?void 0:t.error)&&(window.login_error=a.data.error)}));case 5:(null===(n=t.sent)||void 0===n?void 0:n.success)?(r=ie.parse(window.location.search).r,localStorage.auth=JSON.stringify(n.data),(null===n||void 0===n?void 0:n.change_password_required)?window.localStorage.first_loggon_pass=v:window.localStorage.removeItem("first_loggon_pass"),window.location=r||"/"):e.setLoading(!1);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{width:"100%",display:"flex",justifyContent:"center",marginBottom:2},a&&r.a.createElement("img",{src:"/static/logo.png",width:60})),r.a.createElement(p.a,{style:{fontWeight:"bold",color:t.palette.grey[800],fontSize:"1rem",textAlign:a?"center":"left",zIndex:2,position:"relative"}},"Sign in to Cebu Bakery Supply"),r.a.createElement("br",null),window.login_error&&r.a.createElement(ae.a,{open:!0,autoHideDuration:6e3,id:"error",onClose:function(){return document.querySelector("#error").style.display="none"}},r.a.createElement(le,{severity:"error",style:{margin:"30px 0"}},"Invalid Username or Password")),r.a.createElement("form",{action:"#",onSubmit:function(){return!1}},r.a.createElement(z.a,{variant:"outlined",onChange:function(e){return g(e.target.value)},onKeyDown:function(e,t){13==e.keyCode&&y(e)},margin:"normal",fullWidth:!0,className:a?"themed-input light":"themed-input",id:"email",label:"Username",name:"email",autoComplete:"email",autoFocus:!0}),r.a.createElement(z.a,{variant:"outlined",onChange:function(e){return b(e.target.value)},margin:"normal",onKeyDown:function(e,t){13==e.keyCode&&y(e)},fullWidth:!0,className:a?"themed-input light":"themed-input",name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"})),r.a.createElement(p.a,{variant:"body2",align:"right"},r.a.createElement(ne.a,{href:"#forgot-password",style:{color:a?"#fff":t.palette.primary.main}},"Forgot Password?")),r.a.createElement(re.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",style:{fontWeight:"bold",boxShadow:"none",height:56},onClick:y,className:o.submit},"Sign In"))}var se=Object(h.a)((function(e){return{loginLeftContent:{backgroundImage:"url(/static/img/breadpattern.png), linear-gradient(-120deg,"+e.palette.secondary.main+", "+e.palette.primary.main+")",display:"flex",alignItems:"center",justifyContent:"center",backgroundSize:"50%, 100%",position:"relative","& .logo":{width:"60%",height:"60%",background:"url(/static/logo.png) no-repeat center",backgroundSize:"100% auto"}},container:{background:"dark"===e.palette.type?"#222":"#fff",padding:30,position:"relative",zIndex:10},root:{display:"flex",alignItems:"center",background:e.palette.primary.main,backgroundSize:"contain",position:"relative"},paper:{display:"flex",flexDirection:"column",alignItems:"center"},avatar:{backgroundColor:e.palette.secondary.main,height:e.spacing(8),margin:e.spacing(1),width:e.spacing(8)},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2),"&:hover":{backgroundColor:"#FFDA53!important",boxShadow:"0 5px 10px 0 rgba(0,0,0,0.10)!important",borderRadius:6}}}})),ue=Object(I.b)((function(e){return{userInfo:e.userInfo}}))((function(e){var t=se(),a=Object(ee.a)(),n=Object(te.a)(a.breakpoints.down("sm"));return r.a.createElement("div",{className:t.root,style:{minHeight:"100vh",overflow:"hidden"}},r.a.createElement(d.a,{display:"flex",width:"100%",justifyContent:"space-between",height:"100vh",alignItems:"stretch"},!n&&r.a.createElement(d.a,{flex:1,width:"300",className:t.loginLeftContent},r.a.createElement(d.a,{className:"logo"})),r.a.createElement(d.a,{flex:1,width:"55%",style:{background:"#f9f5fe"},display:"flex",alignItems:"center",justifyContent:"center",className:n?t.loginMobile:""},r.a.createElement(d.a,{width:n?"80%":360,maxWidth:435,minWidth:290},r.a.createElement(ce,{setLoading:e.setLoading})))))}));var me=function(e){return r.a.createElement("div",null,"Page Not Found")},de=a(93),pe=Object(de.a)({overrides:{MuiToolbar:{root:{height:60,minHeight:"60px!important"}},MuiTouchRipple:{child:{backgroundColor:"#ffb100"}},MuiListItem:{root:{"&.Mui-selected":{backgroundColor:"rgba(0,0,0,0.3)"}}},MuiTextField:{root:{height:50,background:"#fff",transition:"all 0.2s ease-out","& input":{paddingTop:0,paddingBottom:0,height:50}}},MuiPopover:{root:{marginTop:45}},MuiTypography:{root:{overflow:"hidden",textOverflow:"ellipsis"}}},palette:{primary:{main:"#7e1316"},secondary:{main:"#ffb100"}}}),ge=(a(154),a(45)),fe=(0,a(45).combineReducers)({userInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER":return t.user;default:return e}}}),he=Object(ge.createStore)(fe);var ve=function(){var e=Object(n.useState)(!0),t=Object(u.a)(e,2),a=t[0],o=t[1];return Object(n.useEffect)((function(){Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.auth({success:function(e){var t=e.user;he.dispatch({type:"SET_USER",user:t})},fail:function(e){}});case 2:setTimeout((function(){o(!1)}),0);case 3:case"end":return e.stop()}}),e)})))()}),[]),r.a.createElement(m.a,{theme:pe},r.a.createElement(d.a,{className:"loader-transition",style:{opacity:a?0:1}},!a&&r.a.createElement(g.a,null,r.a.createElement(f.c,null,r.a.createElement(f.a,{exact:!0,path:"/",component:Z}),r.a.createElement(f.a,{exact:!0,path:"/inventory",component:Z}),r.a.createElement(f.a,{exact:!0,path:"/login",render:function(e){return r.a.createElement(ue,Object.assign({setLoading:function(e){return o(e)}},e))}}),r.a.createElement(f.a,{component:me})))),r.a.createElement(d.a,{className:"loader-transition",style:{opacity:a?1:0}},a&&r.a.createElement(d.a,{width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",style:{userSelect:"none",pointerEvents:"none"}},r.a.createElement("img",{src:"/static/logo.png",width:"100",style:{padding:5,position:"relative",zIndex:2}}),r.a.createElement(d.a,{display:"flex",alignItems:"center"},r.a.createElement("img",{src:"/static/img/cake.gif",width:"140",style:{margin:"-50px"}}),r.a.createElement(p.a,{className:"title"},"Loading app...")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I.a,{store:he},r.a.createElement(ve,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[104,1,2]]]);
//# sourceMappingURL=main.57ba43da.chunk.js.map