(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[873,650,328,754,937,9,703,931],{4855:function(e,t,s){Promise.resolve().then(s.t.bind(s,231,23)),Promise.resolve().then(s.bind(s,5651)),Promise.resolve().then(s.bind(s,5936))},5651:function(e,t,s){"use strict";var a=s(7437);s(2265);var r=s(4406),n=s(4409),i=s(9043),o=s(530),l=s(878),d=s(226),c=s(9789),u=s(4965),h=s(4340),m=s(9494),f=s(3881),p=s(216),x=s(7792),g=s(1568);s(883);var k=s(7346),b=s(5211);b.kL.register(b.uw,b.f$,b.ZL,b.Dx,b.u,b.De);let j={avatarImg:"https://avatars.githubusercontent.com/u/47913844?v=4",name:"Yukai Gu",email:"yukaig1@uci.edu",status:"Programming...",role:"admin",description:"This is the description part. I am a student from UCI, working as a developer in this project.",lastActive:"April 23, 2024 at 12:00:00 AM UTC-7",hours:{firstWeek:6,secondWeek:3,thirdWeek:7,fourthWeek:6,fifthWeek:10,sixthWeek:8,seventhWeek:7,eighthWeek:10,ninthWeek:7,tenthWeek:8},tags:["Developer","Volunteer"],tasks:["Task 1: Finish the personal information page","Task 2: Looking into backend APIs","Task 3: Implement the user profile"]};t.default=function(e){let{user:t=j}=e,s={labels:["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8","Week 9","Week 10"],datasets:[{label:"Hours",data:[t.hours.firstWeek,t.hours.secondWeek,t.hours.thirdWeek,t.hours.fourthWeek,t.hours.fifthWeek,t.hours.sixthWeek,t.hours.seventhWeek,t.hours.eighthWeek,t.hours.ninthWeek,t.hours.tenthWeek],backgroundColor:"rgba(54, 162, 235, 0.2)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:1}]};return(0,a.jsxs)(r.J,{children:[(0,a.jsx)(n.x,{children:(0,a.jsx)(i.z,{children:(0,a.jsx)(o.E,{className:"triggerImage",src:t.avatarImg,alt:"Profile"})})}),(0,a.jsxs)(l.y,{className:"personalContent",children:[(0,a.jsx)(d.Q,{}),(0,a.jsx)(c.Y,{className:"contentHeader",children:(0,a.jsx)(u.u,{label:"Recent: "+t.lastActive,className:"lastActiveTooltip",placement:"left",children:(0,a.jsx)(g.Z,{className:"lastActiveIcon"})})}),(0,a.jsx)("img",{className:"contentAvatar",src:t.avatarImg,alt:"Profile"}),(0,a.jsx)(u.u,{hasArrow:!0,label:t.status,className:"statusTooltip",placement:"right",children:(0,a.jsx)(h.xu,{className:"status"})}),(0,a.jsx)(m.b,{className:"contentBody",children:(0,a.jsxs)(f.g,{className:"mainContent",divider:(0,a.jsx)(p.c,{borderColor:"gray",paddingTop:"5px"}),spacing:4,align:"stretch",children:[(0,a.jsxs)(h.xu,{children:[(0,a.jsx)("span",{className:"userName",children:t.name}),(0,a.jsx)("span",{className:"role",children:t.role.toUpperCase()}),(0,a.jsx)(h.xu,{className:"userEmail",children:t.email})]}),(0,a.jsx)(h.xu,{className:"blockMargin5",children:(0,a.jsx)("div",{className:"quoteContent",children:t.description})}),(0,a.jsx)(h.xu,{width:"100%",height:"70px",marginTop:"10px",children:(0,a.jsx)(k.$Q,{data:s,options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},title:{display:!1}},scales:{x:{display:!1},y:{display:!1}}}})}),(0,a.jsx)(f.g,{align:"left",className:"blockMargin5",children:t.tasks.map((e,t)=>(0,a.jsx)(x.X,{className:"taskItem",children:e},t))}),(0,a.jsx)(h.xu,{})]})})]})]})}},5936:function(e,t,s){"use strict";s.d(t,{Sheet:function(){return d},SheetContent:function(){return f},SheetTrigger:function(){return c}});var a=s(7437),r=s(2265),n=s(3074),i=s(2218),o=s(2062),l=s(9354);let d=n.fC,c=n.xz;n.x8;let u=n.h_,h=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(n.aV,{className:(0,l.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...r,ref:t})});h.displayName=n.aV.displayName;let m=(0,i.j)("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",{variants:{side:{top:"inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",bottom:"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",left:"inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"}},defaultVariants:{side:"right"}}),f=r.forwardRef((e,t)=>{let{side:s="right",className:r,children:i,...d}=e;return(0,a.jsxs)(u,{children:[(0,a.jsx)(h,{}),(0,a.jsxs)(n.VY,{ref:t,className:(0,l.cn)(m({side:s}),r),...d,children:[i,(0,a.jsxs)(n.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",children:[(0,a.jsx)(o.Z,{className:"h-4 w-4"}),(0,a.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});f.displayName=n.VY.displayName,r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(n.Dx,{ref:t,className:(0,l.cn)("text-lg font-semibold text-foreground",s),...r})}).displayName=n.Dx.displayName,r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(n.dk,{ref:t,className:(0,l.cn)("text-sm text-muted-foreground",s),...r})}).displayName=n.dk.displayName},9354:function(e,t,s){"use strict";s.d(t,{cn:function(){return n}});var a=s(4839),r=s(6164);function n(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,r.m6)((0,a.W)(t))}},883:function(){}},function(e){e.O(0,[209,674,50,971,23,744],function(){return e(e.s=4855)}),_N_E=e.O()}]);