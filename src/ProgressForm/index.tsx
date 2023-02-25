import { useState } from 'react';
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

export const ProgressForm = () => {

  const [data, setData] = useState({
    fullName: "",
    email: "",
    maritialState: "",
    gender: ""
  })

  const handleChange = (event: 
    React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLSelectElement>) => {

    const { name, value } = event.target 
    setData((prev) => {
      const newData = {...prev, [name]: value}
      return newData
    })
  }

  const calculateProgress = () => {
    let value = 0
    const amountToAdd = 25

    if (data.fullName) {
      const explodedString = data.fullName.split(" ");
      if(explodedString[1])
        value += amountToAdd
    }
    if (data.email) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(pattern.test(data.email))
        value += amountToAdd
    }
    if (data.maritialState) {
      value += amountToAdd
    }
    if (data.gender) {
      value += amountToAdd
    }
    return value
  }

  calculateProgress()

  const handleSubmit = () => {
    setData({
      fullName: "",
      email: "",
      maritialState: "",
      gender: ""
    })
    alert("Formulário enviado com sucesso!")
  }

  return (
    <div className='App'>
      <h1>Progresso do Formulário</h1>

      <main>
        <div className={Styles.barContainer}>
          <div className={ Styles.bar } style={{width: `${calculateProgress()}%`}}></div>
        </div>
        <div className={ Styles.formGroup }>
          <label htmlFor=''>Nome Completo</label>
          <input 
            value={data.fullName}
            name="fullName" 
            onChange={handleChange} />
        </div>
        <div className={ Styles.formGroup }>
          <label htmlFor=''>E-mail</label>
          <input 
            value={data.email}
            name="email" 
            onChange={handleChange} />
        </div>
        <div className={ Styles.formGroup }>
          <label htmlFor=''>Estado Civil</label>
          <select 
            value={data.maritialState} 
            name="maritialState" 
            onChange={handleChange} 
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
                value="Masculino"
                name="gender"
                onChange={handleChange}
                checked={data.gender == "Masculino"} 
                /> Masculino
            </span>
            <span>
              <input 
                type='radio' 
                value="Feminino"
                name="gender" 
                onChange={handleChange}
                checked={data.gender == "Feminino"} 
                /> Feminino
            </span>
          </div>
        </div>
        <button disabled={calculateProgress() != 100} onClick={handleSubmit}>Enviar Formulário</button>
      </main>
    </div>
  );
}