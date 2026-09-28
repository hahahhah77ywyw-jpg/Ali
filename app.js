const defaultSessions=[{name:"385",status:"متصل",busy:false},{name:"Jded2233",status:"متصل",busy:false}];
let sessions=JSON.parse(localStorage.getItem("omni_sessions")||"null")||defaultSessions;
function save(){localStorage.setItem("omni_sessions",JSON.stringify(sessions))}
function render(){document.getElementById("count").textContent=sessions.length;document.getElementById("connected").textContent=sessions.filter(x=>x.status==="متصل").length;document.getElementById("busy").textContent=sessions.filter(x=>x.busy).length;
const box=document.getElementById("sessionList"); box.innerHTML="";
sessions.forEach((s,i)=>{let d=document.createElement("div");d.className="session";d.innerHTML=`<div><span class="tag">${s.status}</span><span class="name">${escapeHtml(s.name)}</span><div style="color:#8ea6b8;margin-top:8px">جلسة محلية • حالة ${s.busy?"مشغولة":"جاهزة"}</div></div><div><button class="blue" onclick="toggle(${i})">${s.status==="متصل"?"فتح":"اتصال"}</button> <button class="red" onclick="removeSession(${i})">حذف</button></div>`;box.appendChild(d)})}
function escapeHtml(x){return x.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function addSession(){let n=prompt("اسم الجلسة؟","wa"+(sessions.length+1));if(!n)return;sessions.push({name:n,status:"متصل",busy:false});save();render();show("sessions")}
function toggle(i){sessions[i].status=sessions[i].status==="متصل"?"غير متصل":"متصل";save();render()}
function removeSession(i){if(confirm("حذف الجلسة؟")){sessions.splice(i,1);save();render()}}
function show(id){document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));document.getElementById(id).classList.remove("hidden");document.querySelectorAll("nav button").forEach(x=>x.classList.remove("active"))}
function scrollToId(id){show(id);document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function saveList(){alert("تم حفظ القائمة محليًا")}
document.getElementById("disconnect").onclick=()=>{sessions=sessions.map(x=>({...x,status:"غير متصل"}));save();render()}
document.getElementById("fileInput").addEventListener("change",e=>{document.getElementById("fileName").textContent=e.target.files[0]?e.target.files[0].name:"لم يتم اختيار ملف";document.getElementById("files").textContent=e.target.files.length});
render();
