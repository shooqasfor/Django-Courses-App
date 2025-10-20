// استخدم كلاس واحد فقط: light (الافتراضي داكن)
const THEME_KEY = "theme";

// طبّق الثيم واحفظه
function setTheme(isLight){
  document.body.classList.toggle("light", isLight);
  localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
}

// عند التحميل: داكن افتراضي، ثم طبّق المحفوظ إن وُجد
(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  setTheme(saved === "light");
})();

// تبديل بالزر
function toggleTheme(){
  setTheme(!document.body.classList.contains("light"));
}

function getQuery(name, def=""){
  const p = new URLSearchParams(location.search);
  return p.get(name) ?? def;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggleMode")?.addEventListener("click", toggleTheme);

  const page = document.body.dataset.page;

  // الصفحة الرئيسية
  if(page==="base"){
    const nameSpan = document.getElementById("greetName");
    const form = document.getElementById("nameForm");
    const input = document.getElementById("nameInput");
    const stored = localStorage.getItem("name");
    const urlName = getQuery("name","");
    const finalName = urlName || stored || "Student";
    nameSpan.textContent = finalName;
    if(!input.value) input.value = finalName;

    form?.addEventListener("submit",(e)=>{
      e.preventDefault();
      const n = (input.value || "Student").trim();
      nameSpan.textContent = n;
      localStorage.setItem("name", n);
      const url = new URL(location);
      url.searchParams.set("name", n);
      history.replaceState({}, "", url);
    });
  }

  // صفحة المقررات
  if(page==="courses"){
    const table = document.getElementById("coursesTable");
    const tbody = table?.querySelector("tbody");
    const searchBox = document.getElementById("searchBox");
    const zebraBtn = document.getElementById("zebraBtn");

    searchBox?.addEventListener("input", () => {
      const q = searchBox.value.toLowerCase();
      tbody.querySelectorAll("tr").forEach(tr=>{
        const name = (tr.querySelector(".name")?.textContent || "").toLowerCase();
        tr.style.display = name.includes(q) ? "" : "none";
      });
    });

    table?.querySelectorAll("th").forEach(th=>{
      th.addEventListener("click", ()=>{
        const key = th.dataset.sort;           // number / name
        const asc = th.dataset.asc !== "true"; // toggle
        const rows = [...tbody.querySelectorAll("tr")].filter(r=>r.querySelector(".name"));
        rows.sort((a,b)=>{
          const val = (r)=> key==="number"
            ? parseInt(r.querySelector(".num").textContent,10)
            : r.querySelector(".name").textContent.toLowerCase();
          const A = val(a), B = val(b);
          if(A<B) return asc?-1:1;
          if(A>B) return asc?1:-1;
          return 0;
        });
        rows.forEach(r=>tbody.appendChild(r));
        th.dataset.asc = asc.toString();
      });
    });

    zebraBtn?.addEventListener("click", ()=>{
      table.classList.toggle("zebra");
      zebraBtn.classList.toggle("active");
    });
  }
});
