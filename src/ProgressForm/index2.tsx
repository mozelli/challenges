import { useEffect, useState } from 'react';
import Styles from './styles.module.scss';
/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

export const Desafio = () => {

  // MÉTODO ANTIGO

  const [name, setName] = useState({value: "", valid: false})
  const [email, setEmail] = useState({value: "", valid: false})
  const [maritialStatus, setMaritialStatus] = useState('')
  const [gender, setGender] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonBgColor, setButtonBgColor] = useState("535bf2")
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    let aux = 0
    if(name.valid)
      aux += 25
    if(email.valid)
      aux += 25 
    if(maritialStatus != "")
      aux += 25
    if(gender != "")
      aux += 25
    setProgress(aux)
    if(aux === 100){
      setButtonDisabled(false);
      setButtonBgColor("#228b22")
    } else {
      setButtonDisabled(true);
      setButtonBgColor("#535bf2")
    }
  }, [name, email, maritialStatus, gender])

  const checkName = (value: string) => {
    setName({ value, valid: false })
    const nameParts = value.split(" ");
    if( nameParts.length >= 2 && nameParts[1] != "" )
      setName({ value, valid: true })
    return;
  }

  const checkEmail = (value: string) => {
    setEmail({ value, valid: false })
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regexEmail.test(value))
      setEmail({value, valid: true})
    return;
  }

  const handleSubmit = () => {
    if(name.valid && email.valid && maritialStatus != "" && gender != "") {
      setName({value: "", valid: false})
      setEmail({value: "", valid: false})
      setMaritialStatus("")
      setGender("")
      alert("Formulário enviado com sucesso!")
    }
  }

  return (
    <div className='App'>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className={Styles.barContainer}>
          <div className={ Styles.bar } style={{width: `${progress}%`, backgroundColor: `${buttonBgColor}`}}></div>
        </div>
        <div className={ Styles.formGroup }>
          <label htmlFor=''>Nome Completo</label>
          <input value={name.value} onChange={(e) => checkName(e.target.value)} />
        </div>
        <div className={ Styles.formGroup }>
          <label htmlFor=''>E-mail</label>
          <input value={email.value} onChange={(e) => checkEmail(e.target.value)} />
        </div>
        <div className={ Styles.formGroup }>
          <label htmlFor=''>Estado Civil</label>
          <select 
            value={maritialStatus} 
            name="marialStatus" 
            onChange={(e) => setMaritialStatus(e.target.value)} 
          >
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className={ Styles.formGroup }>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input 
                type='radio' 
                name="gender"
                onClick={() => setGender("Masculino")}
                checked={gender == "Masculino"} /> Masculino
            </span>
            <span>
              <input 
                type='radio' 
                name="gender" 
                onClick={() => setGender("Feminino")}
                checked={gender == "Feminino"} /> Feminino
            </span>
          </div>
        </div>
        <button disabled={buttonDisabled} onClick={handleSubmit}>Enviar Formulário</button>
      </main>
    </div>
  );
}