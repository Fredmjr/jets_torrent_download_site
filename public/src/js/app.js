const bdy_cntnt = document.querySelector("#bdy_cntnt");
const lrnmrBtn = document.querySelector("#lrnmrBtn");
const dwnldBtn = document.querySelector("#dwnldBtn");
const home = document.querySelector("#home");
const ldng = `<div id="loadingPnl"><img
              src="assets/icons/jts_loading.png"
              class="loading"
              width="35"
            /></div>`;

//Learn more
lrnmrBtn.addEventListener("click", () => {
  bdy_cntnt.innerHTML = ldng;
  fetch("/api/lrnmrdata", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.erMgs) {
        bdy_cntnt.innerHTML = data.erMgs;
      } else if (data.app_data) {
        bdy_cntnt.innerHTML = `
          <div  class="lrnmrCrd">
            <div class="app_i_crd" id="app_v">
                <div class=ftr_tnc_icon>
                  <span><img src="assets/icons/jts_version.png" class="app-icon" width="20"></span>
                </div>
                <div>
                <p class="mn_tp_ttl">${data.app_data.a_dtls.title}</p>
                <p class="linr"><span class="mn_ttl">Version: </span>${data.app_data.a_dtls.version}</p>
                <p class="linr"><span class="mn_ttl">Language: </span>${data.app_data.a_dtls.languages}</p>
                <p class="linr"><span class="mn_ttl">Compatibility: </span>${data.app_data.a_dtls.compatibility}</p>
                <p class="linr"><span class="mn_ttl">Format: </span>${data.app_data.a_dtls.format}</p>                    
                </div>
            </div>
            <div class="app_i_crd" id="app_dsrcptns">
                <div class=ftr_tnc_icon>
                  <span><img src="assets/icons/jts_Description.png" class="app-icon" width="17"></span>
                </div>
                <div>
                 <p class="mn_tp_ttl">${data.app_data.dscrptn.title}</p>
                  <p class="linr">${data.app_data.dscrptn.text}</p>                    
                </div>
            </div>
           <div class="lnr_brkr"></div>
            <div class="app_i_crd" id="bnfts">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Benefits.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.bnfts.title}</p>
                  <p class="linr">${data.app_data.bnfts.text}</p>                    
                </div>
            </div>
            <div class="app_i_crd"  id="app_mngmnt">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Management.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.a_mngnt.title}</p>
                  <p class="linr">${data.app_data.a_mngnt.text}</p>                    
                </div>
            </div>
           <div class="lnr_brkr"></div>
            <div class="app_i_crd" id="bugs">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Bugs.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.bgs.title}</p>
                  <p class="linr">${data.app_data.bgs.text}</p>                    
                </div>
            </div>         
            <div class="app_i_crd" id="rvws">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Review.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.rvw.title}</p>
                  <p class="linr">${data.app_data.rvw.text}</p>                    
                </div>
            </div>            
          </div>`;
      }
    })
    .catch((error) => console.error(error));
});

//downlload app
dwnldBtn.addEventListener("click", () => {
  //1. method 1 - simple & straight forward
  window.location.href = "/api/dwnlapp";
  //2. method 2 - for inspecting, preview etc before downloading file
  //fetch + blob + <a>
});

//terms
document.querySelector("#trmsBtn").addEventListener("click", () => {
  fetch("/api/trms", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.erMgs) {
        bdy_cntnt.innerHTML = data.erMgs;
      } else if (data.app_data) {
        bdy_cntnt.innerHTML = `
        <p class="trms_ttl">Terms of Use</p>
         <div  class="lrnmrCrd">
            <div class="app_i_crd" id="trm_1">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Responsibility.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.a.title}</p>
                  <p class="linr">${data.app_data.a.dscrptn}</p>
                </div>              
            </div>
            <div class="app_i_crd" id="trm_2">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_System.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.b.title}</p>
                  <p class="linr">${data.app_data.b.dscrptn}</p>
                </div>  
            </div>
            <div class="app_i_crd" id="trm_3">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Connections.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.c.title}</p>
                  <p class="linr">${data.app_data.c.dscrptn}</p>
                </div>  
            </div>
              <div class="app_i_crd" id="trm_3">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Activity.png" class="app-icon" width="20"></span>
                </div>
                <div>
                  <p class="mn_tp_ttl">${data.app_data.d.title}</p>
                  <p class="linr">${data.app_data.d.dscrptn}</p>
                </div>  
            </div>
            
         </div>
          `;
      }
    })
    .catch((error) => console.error(error));
});
//privacy
document.querySelector("#prvcyBtn").addEventListener("click", () => {
  fetch("/api/prvcy", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.erMgs) {
        bdy_cntnt.innerHTML = data.erMgs;
      } else if (data.app_data) {
        bdy_cntnt.innerHTML = `
        <p class="prvcy_ttl">Privacy Policy</p>
         <div  class="lrnmrCrd">
              <div class="app_i_crd" id="prvcy_1">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_Privacy.png" class="app-icon" width="20"></span>
                </div>
                <div>
                    <p class="mn_tp_ttl">${data.app_data.sub_title}</p>
                    <p class="linr">1. ${data.app_data.text_1}</p>
                    <p class="linr">2. ${data.app_data.text_2}</p>
                    <p class="linr">3. ${data.app_data.text_3}</p>
                </div>
                </div>  
                
             <div class="app_i_crd" id="prvcy_2">
                <div class=ftr_tnc_icon>
                  <span><img   src="assets/icons/jts_access.png" class="app-icon" width="20"></span>
                </div>
                <div>
                    <p class="mn_tp_ttl">${data.app_data.text_4.text_4_0}</p>
                    <p class="linr">1. ${data.app_data.text_4.text_4_1}</p>
                    <p class="linr">2. ${data.app_data.text_4.text_4_2}</p>
                    <p class="linr">3. ${data.app_data.text_4.text_4_3}</p>
                </div>
                </div>
           </div>
            
         </div>
          `;
      }
    })
    .catch((error) => console.error(error));
});

//help

//app versions
document.querySelector("#chkupdtsBtn").addEventListener("click", () => {
  fetch("/api/vrsndata", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.erMgs) {
        bdy_cntnt.innerHTML = data.erMgs;
      } else if (data.app_data) {
        bdy_cntnt.innerHTML = `
            <p class="prvcy_ttl">Version List</p>
          `;
        const prnt_d = document.createElement("div");
        prnt_d.className = "prnt_d";

        data.app_data.forEach((e) => {
          const d = document.createElement("div");
          d.innerHTML = `
              <div class="vrsn_top">
                <p>${e.version_date}</p>
            </div>
            <div class="vrsn_mid">
                <p class="fix_updts_cl_txt"><span>${e.chk}</span><span class="fix_updts_cl_txt_fix">${e.fix_1}</span></p>
            </div>
            <div class="vrsn_bttm">
                <div class="vrsn_jts_logo"><img src="assets/logos/jets_torrents.png" class="app-icon" width="20"></div>
                <div>${e.app_nm_v}_[${e.app_size}]</div>
                <button data-vrsn_nm="${e.app_nm_v}" class="vrsncl_Btn">
                    <span>
                        <img   src="assets/icons/download.png" class="app-icon" width="15">
                    </span>
                    Download</button>
                </div>                
            </div>              
        `;
          prnt_d.appendChild(d);
          d.className = "vrsnId";
        });
        bdy_cntnt.appendChild(prnt_d);
      }
    })
    .catch((error) => console.error(error));
});

//version download
home.addEventListener("click", (event) => {
  if (event.target.closest(".vrsncl_Btn")) {
    const el = event.target.closest(".vrsncl_Btn");
    const e = el?.dataset.vrsn_nm;

    window.location.href = `/api/vrndwnld/${e}`;
  }
});

//suggestion section
document.querySelector("#suggest").addEventListener("click", () => {
  fetch("/api/sggst", {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => {
      bdy_cntnt.innerHTML = data;
    })
    .catch((error) => console.error(error));
});
//like screen
document.querySelector("#like").addEventListener("click", () => {
  fetch("/api/lk", {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => {
      bdy_cntnt.innerHTML = data;
    })
    .catch((error) => console.error(error));
});

//like the project
const mainobsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const el1 = node.matches?.(".rate_shape")
        ? node
        : node.querySelectorAll?.(".rate_shape");
      const el2 = node.matches?.("#heartedBtn")
        ? node
        : node.querySelector?.("#heartedBtn");

      //likes
      if (el1) {
        //like and rating

        const ratingValue = document.getElementById("heart_rating");

        el1.forEach((e) => {
          e.addEventListener("click", () => {
            const value = e.getAttribute("data-value");

            // reset all hearts
            el1.forEach((s) => s.classList.remove("active"));

            // highlight up to the clicked heart
            for (let i = 0; i < value; i++) {
              el1[i].classList.add("active");
            }

            ratingValue.textContent = `Liked project: ${value}/5`;

            //like the project send
            //cookie tkn collection
            el2.addEventListener("click", () => {
              c = (elem) => {
                let ckies = document.cookie.split("; ");
                for (let i = 0; i < ckies.length; i++) {
                  let cookie = ckies[i];
                  let [name, value] = cookie.split("=");
                  if (name === elem) {
                    return decodeURIComponent(value);
                  }
                }
                return null;
              };

              //check cookie tkn
              const id = c("usr_id_tkn");
              const like = value;
              const dataobj = { id, like };
              console.log(dataobj);
              if ((id, like)) {
                fetch("/api/lknum", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(dataobj),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.erMgs) {
                      const e = `<div class="mgsPnl">${data.erMgs}</div>`;
                      bdy_cntnt.innerHTML = e;
                    }
                    if (data.lk_sttus === true) {
                      const e = `<div class="mgsPnl">${data.mgs}</div>`;
                      bdy_cntnt.innerHTML = e;
                    }
                  })
                  .catch((error) => console.error(error));
              }
            });
          });
        });
      }
    });
  });
});

mainobsrvr.observe(home, {
  childList: true,
  subtree: true,
});

//suggestion txt_datas
//quick tutorial page
home.addEventListener("click", async (event) => {
  if (event.target.closest("#sbmtsggstBtn")) {
    const e = document.querySelector("#sggst_txt");
    const em = document.querySelector("#email");
    const er = document.querySelector("#ermgs_sggstpg");
    c = (elem) => {
      let ckies = document.cookie.split("; ");
      for (let i = 0; i < ckies.length; i++) {
        let cookie = ckies[i];
        let [name, value] = cookie.split("=");
        if (name === elem) {
          return decodeURIComponent(value);
        }
      }
      return null;
    };
    const id = c("usr_id_tkn");
    const eml = em.value;
    fetch("/api/txtdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eml: eml,
        id: id,
        txt_data: e.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.erMgs) {
          er.style.display = "block";
          er.innerHTML = data.erMgs;
          setTimeout(() => {
            er.style.display = "none";
          }, 5000);
        }
        if (data.txt_sttus === true) {
          er.style.display = "block";
          er.innerHTML = data.mgs;
          setTimeout(() => {
            er.style.display = "none";
          }, 5000);
        }
        if (data.txt_pending_sttus === true) {
          er.style.display = "block";
          er.innerHTML = data.mgs;
          setTimeout(() => {
            er.style.display = "none";
          }, 7000);
        }
      })
      .catch((error) => console.error(error));
  }
});
