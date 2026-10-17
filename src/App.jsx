import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState('menu')
  const [progress, setProgress] = useState({
    appartement: false,
    appel: false,
    chambre: false
  })
  const [flags, setFlags] = useState({
    spokeToBoy: false,
    examinedRoom: false,
    spokeToParents: false,
    foundNotebook: false,
    foundMarks: false,
    believedBoy: null,
    pressedParents: false,
    foundHidden: false
  })

  const setFlag = (key, value = true) => {
    setFlags(prev => ({ ...prev, [key]: value }))
  }

  if (screen === 'menu') {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>SHADOW FILES</h1>
        <p style={styles.subtitle}>
          Trois affaires. Aucun combat. Aucun hasard.<br/>
          Tes décisions déterminent les informations que tu obtiens,<br/>
          les personnes que tu crois, et surtout la fin que tu mérites.
        </p>
        <button style={styles.button} onClick={() => setScreen('appartement')}>[1] L'appartement 17</button>
        <button style={styles.button} onClick={() => setScreen('appel')}>[2] Le dernier appel</button>
        <button style={styles.button} onClick={() => {
          setFlags({
            spokeToBoy: false, examinedRoom: false, spokeToParents: false,
            foundNotebook: false, foundMarks: false, believedBoy: null,
            pressedParents: false, foundHidden: false
          })
          setScreen('chambre_intro')
        }}>[3] La chambre sans fenêtre</button>
        <button style={{...styles.button, background: '#333'}} onClick={() => setScreen('succes')}>[4] Succès</button>
        <button style={{...styles.button, background: '#333'}} onClick={() => setScreen('progression')}>[5] Progression</button>
      </div>
    )
  }

  if (screen === 'succes') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Succès</h2>
        <p style={styles.text}>Les fins débloquées apparaîtront ici plus tard.</p>
        <button style={styles.button} onClick={() => setScreen('menu')}>Retour</button>
      </div>
    )
  }

  if (screen === 'progression') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Progression</h2>
        <p style={styles.text}>L'appartement 17 : {progress.appartement ? 'Terminé' : 'Non commencé'}</p>
        <p style={styles.text}>Le dernier appel : {progress.appel ? 'Terminé' : 'Non commencé'}</p>
        <p style={styles.text}>La chambre sans fenêtre : {progress.chambre ? 'Terminé' : 'Non commencé'}</p>
        <button style={styles.button} onClick={() => setScreen('menu')}>Retour</button>
      </div>
    )
  }

  // ===== LA CHAMBRE SANS FENÊTRE =====
  if (screen === 'chambre_intro') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>La chambre sans fenêtre</h2>
        <p style={styles.text}>14h22. Pavillon en périphérie. Les voisins ont signalé des bruits sourds pendant trois jours. Puis plus rien.</p>
        <p style={styles.text}>À l’intérieur : un garçon de 13 ans. Enfermé dans une chambre sans fenêtre. Il est vivant. Mais il parle très peu.</p>
        <p style={styles.text}>Les parents sont dans le salon. Le garçon est encore dans la chambre. Les murs sont couverts de marques de crayon.</p>
        <button style={styles.button} onClick={() => setScreen('chambre_hub')}>Entrer</button>
      </div>
    )
  }

  if (screen === 'chambre_hub') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Sur place</h2>
        <p style={styles.text}>L’air est lourd. Tu peux encore explorer.</p>
        <button style={styles.button} onClick={() => setScreen('chambre_garcon')}>Voir le garçon</button>
        <button style={styles.button} onClick={() => setScreen('chambre_parents')}>Parler aux parents</button>
        <button style={styles.button} onClick={() => setScreen('chambre_piece')}>Examiner la chambre</button>
        {(flags.spokeToBoy || flags.examinedRoom || flags.spokeToParents) && (
          <button style={{...styles.button, background: '#8e44ad', marginTop: 20}} onClick={() => setScreen('chambre_decision')}>
            Tirer des conclusions
          </button>
        )}
        <button style={{...styles.button, background: '#333', marginTop: 10}} onClick={() => setScreen('menu')}>Abandonner</button>
      </div>
    )
  }

  if (screen === 'chambre_garcon') {
    setFlag('spokeToBoy')
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Le garçon</h2>
        <p style={styles.text}>Il est assis au bord du lit, genoux contre la poitrine. Son regard est étrangement calme.</p>
        <button style={styles.button} onClick={() => setScreen('chambre_garcon_direct')}>Lui demander ce qui s’est passé</button>
        <button style={styles.button} onClick={() => setScreen('chambre_garcon_silence')}>Rester silencieux</button>
        <button style={styles.button} onClick={() => setScreen('chambre_garcon_voix')}>Parler de « la voix »</button>
        <button style={{...styles.button, background: '#333'}} onClick={() => setScreen('chambre_hub')}>Revenir</button>
      </div>
    )
  }

  if (screen === 'chambre_garcon_direct') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Le garçon</h2>
        <p style={styles.text}>Il met longtemps à répondre :</p>
        <p style={styles.italic}>« Elle m’a dit de rester. Elle a dit que si je sortais… quelque chose arriverait. »</p>
        <p style={styles.italic}>« Ce n’était pas maman. »</p>
        <button style={styles.button} onClick={() => setScreen('chambre_hub')}>Revenir</button>
      </div>
    )
  }

  if (screen === 'chambre_garcon_silence') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Le silence</h2>
        <p style={styles.text}>Après un moment, il parle de lui-même :</p>
        <p style={styles.italic}>« Elle comptait les jours avec moi. Sur les murs. »</p>
        <button style={styles.button} onClick={() => { setFlag('foundMarks'); setScreen('chambre_hub') }}>Revenir</button>
      </div>
    )
  }

  if (screen === 'chambre_garcon_voix') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>La voix</h2>
        <p style={styles.italic}>« Elle savait des choses sur moi. Des choses que personne ne savait. Même pas eux. »</p>
        <p style={styles.italic}>« Tu vas la chercher ? »</p>
        <button style={styles.button} onClick={() => { setFlag('believedBoy', true); setScreen('chambre_hub') }}>« Oui. »</button>
        <button style={styles.button} onClick={() => { setFlag('believedBoy', false); setScreen('chambre_hub') }}>« Je ne sais pas encore. »</button>
      </div>
    )
  }

  if (screen === 'chambre_piece') {
    setFlag('examinedRoom')
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>La chambre</h2>
        <p style={styles.text}>Quatre murs. Pas de fenêtre. L’air est presque rance. Les murs sont couverts de petites barres verticales.</p>
        <button style={styles.button} onClick={() => setScreen('chambre_marques')}>Examiner les marques</button>
        <button style={styles.button} onClick={() => setScreen('chambre_lit')}>Fouiller sous le lit</button>
        <button style={styles.button} onClick={() => setScreen('chambre_cache')}>Chercher un endroit dissimulé</button>
        <button style={{...styles.button, background: '#333'}} onClick={() => setScreen('chambre_hub')}>Revenir</button>
      </div>
    )
  }

  if (screen === 'chambre_marques') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Les marques</h2>
        <p style={styles.text}>Certaines formes se répètent. On dirait un décompte… ou un message. Près du sol, les traits sont plus appuyés.</p>
        <button style={styles.button} onClick={() => { setFlag('foundMarks'); setScreen('chambre_piece') }}>Noter</button>
      </div>
    )
  }

  if (screen === 'chambre_lit') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Sous le lit</h2>
        <p style={styles.text}>Un carnet. Sur la dernière page :</p>
        <p style={styles.italic}>« Elle est dans les murs. »</p>
        <p style={styles.italic}>« Elle savait mon vrai nom. »</p>
        <button style={styles.button} onClick={() => { setFlag('foundNotebook'); setScreen('chambre_piece') }}>Prendre le carnet</button>
      </div>
    )
  }

  if (screen === 'chambre_cache') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Derrière le radiateur</h2>
        <p style={styles.text}>Un vieux bouton de chemise. Et gravé dans le plâtre :</p>
        <p style={styles.italic}>« 17 »</p>
        <button style={styles.button} onClick={() => { setFlag('foundHidden'); setScreen('chambre_piece') }}>Noter</button>
      </div>
    )
  }

  if (screen === 'chambre_parents') {
    setFlag('spokeToParents')
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Les parents</h2>
        <p style={styles.text}>« C’était une punition », dit le père. « Il avait menti. Il devait comprendre. »</p>
        <button style={styles.button} onClick={() => setScreen('chambre_parents_fenetre')}>Pourquoi une chambre sans fenêtre ?</button>
        <button style={styles.button} onClick={() => setScreen('chambre_parents_voix')}>Mentionner la voix</button>
        <button style={styles.button} onClick={() => setScreen('chambre_parents_pression')}>Mettre la pression</button>
        <button style={{...styles.button, background: '#333'}} onClick={() => setScreen('chambre_hub')}>Revenir</button>
      </div>
    )
  }

  if (screen === 'chambre_parents_fenetre') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Les parents</h2>
        <p style={styles.text}>« C’était déjà comme ça quand on a emménagé. On s’en servait comme débarras. »</p>
        <p style={styles.text}>La mère détourne les yeux.</p>
        <button style={styles.button} onClick={() => setScreen('chambre_parents')}>Continuer</button>
      </div>
    )
  }

  if (screen === 'chambre_parents_voix') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Les parents</h2>
        <p style={styles.text}>Le père répond trop vite : « Les enfants inventent. Surtout quand ils ont peur. »</p>
        <p style={styles.text}>La mère ne dit rien. Ses ongles ont laissé des marques dans sa paume.</p>
        <button style={styles.button} onClick={() => setScreen('chambre_parents')}>Continuer</button>
      </div>
    )
  }

  if (screen === 'chambre_parents_pression') {
    setFlag('pressedParents')
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Pression</h2>
        <p style={styles.text}>La mère finit par craquer :</p>
        <p style={styles.italic}>« On entendait des choses… la nuit. Des chuchotements. On a cru que c’était lui qui parlait seul. »</p>
        <button style={styles.button} onClick={() => setScreen('chambre_hub')}>Revenir</button>
      </div>
    )
  }

  if (screen === 'chambre_decision') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Conclusions</h2>
        <p style={styles.text}>Il est temps de décider ce que tu crois vraiment.</p>
        <button style={styles.button} onClick={() => setScreen('fin_voix')}>Croire le garçon → Il y a vraiment quelque chose</button>
        <button style={styles.button} onClick={() => setScreen('fin_parents')}>Croire les parents → Simple maltraitance</button>
        <button style={styles.button} onClick={() => setScreen('fin_doute')}>Rester dans le doute</button>
        <button style={{...styles.button, background: '#333'}} onClick={() => setScreen('chambre_hub')}>Continuer à enquêter</button>
      </div>
    )
  }

  if (screen === 'fin_voix') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Fin — La voix dans les murs</h2>
        <p style={styles.text}>Tu prends le garçon au sérieux. D’autres enfants du quartier commencent à parler. La même voix. Les mêmes phrases.</p>
        <p style={styles.text}>L’affaire sort du cadre d’une simple maltraitance. Quelque chose d’autre était dans cette maison.</p>
        <button style={styles.button} onClick={() => { setProgress(p => ({...p, chambre: true})); setScreen('menu') }}>Retour aux dossiers</button>
      </div>
    )
  }

  if (screen === 'fin_parents') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Fin — La punition</h2>
        <p style={styles.text}>Tu ranges l’affaire comme un cas de maltraitance. Le garçon est placé. Il ne reparlera plus jamais de la voix.</p>
        <p style={styles.text}>Parfois, la nuit, tu te demandes encore s’il inventait… ou s’il avait simplement compris que plus personne ne voulait l’entendre.</p>
        <button style={styles.button} onClick={() => { setProgress(p => ({...p, chambre: true})); setScreen('menu') }}>Retour aux dossiers</button>
      </div>
    )
  }

  if (screen === 'fin_doute') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>Fin — Le dossier ouvert</h2>
        <p style={styles.text}>Tu refuses de conclure. Le dossier reste ouvert. Des mois plus tard, tu repasses devant la maison. Les volets sont fermés.</p>
        <p style={styles.text}>Quelque chose te dit que la chambre n’est toujours pas vide.</p>
        <button style={styles.button} onClick={() => { setProgress(p => ({...p, chambre: true})); setScreen('menu') }}>Retour aux dossiers</button>
      </div>
    )
  }

  // Placeholders autres affaires
  if (screen === 'appartement' || screen === 'appel') {
    return (
      <div style={styles.container}>
        <h2 style={styles.caseTitle}>{screen === 'appartement' ? "L'appartement 17" : "Le dernier appel"}</h2>
        <p style={styles.text}>(Version courte pour l’instant)</p>
        <button style={styles.button} onClick={() => setScreen('menu')}>Retour</button>
      </div>
    )
  }

  return null
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#ddd',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
    maxWidth: '480px',
    margin: '0 auto'
  },
  title: {
    fontSize: '26px',
    letterSpacing: '3px',
    color: '#c0392b',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#888',
    fontSize: '14px',
    lineHeight: 1.5,
    marginBottom: '30px'
  },
  caseTitle: {
    color: '#c0392b',
    fontSize: '18px',
    marginBottom: '12px'
  },
  text: {
    color: '#bbb',
    fontSize: '15px',
    lineHeight: 1.65,
    marginBottom: '14px'
  },
  italic: {
    color: '#e74c3c',
    fontStyle: 'italic',
    fontSize: '15px',
    lineHeight: 1.65,
    marginBottom: '14px'
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '13px',
    marginBottom: '10px',
    background: '#c0392b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px'
  }
}

export default App
