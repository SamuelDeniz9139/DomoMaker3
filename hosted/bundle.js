(()=>{
    const e=e=>{
        document.getElementById("errorMessage").textContent=e,
        document.getElementById("domoMessage").classList.remove("hidden")
    },
    t=async(t,r)=>{
        const s=await fetch(t,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(r)
        }),
        o=await s.json();
        document.getElementById("domoMessage").classList.add("hidden"),
        o.redirect&&(window.location=o.redirect),
        o.error&&e(o.error)
    };
    window.onload=()=>{
        const r=document.getElementById("signupForm"),
        s=document.getElementById("loginForm"),
        o=document.getElementById("domoForm"),
        n=document.getElementById("domoMessage");
        r&&r.addEventListener("submit",(s=>{
            s.preventDefault(),
            n.classList.add("hidden");
            const o=r.querySelector("#user").value,
            a=r.querySelector("#pass").value,
            d=r.querySelector("#pass2").value,
            u=r.querySelector("#_csrf").value;
            return o&&a&&d?a!==d?(e("Passwords do not match!"),!1):(t(r.getAttribute("action"),{
                username:o,
                pass:a,
                pass2:d,
                _csrf:u
            }),!1):(e("All fields are required!"),!1)
        })),
        s&&s.addEventListener("submit",(o=>{
            o.preventDefault(),
            n.classList.add("hidden");
            const a=s.querySelector("#user").value,
            d=s.querySelector("#pass").value,
            u=r.querySelector("#csrf").value;
            return a&&d?(t(s.getAttribute("action"),{
                username:a,
                pass:d,
                _csrf:u
            }),!1):(e("Username or password is empty!"),!1)})),o&&o.addEventListener("submit",(s=>{
                s.preventDefault(),
                n.classList.add("hidden");
                const a=o.querySelector("#domoName").value,
                d=o.querySelector("#domoAge").value,
                u=r.querySelector("#csrf").value;
                return a&&d?(t(o.getAttribute("action"),{
                    name:a,
                    age:d,
                    _csrf:u
                }),!1):(e("All fields are required!"),!1)
            }))
        }
    }
)();