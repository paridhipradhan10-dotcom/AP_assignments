// Student Enrollment Dashboard
import { useState, useMemo } from "react";
const seedStudents = [
{ id: 1, name: "Ayesha Raza", enrolledCourses: new Set(["Algorithms",
"Linear Algebra", "Systems Design"]), gpa: 9.2 },
{ id: 2, name: "Marcus Webb", enrolledCourses: new Set(["Algorithms",
"Compilers", "Networks"]), gpa: 7.4 },
{ id: 3, name: "Yuki Tanaka", enrolledCourses: new Set(["Linear
Algebra", "ML Fundamentals", "Statistics"]), gpa: 8.7 },
{ id: 4, name: "Diego Ferreira", enrolledCourses: new Set(["Systems
Design", "Networks", "Databases"]), gpa: 6.1 },
{ id: 5, name: "Priya Nair", enrolledCourses: new Set(["ML
Fundamentals", "Statistics", "Algorithms"]), gpa: 9.5 },
];
const seedMap = () => new Map(seedStudents.map(s => [s.id, s]));
export default function App() {
const [studentMap, setStudentMap] = useState(seedMap);
const [filterCourse, setFilterCourse] = useState("All");
const [showAdd, setShowAdd] = useState(false);
const [newName, setNewName] = useState("");
const [newGpa, setNewGpa] = useState("");
const [newCourses, setNewCourses] = useState("");
const [nextId, setNextId] = useState(6);
const [removeId, setRemoveId] = useState("");
const [toast, setToast] = useState(null);
const students = useMemo(() => [...studentMap.values()], [studentMap]);
const allCourses = useMemo(

() => students.reduce((acc, s) => { s.enrolledCourses.forEach(c =>
acc.add(c)); return acc; }, new Set()),
[students]
);
const filtered = useMemo(
() => filterCourse === "All" ? students : students.filter(s =>
s.enrolledCourses.has(filterCourse)),
[students, filterCourse]
);
const sorted = useMemo(() => [...filtered].sort((a, b) => b.gpa -
a.gpa), [filtered]);
const showToast = (msg, type = "success") => {
setToast({ msg, type });
setTimeout(() => setToast(null), 2800);
};
const addStudent = () => {
if (!newName.trim() || !newGpa) return showToast("Please fill all
fields.", "error");
const gpa = parseFloat(newGpa);
if (isNaN(gpa) || gpa < 0 || gpa > 10) return showToast("GPA must be 0
to 10.", "error");
const courses = new Set(newCourses.split(",").map(c =>
c.trim()).filter(Boolean));
const student = { id: nextId, name: newName.trim(), enrolledCourses:
courses, gpa };
setStudentMap(prev => new Map([...prev, [nextId, student]]));
setNextId(n => n + 1);
setNewName(""); setNewGpa(""); setNewCourses("");
setShowAdd(false);
showToast(`${student.name} enrolled!`);
};
const removeStudent = (id) => {
if (!studentMap.has(id)) return showToast(`ID ${id} not found.`,
"error");
const name = studentMap.get(id).name;

setStudentMap(prev => { const next = new Map(prev); next.delete(id);
return next; });
showToast(`${name} removed.`);
setRemoveId("");
};
const gpaColor = g => g >= 8 ? "#22c55e" : g >= 6 ? "#eab308" :
"#ef4444";
return (
<div style={s.root}>
<style>{`
@import
url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&displa
y=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a0f1e; }
@keyframes fadeUp { from { opacity:0; transform:translateY(12px);
} to { opacity:1; transform:translateY(0); } }
button:hover { opacity: 0.82; cursor: pointer; }
input:focus { outline: none; border-color: #6366f1 !important; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb { background: #334155; border-radius:
2px; }
`}</style>
<div style={s.gridBg} />
{toast && (
<div style={{ ...s.toast, background: toast.type === "error" ?
"#ef4444" : "#22c55e" }}>
{toast.msg}
</div>
)}
{/* ── HEADER ── */}
<header style={s.header}>
<div>
<p style={s.eyebrow}>ACADEMIC REGISTRY · {new
Date().getFullYear()}</p>

<h1 style={s.title}>Enrollment <span style={{ color: "#6366f1"
}}>Dashboard</span></h1>
</div>
<div style={s.statsRow}>
{[
["Total Students", students.length],
["Unique Courses", allCourses.size],
["Average GPA", (students.reduce((a, s) => a + s.gpa, 0) /
(students.length || 1)).toFixed(2)],
].map(([label, value]) => (
<div key={label} style={s.statCard}>
<span style={s.statVal}>{value}</span>
<span style={s.statLabel}>{label}</span>
</div>
))}
</div>
</header>
{/* ── CONTROLS ── */}
<section style={s.controls}>
<div style={s.ctrlGroup}>
<label style={s.label}>FILTER BY COURSE</label>
<div style={s.pillRow}>
{["All", ...Array.from(allCourses).sort()].map(c => (
<button key={c} onClick={() => setFilterCourse(c)}
style={{ ...s.pill, ...(filterCourse === c ? s.pillActive
: {}) }}>
{c}
</button>
))}
</div>
</div>
<div style={s.ctrlGroup}>
<label style={s.label}>REMOVE BY ID</label>
<div style={{ display: "flex", gap: 8 }}>
<input type="number" placeholder="Student ID" value={removeId}
onChange={e => setRemoveId(e.target.value)}
style={{ ...s.input, width: 130 }} />
<button onClick={() => removeStudent(parseInt(removeId))}

style={{ ...s.btn, background: "#ef4444" }}>Remove</button>
</div>
</div>
<div style={s.ctrlGroup}>
<label style={s.label}>&nbsp;</label>
<button onClick={() => setShowAdd(v => !v)} style={s.btn}>
{showAdd ? "✕ Cancel" : "+ Add Student"}
</button>
</div>
</section>
{/* ── ADD FORM ── */}
{showAdd && (
<section style={s.addForm}>
<h3 style={{ color: "#6366f1", marginBottom: 16, fontSize: 16,
fontWeight: 700 }}>New Enrollment</h3>
<div style={s.formGrid}>
<div>
<label style={s.label}>FULL NAME</label>
<input value={newName} onChange={e =>
setNewName(e.target.value)}
placeholder="e.g. Jane Smith" style={s.input} />
</div>
<div>
<label style={s.label}>GPA (0 – 10)</label>
<input type="number" step="0.1" min="0" max="10"
value={newGpa} onChange={e => setNewGpa(e.target.value)}
placeholder="e.g. 8.5" style={s.input} />
</div>
<div style={{ gridColumn: "1/-1" }}>
<label style={s.label}>COURSES (comma-separated)</label>
<input value={newCourses} onChange={e =>
setNewCourses(e.target.value)}
placeholder="e.g. Algorithms, Databases" style={s.input}
/>
</div>
</div>
<button onClick={addStudent}

style={{ ...s.btn, marginTop: 14, background: "#6366f1",
padding: "10px 24px" }}>
Enroll Student →
</button>
</section>
)}
{/* ── COMPLEXITY BADGE ── */}
<div style={s.cxBadge}>
<span style={{ fontSize: 10, color: "#6366f1", fontFamily:
"monospace", letterSpacing: "0.12em" }}>FILTER COMPLEXITY</span>
<span style={{ fontSize: 18, fontWeight: 800, color: "#a5b4fc",
fontFamily: "monospace" }}>O(n · k)</span>
<span style={{ fontSize: 11, color: "#64748b", fontFamily:
"monospace" }}>
n = students · k = courses/student · Set.has() is O(1) →
effectively <strong style={{ color: "#a5b4fc" }}>O(n)</strong>
</span>
</div>
{/* ── TABLE ── */}
<section style={s.table}>
<div style={s.tableHead}>
{[["0 0 52px","ID"],["2","NAME"],["3","COURSES"],["0 0
150px","GPA"],["0 0 60px",""]].map(([flex, label]) => (
<span key={label} style={{ flex, fontSize: 10, color:
"#334155", fontFamily: "monospace", letterSpacing: "0.1em"
}}>{label}</span>
))}
</div>
{sorted.length === 0 && (
<div style={{ padding: 48, textAlign: "center", color:
"#334155", fontFamily: "monospace", fontSize: 13 }}>
No students match this filter.
</div>
)}
{sorted.map((st, i) => (

<div key={st.id} style={{ ...s.tableRow, animationDelay: `${i *
45}ms` }}>
<span style={{ flex: "0 0 52px", fontFamily: "monospace",
fontSize: 12, color: "#334155" }}>#{st.id}</span>
<span style={{ flex: 2, fontWeight: 700, fontSize: 15, color:
"#f1f5f9" }}>{st.name}</span>
<span style={{ flex: 3, display: "flex", flexWrap: "wrap",
gap: 4 }}>
{Array.from(st.enrolledCourses).map(c => (
<span key={c} style={{ ...s.tag, ...(c === filterCourse ?
s.tagHL : {}) }}>{c}</span>
))}
</span>
<span style={{ flex: "0 0 150px" }}>
<div style={{ display: "flex", flexDirection: "column", gap:
4 }}>
<span style={{ fontFamily: "monospace", fontWeight: 700,
fontSize: 14, color: gpaColor(st.gpa) }}>
{st.gpa.toFixed(1)} <span style={{ fontSize: 10, color:
"#475569" }}>/ 10</span>
</span>
<div style={{ height: 3, background: "#1e293b",
borderRadius: 2, width: "90%" }}>
<div style={{ height: "100%", borderRadius: 2, width:
`${(st.gpa / 10) * 100}%`, background: gpaColor(st.gpa), transition:
"width .4s" }} />
</div>
</div>
</span>
<span style={{ flex: "0 0 60px", textAlign: "right" }}>
<button onClick={() => removeStudent(st.id)}
style={s.removeBtn}>✕</button>
</span>
</div>
))}
</section>
{/* ── COURSES PANEL ── */}
<section style={s.sidebar}>

<h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9",
marginBottom: 4 }}>All Unique Courses</h3>
<p style={{ fontSize: 12, color: "#475569", marginBottom: 14 }}>
Stored as <code style={s.code}>Set&lt;string&gt;</code> · click
to filter
</p>
{Array.from(allCourses).sort().map(c => {
const count = students.filter(s =>
s.enrolledCourses.has(c)).length;
return (
<div key={c}
onClick={() => setFilterCourse(filterCourse === c ? "All" :
c)}
style={{ ...s.courseItem, ...(filterCourse === c ? {
background: "#1e1b4b" } : {}) }}>
<span style={{ fontSize: 13, fontWeight: 600, color:
"#cbd5e1" }}>{c}</span>
<span style={{ fontSize: 11, color: "#475569", fontFamily:
"monospace" }}>{count} student{count !== 1 ? "s" : ""}</span>
</div>
);
})}
</section>
</div>
);
}
const s = {
root: { fontFamily: "'Syne','Segoe UI',sans-serif", background:
"#0a0f1e", color: "#e2e8f0", minHeight: "100vh", padding: "32px 28px
80px", position: "relative", overflowX: "hidden" },
gridBg: { position: "fixed", inset: 0, pointerEvents: "none", zIndex:
0, backgroundImage: "linear-gradient(rgba(99,102,241,.05) 1px,transparent
1px),linear-gradient(90deg,rgba(99,102,241,.05) 1px,transparent 1px)",
backgroundSize: "48px 48px" },
toast: { position: "fixed", top: 24, right: 24, zIndex: 999,
padding: "12px 22px", borderRadius: 8, color: "#fff", fontWeight: 700,
fontSize: 13, boxShadow: "0 8px 32px rgba(0,0,0,.5)", animation: "fadeUp
.25s ease" },

header: { position: "relative", zIndex: 1, display: "flex",
justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap",
gap: 24, borderBottom: "1px solid #1e293b", paddingBottom: 28,
marginBottom: 32 },
eyebrow: { fontSize: 11, letterSpacing: "0.15em", color: "#6366f1",
fontFamily: "monospace", marginBottom: 8 },
title: { fontSize: "clamp(26px,4vw,46px)", fontWeight: 800,
lineHeight: 1.1, color: "#f1f5f9" },
statsRow: { display: "flex", gap: 28, flexWrap: "wrap" },
statCard: { display: "flex", flexDirection: "column", alignItems:
"flex-end" },
statVal: { fontSize: 26, fontWeight: 800, color: "#6366f1",
lineHeight: 1 },
statLabel: { fontSize: 11, color: "#64748b", fontFamily: "monospace",
letterSpacing: "0.1em", marginTop: 3 },
controls: { position: "relative", zIndex: 1, display: "flex", flexWrap:
"wrap", gap: 24, alignItems: "flex-end", marginBottom: 20 },
ctrlGroup: { display: "flex", flexDirection: "column", gap: 8 },
label: { fontSize: 10, letterSpacing: "0.15em", color: "#475569",
fontFamily: "monospace" },
pillRow: { display: "flex", flexWrap: "wrap", gap: 6 },
pill: { padding: "5px 13px", borderRadius: 20, border: "1px solid
#1e293b", background: "transparent", color: "#94a3b8", fontSize: 12,
fontWeight: 600, fontFamily: "inherit", transition: "all .15s" },
pillActive:{ background: "#6366f1", borderColor: "#6366f1", color:
"#fff" },
input: { background: "#0f172a", border: "1px solid #1e293b",
borderRadius: 8, color: "#e2e8f0", padding: "9px 14px", fontSize: 14,
fontFamily: "inherit", width: "100%", transition: "border .15s" },
btn: { padding: "9px 18px", borderRadius: 8, border: "none",
background: "#1e293b", color: "#e2e8f0", fontSize: 13, fontWeight: 700,
fontFamily: "inherit", transition: "opacity .15s", whiteSpace: "nowrap" },
addForm: { position: "relative", zIndex: 1, background: "#0f172a",
border: "1px solid #1e293b", borderRadius: 14, padding: "24px 28px",
marginBottom: 24, animation: "fadeUp .2s ease" },
formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px
20px" },
cxBadge: { position: "relative", zIndex: 1, display: "inline-flex",
alignItems: "center", flexWrap: "wrap", gap: 14, background: "#0f172a",

border: "1px solid #312e81", borderRadius: 8, padding: "8px 18px",
marginBottom: 24 },
table: { position: "relative", zIndex: 1, background: "#0f172a",
border: "1px solid #1e293b", borderRadius: 14, overflow: "hidden",
marginBottom: 24 },
tableHead: { display: "flex", padding: "10px 20px", borderBottom: "1px
solid #1e293b", background: "#080d1a" },
tableRow: { display: "flex", alignItems: "center", padding: "14px
20px", borderBottom: "1px solid #0a0f1e", background: "#0f172a",
animation: "fadeUp .3s ease both" },
tag: { padding: "3px 9px", borderRadius: 4, background: "#1e293b",
color: "#94a3b8", fontSize: 11, fontFamily: "monospace" },
tagHL: { background: "#312e81", color: "#a5b4fc" },
removeBtn: { background: "transparent", border: "1px solid #1e293b",
color: "#475569", borderRadius: 6, padding: "4px 10px", fontSize: 12,
transition: "all .15s" },
sidebar: { position: "relative", zIndex: 1, background: "#0f172a",
border: "1px solid #1e293b", borderRadius: 14, padding: "20px 24px" },
courseItem:{ display: "flex", justifyContent: "space-between",
alignItems: "center", padding: "10px 12px", borderRadius: 8, cursor:
"pointer", borderBottom: "1px solid #1e293b", transition: "background
.15s" },
code: { background: "#1e293b", padding: "1px 6px", borderRadius: 4,
fontFamily: "monospace", fontSize: 11, color: "#a5b4fc" },
};
