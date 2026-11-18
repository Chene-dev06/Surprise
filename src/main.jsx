import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const birthdayMessage = `Malgré ma tstahlch hade msg BSH haka w Ghadi nktbhlk
Changoulk rabi wkilk wsayi
F nhar ki HDa ana ga3da 3la jalk w NTA rou7t w khalitni vrai ghadetni wlh
W Ida dert capture vidéo wla capture nchlh ma trbah la dnya la akhra
L'essentiel bghit I just wanna to say happy birthday koul 3am wnta tbghini w koul 3am w nta frhane w koul 3am w hna m3na ba3de nchlh ♥️
L3o9oba nwli ndirlk ana la surprise w l'anniversaire ta3k fdarna 3omri 😚
I wish u All the best in ur life and many successes
Nchlh twsl win Rak baghi w tkoun naja7 w b blastk f présent w nkon ana fhyatk 🙃
Chouf ngoulk haja dir f Rask beli Ida nta tbghini kter meli ana nbghik BSH ana jamais bghit wahde kima Rani nbghik drwk
Wah ndabzo bzaf ntnayfo w ndiro swl7 mernkin lzouj ghaltin w koul wahde w les défauts tw3h BSH machi da chkil l'l yb3dna 3la b3dana
Ana jamais nwite mour kach dbza wla BLI mghadich nzido nahdro w bel l3aks hadi men bin swl7 l'l vraiment nkhafhom kach nhar ndabzo w mkanche l'l yty7 haba 3la Jal khouh 🙂
Nta men bin nas l'l vraiment 9rabli w ki tba3d 3liya vrai nhas Biha w tghidni w manich bghyatk tba3d ana bghitk tg3od m3aya toujours w nbghi ana toujours nkoun fhyatk 💋
C'est vrai maranich kima nta Rak baghi w nnch3k w ndirlk swl7 wga3 bsh mnfoutkch ❤️‍🩹
nchlh tg3oud toujours bnytk w glbk chbab w tmhbilk BCS bghitk 3la Jal personnalité ta3k mtkhalich nas w lwa9t ybdlok please BCS do homa swl7 l'l ymyzouk w ykhalouk different 3la loukhrin
Tstahl koul khir fhyatk w ga3 w la mkounch m3a ba3d nchlh tkoun m3a l'l tbghi BSH toujours dir frask BLI ana kount w mzal w Ghadi ng3oud nbghik toujours w HTA hja mghadi tbdl les sentiments taw3i jihtk
Enjoy in ur day w nchlh liyam jayin ga3 yfouto 3lik chabin kima da nhar 💕
Mhdrtch m3ah f ghyb mtkhafch 🙂
Nmout 3lik zine Ta3i 🫠`;

const reactions = [
  { face: "🥺", mood: "shy", line: "Ghadi noktlk dir WAH" },
  { face: "😠", mood: "annoyed", line: "Tsma nz3af?!" },
  { face: "🤬", mood: "angry", line: "Dire WAAAH tchouf" },
  { face: "😡", mood: "furious", line: "Sayi z3ft menk" }
];

function Avatar({ reaction }) {
  const current = reactions[Math.min(reaction, reactions.length - 1)];
  return (
    <div className={`avatar-wrap ${current.mood}`} aria-label="Cute reaction avatar">
      <div className="avatar">{current.face}</div>
      {reaction >= 2 && <span className="anger-mark">💢</span>}
      {reaction >= 3 && <span className="hands">🙌</span>}
    </div>
  );
}

function FloatingKisses() {
  return (
    <div className="kiss-layer" aria-hidden="true">
      {Array.from({ length: 34 }, (_, i) => (
        <span key={i} style={{
          left: `${(i * 37 + 7) % 100}%`,
          animationDelay: `${(i % 9) * 0.22}s`,
          animationDuration: `${3.2 + (i % 5) * 0.45}s`,
          fontSize: `${18 + (i % 4) * 8}px`
        }}>{["💋", "😘", "💕", "💗"][i % 4]}</span>
      ))}
    </div>
  );
}

function App() {
  const [stage, setStage] = useState("birthday");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [reaction, setReaction] = useState(-1);
  const [showKisses, setShowKisses] = useState(false);

  function checkDate(e) {
    e.preventDefault();
    if (date === "2005-06-15") {
      setDateError("");
      setStage("ready");
    } else {
      setDateError("Hmm… hadi machi hiya 😌 Jareb tani!");
    }
  }

  function chooseNo() {
    setReaction((previous) => Math.min(previous + 1, reactions.length - 1));
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="sparkle sparkle-one">✦</div>
      <div className="sparkle sparkle-two">♡</div>

      {stage !== "message" ? (
        <section className="dialog-card">
          <div className="top-heart">♡</div>
          <p className="eyebrow">A tiny little question</p>

          {stage === "birthday" ? (
            <>
              <h1>Before we begin…</h1>
              <p className="subtitle">Date de naissance t3y?</p>
              <form onSubmit={checkDate} className="date-form">
                <label htmlFor="birthdate">Your date of birth</label>
                <input
                  id="birthdate"
                  type="date"
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setDateError(""); }}
                  required
                />
                {dateError && <p className="error-message">{dateError}</p>}
                <button className="primary-button" type="submit">Valider <span>♡</span></button>
              </form>
            </>
          ) : (
            <>
              <Avatar reaction={reaction < 0 ? 0 : reaction} />
              <h1>Rak wajed?</h1>
              <p className="subtitle">
                {reaction < 0 ? "I have a little something for you…" : reactions[reaction].line}
              </p>
              <div className="choice-row">
                <button className="primary-button" onClick={() => setStage("message")}>WAH <span>♡</span></button>
                <button className="no-button" onClick={chooseNo}>LA</button>
              </div>
            </>
          )}
          <div className="card-footer">made with a little love <span>♥</span></div>
        </section>
      ) : (
        <section className="message-card">
          <div className="message-heading">
            <span className="heading-flower">✿</span>
            <p className="eyebrow">A message from my heart</p>
            <h1>Happy Birthday!</h1>
            <p className="subtitle">To my favourite person ♡</p>
          </div>
          <div className="message-body">{birthdayMessage}</div>
          <div className="message-end">
            <button className="primary-button surprise-button" onClick={() => setShowKisses(true)}>
              Haja for you <span>💌</span>
            </button>
            <p>With love, always ♡</p>
          </div>
        </section>
      )}
      {showKisses && <FloatingKisses />}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
